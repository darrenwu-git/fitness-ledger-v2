export type WorkoutType = 'strength' | 'cardio';
export type EntrySource = 'voice' | 'manual';
export type WeightUnit = 'kg' | 'lbs';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface WorkoutSet {
  id?: string;
  reps: number;
  weight: number;
  isPersonalRecord?: boolean;
}

export interface WorkoutEntry {
  id?: string; // Dexie will auto-increment or we can use UUIDs
  exerciseName: string;
  type: WorkoutType;
  timestamp: number;
  sets?: WorkoutSet[];
  duration?: number; // minutes for cardio
  notes?: string;
  source: EntrySource;
}

export interface UserPreferences {
  id?: number; // Dexie primary key (single record)
  geminiApiKey: string;
  preferredUnit: WeightUnit;
  theme: ThemePreference;
}

export interface FitnessAsset {
  totalVolume: number;
  totalCardioMinutes: number;
  netWorth: number; // Sum of both for dashboard
}
