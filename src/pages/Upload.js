import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import { Button, Container, Divider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Dropzone from 'react-dropzone'



export default function Upload() {

    const [newStory, setNewStory] = useState('')
    const [newStoryName, setNewStoryName] = useState('')

    const [acceptedFile, setAcceptedFile] = useState(null)

    const handleNewStoryUpload = async() => {
        await axios.post('http://43.205.229.194:5000/upload-story', {newStory, newStoryName})
        .then((response) => {
            console.log(response.data)
            window.alert('New Story Uploaded!')
            setNewStory('')
            setNewStoryName('')
        }).catch((error) => {
            console.log(error)
            window.alert('Something went wrong!')
        })
    }

    const handleVoiceUpload = async() => {
        const formData = new FormData();
        formData.append('file', acceptedFile)
        await axios.post('http://43.205.229.194:5000/upload-voice', formData)
        .then((response) => {
            console.log(response.data)
            window.alert('Voice File Uploaded!')
        }).catch((error) => {
            console.log(error)
            window.alert('please check your network connection')
        })
    }
  return (
    <>
        <Navbar />

        <Container style={{marginTop: 20}}>
            <Typography variant="h4"  textAlign={'center'}>
                Upload
            </Typography>
            <Divider sx={{my: 2}}/>

            <Typography variant="body1" paragraph>
                Upload your own stories
            </Typography>

            <TextField value={newStoryName} onChange={(e) => setNewStoryName(e.target.value)} label="Story Name" fullWidth />
            <TextField value={newStory} onChange={(e) => setNewStory(e.target.value)} label="Story" multiline rows={4} fullWidth />
            <Button variant="contained" onClick={handleNewStoryUpload}>Upload</Button>

            <Divider sx={{my: 2}}/>

            <Typography variant="body1" paragraph>
                Upload Voice File
            </Typography>

            <Dropzone onDrop={(acceptedFiles) => setAcceptedFile(acceptedFiles[0])}>
                {({getRootProps, getInputProps}) => (
                    <section style={{border: '1px dashed black', padding: 20}}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            {/* show uploaded file */}
            </Dropzone>
            {acceptedFile && <p>{acceptedFile.name}</p>}

            <Button variant="contained" onClick={handleVoiceUpload}>Upload</Button>
        </Container>
    </>
  )
}
