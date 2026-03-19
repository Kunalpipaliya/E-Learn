import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Field, Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import toast from 'react-hot-toast';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Use 90% of the screen on mobile
    maxWidth: 400, // But never larger than 400px
    bgcolor: 'background.paper',
    borderRadius: '8px',
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
    const [languages, setLanguage] = useState([])
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
    }, [])
    const [editIndex, setEditIndex] = useState(null)
    const handleSubmit = (values, { resetForm }) => {
        if (editIndex !== null) {
            axios.patch(`https://generateapi.techsnack.online/api/language/${editIndex}`, values, {
                headers: {
                    Authorization: token
                }
            }).then(() => {
                setEditIndex(null)
                toast.success("language upadated successfully")
                fetchLanguages()
                setOpen(false)
                setIni({
                    languagename: ""
                })
            }).catch((err) => {
                console.log(err);
            })
        }
        else {

            axios.post("https://generateapi.techsnack.online/api/language", values, {
                headers: {
                    Authorization: token
                }
            }).then(() => {
                toast.success("Language added successfully!")
                setOpen(false)
                resetForm()
                fetchLanguages()
            }).catch((err) => {
                console.log(err);

            })
        }
    }
    const handleDelete = (id) => {
        axios.delete(`https://generateapi.techsnack.online/api/language/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                toast.success   ("laguage Deleted Successfully!")
                fetchLanguages()
            })
            .catch((err) => {
                console.log(err);

            })
    }

    const [search, setSearch] = useState("")
    const filterdLanguages = languages.filter((l) => l.languagename.toLowerCase().includes(search.toLowerCase()))
    const searchLanguage = (e) => {
        setSearch(e.target.value)
    }
    const handleEdit = (item) => {
        setOpen(true)
        setIni({ languagename: item.languagename })
        setEditIndex(item._id)
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Button onClick={handleOpen} variant='contained' className="w-full md:w-auto">
                    Add Language
                </Button>
                <input
                    type="text"
                    placeholder='Search here...'
                    className='w-full md:max-w-xs p-3 border border-gray-300 rounded-full outline-none'
                    onChange={searchLanguage}
                    value={search}
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h1 className="text-3xl font-bold">{editIndex !== null ? "Edit Language" : "Add Language"}</h1>
                    <Formik
                        initialValues={ini}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form className="p-2">
                            <Field name="languagename" placeholder="Enter Language" className="w-full p-2 border border-1 border-gray-400 mb-3"></Field>
                            <Button variant='contained' className='w-full' type='submit' >{editIndex === null ? "Submit" : "Update"}</Button>

                        </Form>
                    </Formik>
                </Box>
            </Modal>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>

                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table sx={{ minWidth: { xs: 600, sm: 700 } }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sr no</StyledTableCell>
                                <StyledTableCell align="center">Language Name</StyledTableCell>
                                <StyledTableCell align="right">Remove</StyledTableCell>
                                <StyledTableCell align="right">Edit</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterdLanguages.map((item, index) => (
                                <StyledTableRow >

                                    <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{item.languagename}</StyledTableCell>
                                    <StyledTableCell align="right"><DeleteIcon color='error' onClick={() => { handleDelete(item._id) }} /></StyledTableCell>
                                    <StyledTableCell align="right" ><EditSquareIcon color='primary' onClick={() => handleEdit(item)} /></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3 }}>
                {filterdLanguages.map((item) => (
                    <Paper key={item._id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="caption">Language</Typography>
                            <Typography variant="body1" fontWeight="bold">{item.languagename}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => handleEdit(item)} color="primary"><EditSquareIcon /></IconButton>
                            <IconButton onClick={() => handleDelete(item._id)} color="error"><DeleteIcon /></IconButton>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </div>

    )
}

export default Language
