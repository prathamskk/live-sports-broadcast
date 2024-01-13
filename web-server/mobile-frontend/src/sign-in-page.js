import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import GoogleButton from "react-google-button";
function SignInPage(props) {

  const nav=useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = 'https://api.uptwocat.com/login';
  };

  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
        const query = new URLSearchParams(window.location.search);
        const token=query.get('jwt')
        if(token){
          localStorage.setItem('JWT',token);
          return nav('/home')
        }
      }
    else{
      return nav("/home")
    }
  },[])

  return (
    <>
        <GoogleButton
           onClick={handleClick}
        />
   </>
  );
}

export default SignInPage;