import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import ProfilUser from './Pages/ProfilUser/ProfilUser'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <>
    <Navbar/>
    <div className="contenu">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profil' element={<ProfilUser/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
