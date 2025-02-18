import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getNowPlayingMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/movie/now_playing?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};
export const getPopularMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/movie/top_rated?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};
export const getUpComing = async (page = 1) => {
  const movies = await axios.get(`${baseUrl}/movie/upcoming?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

// discover
export const getDiscoverMovies = async (page = 1) => {
  const movies = await axios.get(` ${baseUrl}/discover/movie?language=en-US&page=${page}&api_key=${apiKey}`);
  return movies.data.results;
};

// detail
export const getDetail = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`);
  return movies.data;
};

export const getVideos = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/movie/${movie_id}videos?api_key=${apiKey}&append_to_response=videos`);
  return movies.data;
};

export const getReviews = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/movie${movie_id}/reviews?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getSimilarMovie = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/movie/${movie_id}/recommendations?language=en-US&page=1&api_key=${apiKey}`);
  return movies.data.results;
};

export const getCredit = async (movie_id) => {
  const movies = await axios.get(`${baseUrl}/movie${movie_id}/credits?api_key=${apiKey}`);
  return movies.data;
};

export const getGenre = async () => {
  const movies = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  return movies.data;
};
export const getPopularArtist = async () => {
  const person = await axios.get(`${baseUrl}/person/popular?api_key=${apiKey}`);
  return person.data.results;
};

export const searchMovie = async (keyword) => {
  const search = await axios.get(`${baseUrl}/search/movie?query=${keyword}&page=1&api_key=${apiKey}`);
  return search.data;
};
