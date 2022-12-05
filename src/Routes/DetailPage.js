import axios from "../api/axios";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {FaRegThumbsUp} from "react-icons/fa";
import "../styles/DetailPage.css";

function DetailPage() {
  const [movie, setMovie] = useState({});

  let {movieid} = useParams();
  console.log('movieid',movieid);
  console.log('useParams()',useParams());

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieid}`);
    console.log('request',request);
    setMovie(request.data);
  }

  useEffect(() => {
    fetchData();
  },[movieid]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  if(!movie) return <div>...loading</div>
  return (
    <section className="detail">
      <div className="detail_blur"></div>
      <img 
        className="modal__background-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="background"
      /> 
      <div className="detail_content">
        <div className="detail_img">
          <img 
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="poster"
            width="500"
          /> 
        </div>
        <div className="detail_txt">
          <h2 className="detail_title">{movie.title || movie.name || movie.original_name}</h2>
          <p className='detail__description'>
            {truncate(movie.overview, 176)}
          </p>
          <span className="date">{movie.release_date}</span> · <span className="score"><FaRegThumbsUp /> {movie.vote_count}</span>
        </div>
      </div> 
    </section>
  )
}

export default DetailPage