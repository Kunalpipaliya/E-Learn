import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  borderRadius: 2,
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

const Topic = () => {
    const token = "txksypTpRFtykHTh"
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ini, setIni] = useState({
        topicname: "",
        languagename: ""
    })
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
    const [editIndex, setEditIndex] = useState(null)

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        if (editIndex !== null) {
            axios.patch(`https://generateapi.techsnack.online/api/topic/${editIndex}`, values, {
                headers: {
                    Authorization: token
                }
            }).then(() => {
                alert("Topic updated successfully")
                setOpen(false)
                setEditIndex(null)

            })
                .catch((err) => {
                    console.log(err);

                })
        }
        else {

            axios.post("https://generateapi.techsnack.online/api/topic", values, {
                headers: {
                    Authorization: token
                }
            }).then(() => {
                alert("Topic added successfully!")
                setOpen(false)
                resetForm()
                fetchTopic()
            }).catch((err) => {
                console.log(err);

            })
        }
    }
    const handleDelete = (id) => {
        axios.delete(`https://generateapi.techsnack.online/api/topic/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("topic Deleted Successfully!")
                fetchTopic()
            })
            .catch((err) => {
                console.log(err);

            })
    }
    const [languages, setLanguage] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const handleChange = (event) => {
        setSelectedLanguage(event.target.value);
        console.log(event.target.value);

    };
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

    }, [])
    const handleEdit = (item) => {
        setOpen(true)
        setSelectedLanguage(item.languagename._id)
        console.log(selectedLanguage);

        setIni({
            topicname: item.topicname,
            languagename: selectedLanguage
        })
        setEditIndex(item._id)
    }
    const [search, setSearch] = useState("")
    const filteredTopic = topic.filter((item) => {
        const searchLower = search.toLowerCase();
        return (
            item.languagename?.languagename?.toLowerCase().includes(searchLower) ||
            item.topicname.toLowerCase().includes(searchLower)
        );
    });
    const searchTopic = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div>
            <Box className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <Button onClick={handleOpen} variant='contained' sx={{ py: 1.5 }}>
                    Add Topic
                </Button>
                <input
                    type="text"
                    placeholder='Search topics or languages...'
                    className='w-full md:max-w-md p-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    onChange={searchTopic}
                    value={search}
                />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                className='border  border-0'
            >
                <Box sx={style}>
                    <h1 className="text-3xl font-bold">{editIndex === null ? "Add topic" : "Edit Topic"}</h1>
                    <Formik
                        initialValues={ini}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (


                                <Form className="p-2">
                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={editIndex === null ? props.values.languagename : selectedLanguage}
                                            label="language"
                                            name='languagename'
                                            onChange={props.handleChange}
                                            disabled={editIndex !== null}
                                        >
                                            {
                                                languages.map((item, index) => {
                                                    return (

                                                        <MenuItem value={item._id}>{item.languagename}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                    <Field name="topicname" placeholder="Enter Topic" className="w-full p-2 border border-1 border-gray-400 mb-3"></Field>

                                    <Button variant='contained' className='w-full' type='submit' >{editIndex === null ? "Submit" : "Update"}</Button>

                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Modal>
            <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr no</StyledTableCell>
                            <StyledTableCell align="center">Language Name</StyledTableCell>
                            <StyledTableCell align="center">Topic Name</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTopic.map((item, index) => (
                            <StyledTableRow key={item._id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{item.languagename?.languagename}</StyledTableCell>
                                <StyledTableCell align="center">{item.topicname}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                        <EditSquareIcon color='primary' className="cursor-pointer" onClick={() => handleEdit(item)} />
                                        <DeleteIcon color='error' className="cursor-pointer" onClick={() => handleDelete(item._id)} />
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                {filteredTopic.map((item, index) => (
                    <Paper key={item._id} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                            #{index + 1} • {item.languagename?.languagename}
                        </Typography>
                        <Typography variant="h6" sx={{ my: 1 }}>
                            {item.topicname}
                        </Typography>
                        <Box className="flex justify-end gap-3 border-t pt-2 mt-2">
                            <Button size="small" startIcon={<EditSquareIcon />} onClick={() => handleEdit(item)}>Edit</Button>
                            <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(item._id)}>Delete</Button>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </div >

    )
}

export default Topic
