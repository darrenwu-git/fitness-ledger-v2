import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { WorkoutEntry } from '@/types';

export function useWorkouts() {
  const workouts = useLiveQuery(() => 
    db.workoutEntries.orderBy('timestamp').reverse().toArray()
  );

  const addWorkout = async (entry: WorkoutEntry) => {
    return await db.workoutEntries.add(entry);
  };

  const deleteWorkout = async (id: number) => {
    return await db.workoutEntries.delete(id);
  };

  const updateWorkout = async (id: number, changes: Partial<WorkoutEntry>) => {
    return await db.workoutEntries.update(id, changes);
  };

  return {
    workouts,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    isLoading: workouts === undefined
  };
}
