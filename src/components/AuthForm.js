import React, { useState, useEffect } from 'react';
import {authService} from '../fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {FaGoogle} from "react-icons/fa";
import "../styles/AuthForm.css";

function AuthForm() {

    const [newAccount, setNewAccount] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      onAuthStateChanged(authService, (user) => {
        if (user) {
          // User is signed in
          setIsLoggedIn(user);
          setUserObj(user);
        } else {
          // User is signed out
          setIsLoggedIn(false);
        }
        setInit(true);
        });
      }, []); 

    const onChange = e => {
        // console.log(e.target.name);
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount){
                // create newAccount
                data = await createUserWithEmailAndPassword(authService, email, password)
            }else{
                // log in
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data);
        } catch (error){
            // console.log(error);
            setError(error.message);
        }
    }
    
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = (e) => {
    // console.log(e.target.name);
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
        provider = new GoogleAuthProvider();
    }
    // const는 값이 바뀌면 안되는 절대값이라 let를 사용해야함
    const data = signInWithPopup(authService, provider);
    // console.log(data);
  }

  return (
    <>
        <form onSubmit={onSubmit} className="container">
            <h2>로그인</h2>
            <input type="email" placeholder="이메일" required
            name="email" value={email} onChange={onChange} className="authInput"/>
            <input type="password" placeholder='비밀번호' required 
            name="password" value={password} onChange={onChange} className="authInput"/>
            {/* <input type="submit" value="Log In" /> */}
            <input type="submit" className="authInput authSubmit"
            value={newAccount ? "회원가입" : "로그인"} />
            {error &&
            <span className='authError'>{error}</span>
            }
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "로그인" : "회원가입"}
            </span>
            <div className='authBtns'>
                <button onClick={onSocialClick} name="google" className='authBtn'>
                Continue with Goggle<FaGoogle className='googleIcon'/>
                </button>
            </div>
        </form>
    </>
  )
}

export default AuthForm