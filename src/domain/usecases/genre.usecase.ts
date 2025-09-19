import type { IGenreRepository } from "../repositories-interface/genre.repository";

export const GenreUseCase = (genreRepository: IGenreRepository) => {
  const getAll = async () => {
    const response = await genreRepository.getAll();
    return response;
  };

  return { getAll };
};
