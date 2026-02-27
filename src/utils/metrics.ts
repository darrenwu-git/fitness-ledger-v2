import type { WorkoutEntry } from '@/types';

export function calculateTotalVolume(workouts: WorkoutEntry[]) {
  return workouts.reduce((total, w) => {
    if (w.type === 'strength' && w.sets) {
      return total + w.sets.reduce((st, s) => st + (s.reps * s.weight), 0);
    }
    return total;
  }, 0);
}

export function calculateCardioDuration(workouts: WorkoutEntry[]) {
  return workouts.reduce((total, w) => {
    if (w.type === 'cardio' && w.duration) {
      return total + w.duration;
    }
    return total;
  }, 0);
}

export function calculateAssetNetWorth(workouts: WorkoutEntry[]) {
  const vol = calculateTotalVolume(workouts);
  const cardio = calculateCardioDuration(workouts);
  return vol + (cardio * 10); // Simple weights: 1min cardio = 10kg volume units
}

export function getVolumeByDay(workouts: WorkoutEntry[]) {
  const days: Record<string, number> = {};
  
  workouts.forEach(w => {
    const day = new Date(w.timestamp).toLocaleDateString();
    if (w.type === 'strength' && w.sets) {
      const vol = w.sets.reduce((st, s) => st + (s.reps * s.weight), 0);
      days[day] = (days[day] || 0) + vol;
    }
  });

  return Object.entries(days).map(([name, volume]) => ({ name, volume }));
}
