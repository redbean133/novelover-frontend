export interface IAuthorRepository {
  getSuggestions: (name: string) => Promise<string[]>;
}
