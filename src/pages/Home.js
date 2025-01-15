import React from 'react';
import { Container, Typography, Grid, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { purple, yellow } from '@mui/material/colors';
import Navbar from '../Components/Navbar';

const HomePage = () => {
    return (
        <>
        <Navbar/>
            <Box bgcolor={purple[100]}
                sx={{ backgroundImage: 'url("./img/bg.jpg")', color: 'white' }}
                py={20} textAlign={'center'}
            >
                <Container>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.8)', borderRadius: 5 }} p={5} >
                        <Typography variant="h2" gutterBottom>
                            Welcome to Story Teller with Voice Changer
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Telling bedtime stories with a personal touch, even when you can't be
                            there.
                        </Typography>
                    </Box>
                </Container>

            </Box>

            <Box py={10} >
                <Container>
                    {/* Section 1 */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <img
                                src="./img/img1.jpg"
                                alt="Section 1"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} textAlign={'justify'}>
                            <Typography variant="h4" gutterBottom>
                                Transform Your Voice
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Unleash the power of our cutting-edge voice changer technology! Now, you have the ability to narrate stories in a way that's uniquely yours. Whether you want to share tales in your own familiar voice or embark on a playful adventure by embodying a range of whimsical characters, the choice is yours.
                                <br /><br />
                                With our intuitive interface, it's as simple as a few clicks. Immerse yourself in the magic of storytelling, and let your imagination soar. Watch as your stories come to life with a personalized touch that will captivate and enthrall your little listeners.
                                <br /><br />
                                Recreate the warmth and familiarity of your presence, even when miles apart. Embrace the joy of connecting through stories, leaving an indelible mark on their hearts.
                            </Typography>
                            <Box width={'100%'} textAlign={'center'}>

                                <Button variant="contained" component={Link} to="/voice-changer" size='large'>
                                    Try it out
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box py={10} bgcolor={yellow[300]}>
                <Container>

                    {/* Section 2 */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                Stay Connected
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                <strong>Bridge the Gap:</strong> Connect with your child, no matter the distance. Whether you're at work or on a trip, our service ensures a continuous bond through storytelling.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                <strong>Engagement & Entertainment:</strong> Keep your child engaged and entertained with stories narrated in your own voice. It's a personalized experience that sparks imagination and joy.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                <strong>Uninterrupted Connection:</strong> Overcome physical separation and create a sense of closeness. Share moments that transcend the limitations of time and space.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                <strong>Foster Emotional Well-being:</strong> Provide comfort and reassurance to your child. Hearing your voice in stories cultivates a sense of security and emotional well-being.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                <strong>Build Lasting Memories:</strong> Craft unforgettable moments through storytelling. These memories will be cherished for a lifetime, strengthening your bond with your child.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img
                                src="./img/img2.jpg"
                                alt="Section 2"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
