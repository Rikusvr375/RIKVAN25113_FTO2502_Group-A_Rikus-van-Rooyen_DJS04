import { genres } from "../views/data";

export const GenreService = {
  getNames(genreIds, genres) {
    return genreIds.map((id) => genres.find((g) => g.id === id)?.title || 'Unknown');
  },
};