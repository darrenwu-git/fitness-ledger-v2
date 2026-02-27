import Dexie, { type Table } from 'dexie';
import type { WorkoutEntry, UserPreferences } from '@/types';

export class FitnessLedgerDB extends Dexie {
  workoutEntries!: Table<WorkoutEntry>;
  userPreferences!: Table<UserPreferences>;

  constructor() {
    super('FitnessLedgerDB');
    this.version(1).stores({
      workoutEntries: '++id, exerciseName, type, timestamp',
      userPreferences: '++id' // Usually just one record (index 1)
    });
  }
}

export const db = new FitnessLedgerDB();
