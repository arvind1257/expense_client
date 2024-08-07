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
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  const [loading, setLoading] = useState(false);

  const onLoading = (status) => {
    setLoading(status);
  }
  
  const [search,setSearch] = React.useState("");

  // useEffect(()=>{
  //   window.addEventListener('beforeunload', (event) => {
  //     console.log(event);
  //     event.returnValue = `Are you sure you want to leave?`;
  //   });
  // })

  return (
    <>
      {
        loading && <Loading></Loading>
      }
      <Header search={search} setSearch1={(value)=>setSearch(value)}></Header>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Login loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Home' element={<Home search={search} loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/addexpense' element={<Home loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/exchange' element={<Home loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Report' element={<Report loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Note' element={<Note loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
        <Route path='/Settings' element={<Settings loading={loading} onLoading={(status) => onLoading(status)} />}></Route>
      </Routes>x
    </>
  );
}

export default App;
