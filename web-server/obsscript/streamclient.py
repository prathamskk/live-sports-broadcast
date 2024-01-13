import obspython as S
import socketio
import time


sio = socketio.Client()

@sio.on('goalevent')
def on_message(data):
    print('I received a message! : ',data['id'])
    switcher = {
        1: "Wade Cooper",
        2: "Arlene Mccoy",
        3: "Devon Webb",
        4: 'Tom Cook',
        5: 'Tanya Fox',
        6: 'Hellen Schmidt',
        7: 'Caroline Schultz',
        8: 'Mason Heaney',
        9: 'Claudie Smitham',
        10: 'Emil Schaefer',
   
    }
    player_name = switcher.get(data['id'], "nothing")
    source = S.obs_get_source_by_name("test_py")
    print(S.obs_source_is_hidden(source))
    settings = S.obs_data_create()
    S.obs_data_set_string(settings, "text", player_name)
    S.obs_source_update(source,settings)
    S.obs_source_release(source)
    S.obs_data_release(settings)
    show_goal()


    # current_scene = S.obs_frontend_get_current_scene()
    # scene = S.obs_scene_from_source(current_scene)
    # settings = S.obs_data_create()

    # S.obs_data_set_string(
    #     settings, "text", data
    # )
    # source = S.obs_source_create_private("text_gdiplus", "test_py", settings)
    # S.obs_scene_add(scene, source)

    # S.obs_scene_release(scene)
    # S.obs_data_release(settings)
    # S.obs_source_release(source)
def show_goal():
    current_scene = S.obs_frontend_get_current_scene()
    scene = S.obs_scene_from_source(current_scene)
    source = S.obs_get_source_by_name("test_py")
    sceneitem = S.obs_scene_sceneitem_from_source(scene,source)
    S.obs_sceneitem_set_visible(sceneitem,True)
    time.sleep(10)
    S.obs_sceneitem_set_visible(sceneitem,False)
    S.obs_source_release(source)
    S.obs_scene_release(scene)
    S.obs_sceneitem_release(sceneitem)


@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error(data):
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")



def add_pressed(props, prop):
    sio.connect('https://api.uptwocat.com')


def script_description():
    return "Connect to server"


def script_properties():  # ui
    props = S.obs_properties_create()
    S.obs_properties_add_button(props, "button", "Connect to server", add_pressed)
    return props

# def change_settings_of_source(self,data):
#         source = S.obs_get_source_by_name("test_py")
#         settings = S.obs_data_create()

#         S.obs_data_set_string(settings, "text", data)
#         S.obs_source_info.update(settings)
#         S.obs_source_release(source)
#         S.obs_data_release(settings)

