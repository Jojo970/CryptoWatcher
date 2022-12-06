import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./HomePage.css"

const HomePage = () => {
  return (
    <>
    <main id = 'mainpage'>
      <div>
            <h1 id = "homedescribe">
                Crypto Portfolio Tracking, Built For DeskTop
            </h1>
            <p>Please login or register to use.</p>
      </div>
            <div>
                        <NavLink id='clickLink' to = "/login">
                            <b>Login</b>
                        </NavLink>
                        <span id='clickLink'> / </span>
                        <NavLink id='clickLink' to = "/register">
                            <b>Register</b>
                        </NavLink>
                    </div>
    </main>
    </>
  )
}

export default HomePage