import { genres } from './genres';

export const findGenre = (id) => {
  const getGenre = genres.find((g) => g.id === id);
  if (getGenre) {
    return getGenre.name;
  }
  if (!getGenre) {
    return 'Unknown Genre';
  }
};
