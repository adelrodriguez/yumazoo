export type Recipe = {
  authenticity: Authenticity;
  cookingOil: string;
  description: string;
  difficulty: Difficulty;
  name: string;
  origin: string;
  produce: string;
  protein: string;
  serves: number;
  spice: string;
  stock: string;
  volume: number;
};

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export const difficultyLabels = {
  [Difficulty.Easy]: 'Easy',
  [Difficulty.Medium]: 'Medium',
  [Difficulty.Hard]: 'Hard',
};

export enum Authenticity {
  Verified = 'Verified',
  Unverified = 'Unverified',
}
