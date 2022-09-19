import React, { useEffect, useState } from "react";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY_API}`;

// # we dont need string keep it mind and you can watch again udemy lecture - 220. Stock Photos - ENV VAR - watch file .env

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        setError({ show: "true", msg: data.Error });
      }

      if (data.Response === "True") {
        setData(data.Search || data);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading, error, data }; // return this value to the function
};

export default useFetch;
