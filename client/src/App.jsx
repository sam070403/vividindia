import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Dashboard} from './pages/Dashboard'
import {Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {Projects} from './pages/Projects'
import Header from './components/Header'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Sign-in" element={<Signin/>}/>
      <Route path="/Sign-up" element={<Signup/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      
    </Routes>
    
    </BrowserRouter>
  )
}
