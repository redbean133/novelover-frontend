import type { IAuthorRepository } from "../repositories-interface/author.repository";

export const AuthorUseCase = (authorRepository: IAuthorRepository) => {
  const getSuggestions = async (name: string) => {
    const response = await authorRepository.getSuggestions(name);
    return response;
  };

  return { getSuggestions };
};
