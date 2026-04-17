import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Createnote from '../pages/CreateNote'
import NoteEditor from '../components/NoteEditor'
import NoteDetails from '../components/NoteDetails'

const AppRoutes = () => {
  return (
    <>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/create" element={<Createnote/>}/>
      <Route path="/edit/:id" element={<NoteEditor/>}/>
      <Route path="/note/:id" element={<NoteDetails/>}/>
    </Routes>
    </>
  )
}

export default AppRoutes