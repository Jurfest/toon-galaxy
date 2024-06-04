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
  episode?: [string];
  gender?: string;
  location?: {
    name?: string;
    url?: string;
  };
  origin?: {
    name?: string;
    url?: string;
  };
  status?: string;
  type?: string;
  url?: string;
}
