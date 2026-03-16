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

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    axios.post("https://generateapi.techsnack.online/api/question", values, {
      headers: {
        Authorization: token
      }
    }).then(() => {
      alert("Question added successfully!")
      setOpen(false)
      resetForm()
      fetchQuestion()
    }).catch((err) => {
      console.log(err);

    })
  }
  const handleDelete = (id) => {
    axios.delete(`https://generateapi.techsnack.online/api/question/${id}`, {
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        alert("Question Deleted Successfully!")
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
      <Button onClick={handleOpen} variant='contained'>Add Question</Button>
      <input type="text" placeholder='Search here...'  className='w-full mt-5 p-3 border border-1 rounded-full outline outline-0' onChange={searchQuestion} value={search} />
      <Modal
        open={open}
        onClose={handleClose}
        className='border  border-0'
      >
        <Box sx={style}>
          <h1 className="text-3xl font-bold">Add Question</h1>
          <Formik
            initialValues={ini}
            onSubmit={handleSubmit}
          >
            {

              (props) => (


                <Form className="p-2">
                  <FormControl fullWidth sx={{my:1}}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.values.languagename}
                      label="language"
                      name='languagename'
                      onChange={props.handleChange}
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
                  <FormControl fullWidth sx={{mb:1}}>
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

                  <Button variant='contained' className='w-full' type='submit' >Submit</Button>

                </Form>
              )
            }
          </Formik>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr no</StyledTableCell>
              <StyledTableCell align="center">Language Name</StyledTableCell>
              <StyledTableCell align="center">Topic Name</StyledTableCell>
              <StyledTableCell align="center">Question</StyledTableCell>
              <StyledTableCell align="right">Remove</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((item, index) => (
              <StyledTableRow >

                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.languagename.languagename}</StyledTableCell>
                <StyledTableCell align="center">{item.topicname.topicname}</StyledTableCell>
                <StyledTableCell align="center">{item.question}</StyledTableCell>
                <StyledTableCell align="right"><DeleteIcon color='error' onClick={() => { handleDelete(item._id) }} /></StyledTableCell>
                <StyledTableCell align="right" ><EditSquareIcon color='primary' /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  )
}

export default Questions
