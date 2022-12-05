import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/Auth.css";
import Footer from '../components/Footer';


function Auth() {

  return (
    <>
    <div className='authContainer'>
      <div className='bg'>
          <img src='https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/a0693dae-6fc7-4fe0-988b-b2a5295fff44/KR-ko-20221031-popsignuptwoweeks-perspective_alpha_website_medium.jpg' 
              alt='Netflix bg'
              className='auth_bg' />
      </div>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
             alt='Netflix logo'
             className='auth__logo' />
        <AuthForm />
    </div>
    <Footer />
    </>
  )
}

export default Auth