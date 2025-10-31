export interface Verse {
  reference: string; // e.g., "RV 7.95.1"
  mandala: number;
  sukta: number;
  verse: number;
  sanskrit?: string;
  translation: string;
  translator: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'river' | 'mountain' | 'tribe' | 'place';
  coordinates: [number, number]; // [longitude, latitude]
  verses: Verse[];
  themes: {
    dawn?: number;
    rain?: number;
    battle?: number;
    soma?: number;
    fire?: number;
    rta?: number; // cosmic order
  };
  uncertainty: 'low' | 'medium' | 'high';
  description: string;
}

export interface Path {
  id: string;
  name: string;
  description: string;
  color: string;
  locations: string[]; // location IDs in order
  purpose?: 'fire' | 'hospitality' | 'cosmic' | 'battle' | 'water' | 'ritual';
}

export interface ThemeFilters {
  dawn: number;
  rain: number;
  battle: number;
  soma: number;
  fire: number;
  rta: number;
}
