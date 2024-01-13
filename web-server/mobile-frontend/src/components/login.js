import { GoogleLogin } from 'react-google-login';

const clientId = "854747764963-2prroj1hhcmrskr897j1fv12t05ftlre.apps.googleusercontent.com";

const responseGoogle = (response) => {
  console.log(response);
}

function Login(){
    return(
        <div>
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        </div>
        
    )
}

export default Login; 