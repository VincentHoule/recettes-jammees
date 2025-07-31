import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import Layout from './pages/Layout';
import RecipeContextProvider from './contexts/RecipeContext';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d4b1e2',
    },
    secondary: {
      main: '#3b7bf7',
    },
  },

});

function App() {


  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <RecipeContextProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path='/' element={<Home />} />
              </Route>
              <Route path="/login"element={<Login/>}/>
              <Route path="/signIn"/>
            </Routes>
          </RecipeContextProvider>

        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
