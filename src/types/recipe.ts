export type Recipe = {
  name: string;
  origin: string;
  description: string;
  difficulty: Difficulty;
  protein: string;
  produce: string;
  spice: string;
  cookingOil: string;
  volume: number;
  serves: number;
  authenticity: Authenticity;
  stock: string;
};

enum Difficulty {
  Easy,
  Medium,
  Hard,
}

enum Authenticity {
  Verified = 'Verified',
  Unverified = 'Unverified',
}
