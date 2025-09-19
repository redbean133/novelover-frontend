import type { IAuthorRepository } from "@/domain/repositories-interface/author.repository";
import apiService from "../sources/apiService";

export class AuthorRepositoryImpl implements IAuthorRepository {
  async getSuggestions(name: string): Promise<string[]> {
    const response = await apiService.get<string[]>(`/authors/suggestions`, {
      params: {
        name,
      },
    });
    return response.data;
  }
}
