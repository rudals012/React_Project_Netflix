import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/SearchPage.css";
import { useDebounce } from '../hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  // console.log('uselocation()', useLocation());

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  console.log('searchTerm',searchTerm);
  
  useEffect(() => {
    if(debouncedSearchTerm){  //searchTerm값이 있을때만 실행해라
      fetchSearchMovie(debouncedSearchTerm);
    }
  },[debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`);
        console.log("request",request);
        setSearchResults(request.data.results);

    } catch (error) {
      console.log("error" , error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
             <section className="search-container">
              {searchResults.map(movie => {
                if(movie.backdrop_path !== null && movie.media_type !== "person"){
                  const movieImageUrl = "https://image.tmdb.org/t/p/w400" + movie.backdrop_path;
                  return (
                    <div className='movie' key={movie.id}>
                      <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                        <img src={movieImageUrl}
                           alt={movie.title || movie.name || movie.original_name}
                           className="movie__poster"/>
                      </div>
                      <div className='movie__txt'>
                        <p>{movie.title || movie.name || movie.original_name}</p>
                        <span className='bottom_txt'>{movie.release_date} · {movie.media_type}</span>
                      </div>
                    </div>
                  )
                }
            })}
            </section>
      ) : (
            <section className="no-results">
              <div className='no-results__text'>
                <p>
                  찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
                </p>
              </div>
            </section>
    );

  }

  return renderSearchResults();

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage
