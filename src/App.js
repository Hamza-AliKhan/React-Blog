import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './components/HomePage.js';
import PostList from './components/PostList.js';
import AlbumList from './components/AlbumList.js';
import PictureList from './components/PictureList.js';
import CommentList from './components/CommentList.js';
import UserList from './components/UserList.js';
import Footer from './components/Footer.js';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from './slices/headerSlice.js';

function App() {
  const darkMode = useSelector(state => state.app.header.darkMode);
  const dispatch = useDispatch();

  const handleDarkModeToggle = () => {
    dispatch(setDarkMode(!darkMode));
  };
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          darkMode,
          ...( darkMode ?{
             mode:'dark',
             primary: {
              main: '#9a73b5',
             },
            background:{
              default: 'rgba(45,45,45,1)',
            }, 
          
          }:{
               mode:'light',
               primary: {
                 main: '#922130',
                 contrastText: '#ffffff',
               },
               secondary: {
                main: '#219283',
                contrastText: '#ffffff',
              },
              background: {
                default: 'rgba(0,0,0,0.1)',
                paper: '#ffffff'
              },
             }),
            typography: {
              fontFamily: 'Roboto',
            },
        },
      }),
    [darkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
        <Container >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/comments" element={<CommentList />} />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/photos" element={<PictureList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
