import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
const SIgnUp = () => {
    const token = "txksypTpRFtykHTh"
    const [ini, setIni] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleSubmit = (values, { resetForm }) => {
        axios.post("https://generateapi.techsnack.online/auth/signUp", values, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                alert("Sign up successful")
                window.location.href = "/login"
            })
            .catch((err) => {
                console.log(err);
                alert("Sign up failed")
            })
    }
    return (
        <div className="flex sm:container md:container-fluid flex-col md:flex-row">
            <div className='flex flex-col items-center justify-center md:w-[50%] sm:w-full sm:container md:container-fluid min-h-screen bg-blue-100'>
                <div className="flex gap-[20px] items-center">
                    <h1 className='font-black text-5xl' style={{ rotate: "-40deg" }}>E</h1>
                    <h1 className='font-black text-3xl'>Learning</h1>
                </div>
            </div>
            <div className="flex flex-col  items-center justify-center md:w-[50%] sm:w-full sm:container md:container-fluid min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-red-600">
                    Sign up
                </h1>
                <Formik
                    initialValues={ini}
                    onSubmit={handleSubmit}
                >
                    <Form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Field className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg" name="name" type="text" placeholder="Name" >
                        </Field>
                        <br />
                        <Field className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg" name="email" type="email" placeholder="Email" >
                        </Field>
                        <br />
                        <Field className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg" name="password" type="password" placeholder="Password" >
                        </Field>
                        <br />
                        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">
                            Sign up
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default SIgnUp
