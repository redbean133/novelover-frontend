export interface AuthorWithoutBiography {
  id: number;
  name: string;
}

export interface Author extends AuthorWithoutBiography {
  biography: string;
}
