import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Container, Box, Backdrop, CircularProgress, Slider, SpeedDialIcon } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios'
import { purple, yellow } from '@mui/material/colors';
import Navbar from '../Components/Navbar'
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SpeedIcon from '@mui/icons-material/Speed';


const StoryTellingPage = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  // const [voices, setVoices] = useState([])
 
  const [voices, setVoices] = useState([])
  const [stories, setStories] = useState([])

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStory, setDialogStory] = useState(false);

  const [backdropOpen, setBackdropOpen] = useState(false)

  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const [speed, setSpeed] = useState(1); // Add speed state variable

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    if (audio) {
      audio.playbackRate = newValue; // Adjust audio playback speed
    }
  };


  const handleDialogOpen = (story) => {
    setDialogStory(story)
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  const getVoices = () => {
    axios.get('http://43.205.229.194:5000/list-voices').then((response => {
      console.log(response.data)
      setVoices(response.data.voiceNames)
    }))
  }
  const getStories = () => {
    axios.get('http://43.205.229.194:5000/list-stories').then((response => {
      console.log(response.data)
      setStories(response.data.stories)
    }))
  }


  const handleRunTTS = () => {

    setIsPlaying(false)
    if (audio) {
      if (isPlaying) {
        audio.pause()
      }
    }

    setBackdropOpen(true)

    axios.post('http://43.205.229.194:5000/run-tts', {
      text: selectedStory.story,
      voiceName: selectedVoice
    }, { responseType: 'arraybuffer' })
      .then(response => {
        // Assuming the response contains a link to the generated audio file
        setBackdropOpen(false)
        console.log("Audio Response: ", response)
        const blob = new Blob([response.data], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        setAudio(audio)
        audio.play();
        setIsPlaying(true)
      })
      .catch(error => {
        console.error('Error running TTS:', error);
      });
  };

  const handleStopButtonClick = () => {
    if (isPlaying) {
      if (audio) {
        audio.pause();
      }
    } else {
      if (audio) {
        audio.play();
      }
    }
    setIsPlaying(!isPlaying);
  };


  useEffect(() => {
    getVoices()
    getStories()
  }, [])

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  }

  const handleVoiceClick = (voice) => {
    setSelectedVoice(voice);
  }

  const handlePlayButtonClick = () => {
    // Add your play sound logic here
    console.log('Waiting for sound...');
    handleRunTTS()
  }

  return (
    <>
      <Navbar />
      <Box py={10} bgcolor={purple[500]}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" gutterBottom color={'white'} fontWeight={'bold'}>
                Select a Story
              </Typography>
              <Grid container spacing={2}>
                {stories.map((story, id) => (
                  <Grid item key={id} xs={3}>
                    <Card
                      onClick={() => handleStoryClick(story)}
                      variant={selectedStory === story ? 'outlined' : 'elevation'}
                      elevation={8}
                      style={{ cursor: 'pointer', backgroundColor: selectedStory === story ? purple[200] : '' }}

                    >
                      <CardContent>
                        <Typography variant="h6">{story.storyName}</Typography>
                        <Typography variant="body2">
                          {story.story.slice(0, 50)}
                          {story.story.length > 50 && '...'}
                        </Typography>
                        <Button onClick={() => handleDialogOpen(story)}>Read Story</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container >
      </Box
      >
      <Box py={10} bgcolor={yellow[500]}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                Select a Voice
              </Typography>
              <Grid container spacing={2}>
                {voices.map((voice, id) => (
                  <Grid item key={id} xs={3}>
                    <Card
                      onClick={() => handleVoiceClick(voice)}
                      variant={selectedVoice === voice ? 'outlined' : 'elevation'}
                      elevation={8}
                      style={{ cursor: 'pointer', backgroundColor: selectedVoice === voice ? yellow[200] : '' }}
                    >
                      <CardContent>
                        <Typography variant="h6" textAlign={'center'}>{voice}</Typography>
                        {/* <Typography variant="body2">{voice.type}</Typography> */}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

          </Grid>
        </Container >
      </Box>

      <Box py={4}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={6} textAlign={'center'}>
              <Button
                size='large'
                variant='contained'
                onClick={handlePlayButtonClick}
                disabled={!selectedStory || !selectedVoice} >
                <DownloadForOfflineIcon />
              </Button>
            </Grid>
            <Grid item xs={6} textAlign={'center'}>
              <Button
                size='large'
                variant='contained'
                onClick={handleStopButtonClick}
                disabled={!selectedStory || !selectedVoice || !audio}
              >
                {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
              </Button>
              <Box display={'flex'}>
                <SpeedIcon color='primary'  style={{fontSize:30, marginRight:10}}/>

                <Slider
                  value={speed}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={handleSpeedChange}
                  disabled={!selectedStory || !selectedVoice || !audio}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        {dialogStory && (
          <>
            <DialogTitle>{dialogStory.storyName}</DialogTitle>
            <DialogContent>
              <Typography variant="body2">{dialogStory.story}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      // onClick={() => setBackdropOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default StoryTellingPage;
