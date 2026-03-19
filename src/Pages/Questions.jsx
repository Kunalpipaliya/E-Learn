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
import toast from 'react-hot-toast';

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

const Questions = () => {
  const token = "txksypTpRFtykHTh"
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ini, setIni] = useState({
    question: "",
    topicname: "",
    languagename: ""
  })
  const [Question, setQuestion] = useState([])
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
  const [editIndex, setEditIndex] = useState(null)
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    if (editIndex !== null) {
      axios.patch(`https://generateapi.techsnack.online/api/question/${editIndex}`, values, {
        headers: {
          Authorization: token
        }
      }).then(() => {
        toast.success("Question Updated successfully")
        setOpen(false)
        setEditIndex(null)
        fetchQuestion()

      }).catch((err) => {
        console.log(err);

      })
    }
    else {

      axios.post("https://generateapi.techsnack.online/api/question", values, {
        headers: {
          Authorization: token
        }
      }).then(() => {
        toast.success("Question added successfully!")
        setOpen(false)
        resetForm()
        fetchQuestion()
      }).catch((err) => {
        console.log(err);

      })
    }
  }
  const handleDelete = (id) => {
    axios.delete(`https://generateapi.techsnack.online/api/question/${id}`, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        toast.success("Question Deleted Successfully!")
        fetchQuestion()
      })
      .catch((err) => {
        console.log(err);

      })
  }
  const [languages, setLanguage] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    console.log(event.target.value);
    setSelectedTopic(event.target.value)
  };

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

  const handleEdit = (item) => {
    setOpen(true)
    const langId = item.topicname.languagename._id
    const topicId = item.topicname._id
    setSelectedLanguage(langId)
    setSelectedTopic(topicId)
    console.log(langId);
    console.log(topicId);
    setIni({
      question: item.question,
      topicname: topicId,
      languagename: langId
    })
    setEditIndex(item._id)
  }
  const [search, setSearch] = useState("")
  const filteredQuestions = Question.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.question?.toLowerCase().includes(searchLower) ||
      item.languagename?.languagename?.toLowerCase().includes(searchLower) ||
      item.topicname?.topicname?.toLowerCase().includes(searchLower)
    );
  });
  const searchQuestion = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div>
      <Box className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <Button onClick={handleOpen} variant='contained' sx={{ height: '50px' }}>
          Add Question
        </Button>
        <input
          type="text"
          placeholder='Search language, topic or question...'
          className='w-full md:max-w-md p-3 border border-gray-300 rounded-full outline-none focus:border-blue-500 transition-all'
          onChange={searchQuestion}
          value={search}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        className='border  border-0'
      >
        <Box sx={style}>
          <h1 className="text-3xl font-bold">{editIndex === null ? "Add" : "Edit"} Question</h1>
          <Formik
            initialValues={ini}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {

              (props) => (


                <Form className="p-2">
                  <FormControl fullWidth sx={{ my: 1 }}>
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
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.values.topicname}
                      label="topic"
                      name='topicname'
                      onChange={props.handleChange}
                      disabled={!props.values.languagename}
                    >

                      {
                        topic
                          .filter((t) => {
                            // Safely check if the nested objects exist before reading _id
                            return t.languagename === props.values.languagename ||
                              t.languagename?._id === props.values.languagename;
                          })
                          .map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {item.topicname}
                            </MenuItem>
                          ))
                      }

                    </Select>
                  </FormControl>
                  <Field name="question" placeholder="Enter Question" className="w-full p-2 border border-1 border-gray-400 mb-3" disabled={!props.values.topicname}></Field>

                  <Button variant='contained' className='w-full' type='submit' >{editIndex === null ? "Submit" : "Update"}</Button>

                </Form>
              )
            }
          </Formik>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr no</StyledTableCell>
              <StyledTableCell align="center">Language</StyledTableCell>
              <StyledTableCell align="center">Topic</StyledTableCell>
              <StyledTableCell align="center">Question</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.languagename?.languagename}</StyledTableCell>
                <StyledTableCell align="center">{item.topicname?.topicname}</StyledTableCell>
                <StyledTableCell align="center">{item.question}</StyledTableCell>
                <StyledTableCell align="right">
                  <EditSquareIcon color='primary' sx={{ cursor: 'pointer', mr: 1 }} onClick={() => handleEdit(item)} />
                  <DeleteIcon color='error' sx={{ cursor: 'pointer' }} onClick={() => handleDelete(item._id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
        {filteredQuestions.map((item, index) => (
          <Paper key={item._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="caption" color="textSecondary">
              {item.languagename.languagename} • {item.topicname?.topicname}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', my: 1 }}>
              {item.question}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
              <Button size="small" startIcon={<EditSquareIcon />} onClick={() => handleEdit(item)}>Edit</Button>
              <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(item._id)}>Delete</Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </div>

  )
}

export default Questions
