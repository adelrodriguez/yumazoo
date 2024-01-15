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

enum Difficulty {
  Easy,
  Medium,
  Hard,
}

export const DifficultyLabel = {
  [Difficulty.Easy]: 'Easy',
  [Difficulty.Medium]: 'Medium',
  [Difficulty.Hard]: 'Hard',
};

enum Authenticity {
  Verified = 'Verified',
  Unverified = 'Unverified',
}
