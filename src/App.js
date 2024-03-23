import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import './App.css';
import Loading from './Components/Loading/Loading';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Report from './Pages/Report/Report';
import Note from './Pages/Note/Note';
import Settings from './Pages/Settings/Settings';
import Amount from "./Pages/Amount/Amount";
import Login from "./Pages/Login/Login";



function App() {
  const [loading, setLoading] = useState(false);

  const onLoading = (status) => {
    setLoading(status);
  }

  return (
    <>
      {
        loading && <Loading></Loading>
      }
      <Header></Header>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Login loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Home' element={<Home loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Report' element={<Report loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Note' element={<Note loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Settings' element={<Settings loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
      </Routes>x
      <Amount />
    </>
  );
}

export default App;
