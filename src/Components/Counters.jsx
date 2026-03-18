import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Dashboard from '../Pages/Dashboard'

const Counters = () => {
    const token = "txksypTpRFtykHTh"
    const [topic, setTopic] = useState([])
    const fetchTopic = () => {
        axios.get("https://generateapi.techsnack.online/api/topic", {
            headers:
            {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setTopic(res.data.Data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [language, setLanguage] = useState([])

    const fetchLanguages = () => {
        axios.get("https://generateapi.techsnack.online/api/language", {
            headers:
            {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setLanguage(res.data.Data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchLanguages()
        fetchTopic()
        fetchQuestion()

    }, [])
    const [Questions, setQuestion] = useState([])
    const fetchQuestion = () => {
        axios.get("https://generateapi.techsnack.online/api/question", {
            headers:
            {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setQuestion(res.data.Data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div >
            <div className="flex flex-row gap-4 flex-wrap">
            {
                ['language', 'topic', 'Questions'].map((item, index) => {
                    return (
                            <div className="flex flex-col p-5 rounded-lg shadow-lg bg-gray-50 text-center" key={index} style={{width:"200px"}}>
                                <strong>
                                    <Link to={`/dashboard/${item.toLowerCase()}`}>{item}</Link>
                                </strong>
                                <span>
                                    {item.length}
                                </span>
                            </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Counters
