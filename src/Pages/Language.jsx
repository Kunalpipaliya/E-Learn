import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Field, Formik, Form } from 'formik';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Language = () => {
    const token = "txksypTpRFtykHTh"
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ini, setIni] = useState({
        languagename: ""
    })
    const [languages,setLanguage]=useState([])
    const fetchLanguages=()=>{
        axios.get("https://generateapi.techsnack.online/api/language",{
            headers:
            {
                Authorization:token
            }
        })
        .then((res)=>{
            console.log(res.data.Data);
            setLanguage(res.data.Data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchLanguages()
    },[])
    const handleSubmit = (values, { resetForm }) => {
        axios.post("https://generateapi.techsnack.online/api/language", values, {
            headers: {
                Authorization: token
            }
        }).then(() => {
            alert("Language added successfully!")
            setOpen(false)
            resetForm()
            fetchLanguages()
        }).catch((err) => {
            console.log(err);

        })
    }
    const handleDelete=(id)=>{
        axios.delete(`https://generateapi.techsnack.online/api/language/${id}`,{
            headers:{
                Authorization:token
            }
        })
        .then(()=>{
            alert("laguage Deleted Successfully!")
            fetchLanguages()
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    const [search,setSearch]=useState("")
    const filterdLanguages=languages.filter((l)=>l.languagename.toLowerCase().includes(search.toLowerCase()))
    const searchLanguage=(e)=>{
        setSearch(e.target.value)
    }
    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>Add Language</Button>
            <input type="text" placeholder='Search here...'  className='w-full mt-5 p-3 border border-1 rounded-full outline outline-0' onChange={searchLanguage} value={search} />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h1 className="text-3xl font-bold">Add language</h1>
                    <Formik
                        initialValues={ini}
                        onSubmit={handleSubmit}
                    >
                        <Form className="p-2">
                            <Field name="languagename" placeholder="Enter Language" className="w-full p-2 border border-1 border-gray-400 mb-3"></Field>
                            <Button variant='contained' className='w-full' type='submit' >Submit</Button>

                        </Form>
                    </Formik>
                </Box>
            </Modal>
            
            <TableContainer component={Paper} sx={{mt:3}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr no</StyledTableCell>
                            <StyledTableCell align="center">Language Name</StyledTableCell>
                            <StyledTableCell align="right">Remove</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterdLanguages.map((item,index) => (
                            <StyledTableRow >
                                
                                <StyledTableCell align="left">{index+1}</StyledTableCell>
                                <StyledTableCell align="center">{item.languagename}</StyledTableCell>
                                <StyledTableCell align="right"><DeleteIcon color='error' onClick={()=>{handleDelete(item._id)}}/></StyledTableCell>
                                <StyledTableCell align="right" ><EditSquareIcon color='primary'/></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default Language
