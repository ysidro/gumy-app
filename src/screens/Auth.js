import * as React from "react"
import {useSelector } from "react-redux";
import  Login from "../components/AuthFlow/Login"
import  Delivery from "../components/AuthFlow/Delivery"
import  SingInByToken from "../components/AuthFlow/SingInByToken"
export default function Auth(){
   
    const { authState } = useSelector(state => state.auth);
    console.log(authState)
    return( <>

                {authState === 'signIn' && <Login />}
                
                {authState === 'firebase' && <Delivery  />  }
                
                {authState === 'SingInByToken' && <SingInByToken  />  }
        
    </>)
}