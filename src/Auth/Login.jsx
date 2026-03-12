import { Formik,Form,Field } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const token = "txksypTpRFtykHTh"
    const[ini,setIni]=useState({
        email:"",
        password:""
    })
    const handleSubmit=(values,{resetForm})=>{
        axios.post("https://generateapi.techsnack.online/auth/login",values,{
            headers:{
                authorization:token
            }
        })
        .then(()=>{
            alert("login successful")
        })
        .catch((err)=>{
            console.log(err);
            alert("login failed")
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-600">
                Log In
            </h1>
            <Formik
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form>

                    <Field className="border-2 border-gray-300 p-2 rounded-lg" name="email" type="email" placeholder="Email" >
                    </Field>
                    <br />
                    <Field className="border-2 border-gray-300 p-2 rounded-lg" name="password" type="password" placeholder="Password" >
                    </Field>
                    <br />
                    <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login
