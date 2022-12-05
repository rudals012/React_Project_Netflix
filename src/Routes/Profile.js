import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { db, authService, storage } from '../fbase';
import { updateProfile} from "firebase/auth";
import "../styles/Profile.css";

function Profile({userObj}) {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onChange = e => {
        const {target: {value}} = e;
        setNewDisplayName(value);
      }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
          await updateProfile(authService.currentUser, {displayName: newDisplayName,
          });
        }
        setNewDisplayName('');
      };

  return (
    <div className="profile_edit">
        <h2 className='title'>프로필 수정</h2>
        <div className='profile_img'>
            <img src="https://ac-p2.namu.la/20220111s1/a36807c327408600f3c5805a72cb9799f7b1e0dd171b1d4bd610ce4229ef9618.png?type=orig" 
                alt='profile_bg'
                className='profile_bg'/>
        </div>
        <form onSubmit={onSubmit} className="profileForm">
            <label className='name'>이름변경</label>
            <input type="text" placeholder='Display name' onChange={onChange} value={newDisplayName} 
            autoFocus className='formInput'/>
        </form>
        <div className='profile_btn'>
            <Link to={'/'}>
              <input type="submit" value="닫기" className='formBtn cancelBtn'/>
            </Link>
            <input type="submit" value="수정" className='formBtn updateBtn' />
        </div>
    </div>
  )
}

export default Profile