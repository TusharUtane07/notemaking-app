import React, { useState } from "react";
import "./Style.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import EditorPage from "./components/EditorPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div className= 'flex flex-col  items-center h-screen w-screen pt-20 bg-[#B2A4FF]'>
      <div className="flex items-center space-x-5 font-bold">
        <h1 className="text-4xl lg:text-8xl uppercase text-[#0B2447]">Notes Storage</h1>
      </div>
      <div className="mt-6">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editor/:id" element={<EditorPage />} />
      </Routes>
      </div>
      <ToastContainer position="bottom-right"
autoClose={500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"/>
    </div>
  );
};

export default App;
