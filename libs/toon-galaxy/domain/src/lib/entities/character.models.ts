/**
 * Interface for the 'Character' data
 */
export interface CharacterEntity {
  id: number; // Primary ID
  name: string;
  species: string;
  image: string;
  // Currently unused:
  created?: string; // ISO 8601 string
  episode?: string[];
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  location?: {
    name?: string;
    url?: string;
  };
  origin?: {
    name?: string;
    url?: string;
  };
  status?: 'Dead' | 'Alive' | 'unknown';
  type?: string;
  url?: string;
}

export interface CharacterApiResponse<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T;
}
