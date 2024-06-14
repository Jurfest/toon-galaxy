export interface Card {
  id: number; // Primary ID
  name: string;
  species: string;
  image: string;
  type: string;
  isFavorite: boolean;
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
