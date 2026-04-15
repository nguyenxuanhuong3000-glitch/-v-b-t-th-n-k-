export type TransportType = 'road' | 'air' | 'water' | 'rail';

export interface TransportItem {
  id: string;
  name: string;
  type: TransportType;
  image: string;
  sound?: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  stars: number;
}

export type GameState = 'home' | 'map' | 'playing' | 'result';
