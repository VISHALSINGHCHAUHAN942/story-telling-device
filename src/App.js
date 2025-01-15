import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home';
import StoryTellingPage from './pages/StoryTellingPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { purple, yellow } from '@mui/material/colors';
import Upload from './pages/Upload';

function App() {

  const theme = createTheme({
    palette: { primary: { main: purple[600] }, secondary: { main: yellow[600] } }
  })
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/story' element={<StoryTellingPage />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
