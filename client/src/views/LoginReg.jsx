import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import axios from 'axios';
import FormComponent from '../components/FormComponent';

function LoginReg(props) {


    const regInputs = [
        {
            name: "firstName", 
            type: "text",
            value: '',
            label: "First Name",
    },
    {
        name: "lastName", 
            type: "text",
            value: '',
            label: "Last Name",
    },
    {
        name: "email", 
            type: "email",
            value: '',
            label: "Email",
    },
    {
        name: "password", 
            type: "password",
            value: '',
            label: "Password"
    },
    {
        name: "confirmPassword", 
            type: "password",
            value: '',
            label: "Confirm Password",
    }
]
    const loginInputs = [
    {
        name: "email", 
            type: "email",
            value: '',
            label: "Email",
    },
    {
        name: "password", 
            type: "password",
            value: '',
            label: "Password",
    }
]


  return (
    <div>


        <div className='d-flex container'>

        <div className=' d-flex container'>
            <FormComponent formAction = "http://localhost:8000/users" 
            inputs = {regInputs}
            formTitle = "Register a New User"/>
        </div>
        <div className="d-flex container">
            <FormComponent formAction = "http://localhost:8000/users/login"
            inputs = {loginInputs}
            formTitle = "Login"/>
        </div>
    
    </div>
    

</div>
  )
}

export default LoginReg