import { Formik,Form,Field } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
const SIgnUp = () => {
    const token = "txksypTpRFtykHTh"
    const[ini,setIni]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleSubmit=(values,{resetForm})=>{
        axios.post("https://generateapi.techsnack.online/auth/signUp",values,{
            headers:{
                authorization:token
            }
        })
        .then(()=>{
            alert("Sign up successful")
        })
        .catch((err)=>{
            console.log(err);
            alert("Sign up failed")
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-600">
                Sign up
            </h1>
            <Formik
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field className="border-2 border-gray-300 p-2 rounded-lg" name="name" type="text" placeholder="Name" >
                    </Field>
                    <br />
                    <Field className="border-2 border-gray-300 p-2 rounded-lg" name="email" type="email" placeholder="Email" >
                    </Field>
                    <br />
                    <Field className="border-2 border-gray-300 p-2 rounded-lg" name="password" type="password" placeholder="Password" >
                    </Field>
                    <br />
                    <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
                        Sign up
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default SIgnUp
