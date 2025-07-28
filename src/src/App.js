
// Working Project (Daily Expensense)


import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "./Working On this Project/Landing/Landing"
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
    <Landing/>
    </div>
  )
}

export default App