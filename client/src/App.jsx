import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Dashboard} from './pages/Dashboard'
import {Signin} from './pages/Signin'
import {Signup} from './pages/Signup.jsx'
import {Projects} from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute.jsx'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      </Route>
      <Route path="/Projects" element={<Projects/>}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
