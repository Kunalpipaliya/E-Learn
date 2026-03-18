import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
const Login = () => {
    const token = "txksypTpRFtykHTh"
    const [ini, setIni] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = (values, { resetForm }) => {
        const loadingtoast=toast.loading("Authenticating user....")
        console.log(values);
        localStorage.setItem("currentUser", JSON.stringify(values.email))
        axios.post("https://generateapi.techsnack.online/auth/Login", values, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                // alert("Login successful")
                toast.success("Login successful!",{id:loadingtoast})
                window.location.href = "/dashboard"
            })
            .catch((err) => {
                console.log(err);
                // alert("Login failed")
                toast.error("Login failed",{id:loadingtoast})
            })
    }
    return (
        <div className="flex sm:container md:container-fluid flex-col md:flex-row">
            <div className='flex flex-col items-center justify-center md:w-[50%] sm:w-full sm:container md:container-fluid min-h-screen bg-blue-600 text-white'>
                <div className="flex gap-[20px] items-center">
                    <h1 className='font-black text-5xl' style={{ rotate: "-40deg" }}>E</h1>
                    <h1 className='font-black text-3xl'>Learning</h1>
                </div>
            </div>
            <div className="flex flex-col  items-center justify-center md:w-[50%] sm:w-full sm:container md:container-fluid min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    Login
                </h1>
                <Formik
                    initialValues={ini}
                    onSubmit={handleSubmit}
                >
                    <Form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Field className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg" name="email" type="email" placeholder="Email" >
                        </Field>
                        <br />
                        <Field className="border-2 border-gray-300 p-2 w-full mb-2 rounded-lg" name="password" type="password" placeholder="Password" >
                        </Field>
                        <br />
                        <Button variant='contained' color='primary' className=" w-full" type="submit">
                            Login
                        </Button>
                    </Form>
                </Formik>
                <Link to="/signup" className="text-blue-500 mt-4">
                    Don't have an account? Sign up
                </Link>
            </div>
        </div>

    )
}

export default Login
