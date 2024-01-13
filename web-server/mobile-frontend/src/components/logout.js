import { GoogleLogout } from 'react-google-login';

const clientId = "854747764963-2prroj1hhcmrskr897j1fv12t05ftlre.apps.googleusercontent.com";

function Logout(){
    const onSuccess = () => {
        console.log("Logout Successful");
    }
    return(
        <div>
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
        />
        </div>
        
    )
}

export default Logout;