// Interface for the 'Character' data entity
export interface CharacterEntity {
  id: number; // Primary ID
  name: string;
  species: string;
  image: string;
  type: string;
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
  url?: string;
}

// Interface for the API response when fetching characters
export interface CharacterApiResponse<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T;
}

// Interface extending CharacterEntity to include a favorite flag
export interface CharacterViewModel extends CharacterEntity {
  isFavorite: boolean;
}
