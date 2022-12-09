import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./HomePage.css"

const HomePage = () => {
  return (
    <>
    <main id = 'mainpage'>
      <div>
            <h1 id = "homedescribe">
                Crypto Portfolio Tracking, made easy
            </h1>
            <p>Please login or register to use.</p>
      </div>
    </main>
    </>
  )
}

export default HomePage