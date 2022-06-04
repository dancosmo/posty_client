import React,{ useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import { gapi } from "gapi-script";
import Home from "./components/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const clientId = process.env.REACT_APP_CLIENT_ID; 

function App() {

useEffect(() =>{
  function start() {
    gapi.auth2.getAuthInstance({
      clientId: clientId,
      scope:"https://www.googleapis.com/auth/cloud-platform"
    })
  }
  gapi.load("client:auth2", start);
});

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/auth" exact element={<Auth/>}></Route>
        </Routes>
        <Footer/>
      </Container>
    </BrowserRouter>
  );
}

export default App;
