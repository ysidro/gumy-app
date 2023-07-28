import * as React from "react"
import {useSelector } from "react-redux";
import  Login from "../components/AuthFlow/Login"
import  Delivery from "../components/AuthFlow/Delivery"

export default function Auth(){
   
    const { authState } = useSelector(state => state.auth);
    return( <>

                {authState === 'signIn' && <Login />}
                
                {authState === 'firebase' && <Delivery  />  }
        
    </>)
}