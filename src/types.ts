export interface Location {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  minPrice: number;
  maxPrice: number;
  description: string;
  image: string;
  season: 'year-round' | 'summer' | 'winter' | 'spring' | 'autumn';
  tags: BudgetTag[];
  highlight?: boolean;
}

export type BudgetTag = 'coffee' | 'salary' | 'expedition';

export interface FilterState {
  budget: number;
  tags: BudgetTag[];
}
