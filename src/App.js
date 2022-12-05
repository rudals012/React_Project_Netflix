import React,{useState, useEffect} from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import "./styles/App.css";
import {Outlet ,Route, Routes } from "react-router-dom";
import DetailPage from "./Routes/DetailPage";
import MainPage from "./Routes/MainPage";
import SearchPage from "./Routes/SearchPage";
import Auth from './Routes/Auth';
import Profile from "./Routes/Profile";
import {authService} from './fbase';
import { onAuthStateChanged } from "firebase/auth";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {  //firebase에서 사용자 정보를 받는 그 시점에 실행됨
    onAuthStateChanged(authService, (user) => {
      // console.log(user);
      if (user) {
        //  User is signed in
        setIsLoggedIn(user);
        setUserObj(user);
        // const uid = user.uid;

      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });  
  },[]);

  return (
    <>
    {init ? (
      <div className="app">
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Layout userObj={userObj}/>}>
              <Route index element={<MainPage userObj={userObj}/>}/>
              <Route path='profile' element={<Profile userObj={userObj}/>} />  
              <Route path=":movieid" element={<DetailPage userObj={userObj}/>}/>
              <Route path="search" element={<SearchPage userObj={userObj}/>}/>
            </Route>
          ) : (
            <Route path='/' element={<Auth />} />
          )}
        </Routes>
    </div>
    ) : "initializing..."}
    </>
  );
}

export default App;

{/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Science Fiction Movie" id="SM" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction} />
      <Footer /> */}