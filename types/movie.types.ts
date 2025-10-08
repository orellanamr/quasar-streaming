export interface Poster {
  url: string;
  aspectRatio: string;
}

export interface Posters {
  portrait: Poster;
  landscape: Poster;
  thumbnail: Poster;
}

export interface CastMember {
  characterName: string;
  actorName: string;
}

export interface Crew {
  directors: string[];
  producers: string[];
  writers: string[];
}

export interface Classification {
  rating: string;
  advisoryContent: string[];
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  rating: string;
  quality: string;
  description: string;
  isTopMovie: boolean;
  similarContent: string[];
  posters: Posters;
  cast: CastMember[];
  crew: Crew;
  classification: Classification;
}

export interface Container {
  id: string;
  title: string;
  layout: 'portrait-card' | 'landscape-card';
  items: Movie[];
}

export interface MoviesData {
  containers: Container[];
}

export type LayoutType = 'portrait-card' | 'landscape-card';