/*jshint esversion: 6 */
import React, {useState, useCallback} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CryptoList from './components/CryptoList';
import CryptoForm from './components/CryptoForm';
import CryptoEdit from './components/CryptoEdit';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);

  return (
    <>
      <BrowserRouter>
      <div className='whole'>
        <Navigation loggedIn ={loggedIn} setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>
        <Routes>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/list/:username" element = {<CryptoList />} />
          <Route path = "/add" element = {<CryptoForm user = {user} setUser = {setUser}/>} />
          <Route path = "/edit/:id" element = {<CryptoEdit user = {user}/>} />
          <Route path = "/login" element = {<Login setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>} />
          <Route path = "/register" element = {<Register setLoggedIn={setLoggedIn} user = {user} setUser = {setUser}/>} />
        </Routes>
        <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
        
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
