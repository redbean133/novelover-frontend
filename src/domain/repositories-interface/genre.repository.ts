import type { GenreWithoutDescription } from "../entities/genre.entity";

export interface IGenreRepository {
  getAll: () => Promise<GenreWithoutDescription[]>;
}
