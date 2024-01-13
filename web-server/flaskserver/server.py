import os , pathlib
import json
import hashlib
from flask import Flask, render_template, request, redirect, send_from_directory, make_response, session
from flask.helpers import get_root_path
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from flask_socketio import SocketIO
import time
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from flask import request , abort , session , redirect , Response 
from flask_socketio import join_room, leave_room
import google.auth.transport.requests
import jwt
import requests
import json
import mysql.connector
import flask

app = Flask(__name__)

app.debug = True
app.secret_key = os.getenv("SECRET_KEY")

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client-secret.json")
algorithm = os.getenv("ALGORITHM")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
BACKEND_URL=os.getenv("BACKEND_URL")
FRONTEND_URL=os.getenv("FRONTEND_URL")

mydb = mysql.connector.connect(
    host=os.getenv("SQL_HOST_URL"),
    user=os.getenv("SQL_USERNAME"),
    password=os.getenv("SQL_PASSWORD"),
    database="live_sports"
    )


# db = SQLAlchemy(app)
# migrate = Migrate(app, db)
# import flaskserver.models

socketio = SocketIO(app,async_mode='eventlet',cors_allowed_origins='*')

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=BACKEND_URL+"/login/callback",
)

def login_required(function):
    def wrapper(*args, **kwargs):
        encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
        if encoded_jwt==None:
            return abort(401)
        else:
            return function()
    return wrapper

def Generate_JWT(payload):
    encoded_jwt = jwt.encode(payload, app.secret_key, algorithm=algorithm)
    return encoded_jwt



@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url(access_type='offline',prompt='consent')
    # Store the state so the callback can verify the auth server response.
    flask.session["state"] = state
    print(state)
    # return Response(
    #     response=json.dumps({'auth_url':authorization_url}),
    #     status=200,
    #     mimetype='application/json'
    # )
    return flask.redirect(authorization_url)


@app.route("/login/callback")
def callback():
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = flask.session['state']
    print('https://uptwocat.com'+flask.request.full_path)
    flow.fetch_token(authorization_response='https://uptwocat.com'+flask.request.full_path)
    credentials = flow.credentials
    flask.session['credentials'] = credentials_to_dict(credentials)
    print(flask.session['credentials'])
    print(credentials.id_token)
    id_info = id_token.verify_oauth2_token(
        id_token=credentials.id_token, request=google.auth.transport.requests.Request(),
        audience=GOOGLE_CLIENT_ID,clock_skew_in_seconds=10
    )
    print(id_info)
    print('Logging in '+id_info.get("name")+' '+id_info.get("email")+' '+id_info.get("sub"))
    # removing the specific audience, as it is throwing error
    del id_info['aud']
    jwt_token=Generate_JWT(id_info)


    mycursor = mydb.cursor()
    sql1 = "SELECT * from users where user_id=%s"
    val1 = ((id_info.get("sub"),))
    mycursor.execute(sql1, val1)
    result = mycursor.fetchone()
    # print(result)
    mycursor.reset()
    if result==None:
        sql2 = "INSERT INTO users (user_id, user_name , user_email) VALUES (%s, %s , %s)"
        val2 = (id_info.get("sub"),id_info.get("name"),id_info.get("email"))
        mycursor.execute(sql2, val2)
        mydb.commit()
        print(mycursor.rowcount, "record inserted.")
    else:
        sql2 = "UPDATE users SET user_name=%s, user_email=%s WHERE user_id=%s"
        val2 = (id_info.get("name"),id_info.get("email"),id_info.get("sub"))
        mycursor.execute(sql2, val2)
        mydb.commit()
        print(mycursor.rowcount, "record updated.")

    return redirect(f"{FRONTEND_URL}?jwt={jwt_token}")
    """ return Response(
        response=json.dumps({'JWT':jwt_token}),
        status=200,
        mimetype='application/json'
    ) """


@app.route("/logout")
def logout():
    #clear the local storage from frontend
    session.clear()
    return Response(
        response=json.dumps({"message":"Logged out"}),
        status=202,
        mimetype='application/json'
    )
@app.route("/home")
@login_required
def home_page_user():
    encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
    try:
        decoded_jwt=jwt.decode(encoded_jwt, app.secret_key, algorithms=[algorithm,])
        print('Verifying '+decoded_jwt.get("name")+' '+decoded_jwt.get("email")+' '+decoded_jwt.get("sub"))
        print(decoded_jwt)
    except Exception as e: 
        return Response(
            response=json.dumps({"message":"Decoding JWT Failed", "exception":e.args}),
            status=500,
            mimetype='application/json'
        )
    return Response(
        response=json.dumps(decoded_jwt),
        status=200,
        mimetype='application/json'
    )

@socketio.event
def connect(para):
    # print('connect ', para )
    auth = para['Authorization']
    encoded_jwt=auth.split("Bearer ")[1]
    if encoded_jwt==None:
        return Response(
            response=json.dumps({"message":"Unauthorized"}),
            status=401,
            mimetype='application/json'
        )
    else:
        try:
            decoded_jwt=jwt.decode(encoded_jwt, app.secret_key, algorithms=[algorithm,])
            # print(decoded_jwt)
            # print(request.sid)
            session['user']=decoded_jwt['sub']
            print('Mobile client has connected :'+decoded_jwt['name']+' '+decoded_jwt['email']+' '+decoded_jwt['sub'])
        except Exception as e: 
            return Response(
            response=json.dumps({"message":"Decoding JWT Failed", "exception":e.args}),
            status=500,
            mimetype='application/json'
        )
@socketio.event(namespace='/overlay')
def connect(para):
    # print(para['id'])
    join_room(para['id']);
    print("Overlay client has connected and joined " + para['id'])

@socketio.on('goal')
def handle_goal_event( id):
    print(session)
    socketio.emit('goalevent',data={'id':id},room=session['user'],namespace='/overlay')
    print('goal: '+str(id)+' userid: '+session['user']+' '+str(time.time()))


@socketio.on('red')
def handle_yellow_event(id):
    print(session)
    socketio.emit('redevent',data={'id':id},room=session['user'],namespace='/overlay')
    print('red: '+str(id)+' userid: '+session['user']+' '+str(time.time()))

@socketio.on('yellow')
def handle_red_event(id):
    print(session)
    socketio.emit('yellowevent',data={'id':id},room=session['user'],namespace='/overlay')
    print('yellow: '+str(id)+' userid: '+session['user']+' '+str(time.time()))

@socketio.on('corner')
def handle_corner_event(id):
    print(session)
    socketio.emit('cornerevent',data={'id':id},room=session['user'],namespace='/overlay')
    print('corner: '+str(id)+' userid: '+session['user']+' '+str(time.time()))

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port='3000')
