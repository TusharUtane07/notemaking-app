import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  let navigate = useNavigate();
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const singIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((res)=>{
      localStorage.setItem("userEmail", res.user.email)
      localStorage.setItem("name",res.user.displayName)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
      onAuthStateChanged(auth,(response)=>{
      if(response){
        navigate('/home')
      }
      else{
        navigate('/')
      }
    })
  },[])

  return (
    <div>
      <GoogleButton onClick={singIn} />
    </div>
  )
}

export default Login