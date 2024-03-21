import React, { useState, useEffect } from "react";
import './Movies.css'

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const API_KEY = "eca02ea69a797930b00d079e6eedb221";
  const API_URL = "https://api.themoviedb.org/3";
  const IMG_PATH = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const res = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      const data = await res.json();
      setMovies(data.results);
      setSearchTerm("");
    } else {
      const res = await fetch(
        `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const getRatingClass = (rate) => {
    if (rate >= 8) {
      return "green";
    } else if (rate >= 5) {
      return "orange";
    } else {
      return "red";
    }
};
  

  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center gap-1 my-10 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="rounded-lg w-2/3 px-2 h-10"
        />
        <button type="submit" onClick={handleSearch} className="rounded-xl text-xl text-white bg-red-600 py-1 px-10" >Search</button>
      </form>
      <div className="p-2 flex flex-wrap" >
      
        {movies.map((movie) => (
          <div key={movie.id} className="w-1/4 p-10 shadow-lg shadow-indigo-500/50   card " >

            <div className="card-body">
             <img src={`${IMG_PATH}/${movie.poster_path}`} alt={movie.title} className="image" />
            <div className="w-full bg-slate-400  p-3 text-white overview">
             <div className="text">
             <h3>Overview</h3>
              <p>{movie.overview}</p>
             </div>
            </div>
            </div>
            <div className="flex justify-between py-5 text-white">
              <h3 className="text-white">{movie.title}</h3>
              <span className={getRatingClass(movie.vote_average)}  
              >{movie.vote_average}
              </span>
            </div>
          
          </div>
         
        ))}
        </div>
    </div>
  );
};

export default MovieApp;
