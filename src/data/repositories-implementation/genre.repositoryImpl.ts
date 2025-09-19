import type { IGenreRepository } from "@/domain/repositories-interface/genre.repository";
import apiService from "../sources/apiService";
import type { GenreWithoutDescription } from "@/domain/entities/genre.entity";

export class GenreRepositoryImpl implements IGenreRepository {
  async getAll(): Promise<GenreWithoutDescription[]> {
    const response = await apiService.get<GenreWithoutDescription[]>(`/genres`);
    return response.data;
  }
}
