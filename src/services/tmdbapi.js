import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getNowPlayingMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/now_playing?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};
export const getPopularMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/popular?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/top_rated?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};
export const getUpComing = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/upcoming?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

// discover
export const getDiscoverMovies = async (page = 1) => {
  const movies = await axios.get(` https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

// detail
export const getDetail = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}?api_key=${apiKey}`);
  return movies.data;
};

export const getVideos = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}videos?api_key=${apiKey}&append_to_response=videos`);
  return movies.data;
};

export const getReviews = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}/reviews?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getSimilarMovie = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}/recommendations?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getCredit = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/${movie_id}/credits?api_key=${apiKey}`);
  return movies.data;
};

export const getGenre = async () => {
  const movies = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
  return movies.data;
};
export const getPopularArtist = async () => {
  const person = await axios.get(` https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`);
  return person.data.results;
};
