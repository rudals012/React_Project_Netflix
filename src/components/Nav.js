import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import '../styles/Nav.css';

function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    /* 로그아웃 기능 */
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/'); // 홈으로 이동 (다이렉트 기능)
        window.location.reload();
    };

    useEffect( () => {
        window.addEventListener("scroll", () => {
            console.log("window.scrolly", window.scrollY);
            if(window.scrollY > 50){
                setShow(true);
            }else{
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {}); // 컴포넌트가 더이상 사용되지 않을 경우에 기존의 윈도우 스크롤이벤트를 삭제하는 역할
        }
    },[]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }
  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
             alt='Netflix logo'
             className='nav__logo'
             onClick={() => (window.location.href = "/netflix_app/")}/>
        <input type="search" value={searchValue} onChange={onChange} 
            placeholder="영화를 검색해주세요" className='nav__input' />
        <div className='nav__avatar'>
            <input type="submit" className='logoutBtn' onClick={onLogOutClick}
                  value="로그아웃" />
            <Link to={'/profile'}>
                <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
                    alt='User logged'
                    className='nav__avatar_img'/>
            </Link>
        </div>
    </nav>
  )
}

export default Nav