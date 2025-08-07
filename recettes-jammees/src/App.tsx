import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import ModifyRecipe from './pages/ModifyRecipe';

const theme = createTheme({
  palette: {
    mode: 'dark',
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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/myRecipes' element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path='/createRecipe' element={<CreateRecipe />} />
            <Route path='/modifyRecipe/:id' element={<ModifyRecipe />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
