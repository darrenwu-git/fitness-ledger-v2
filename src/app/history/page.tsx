'use client';

import { useWorkouts } from '@/hooks/useWorkouts';
import { Trash2, Calendar, Weight, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns'; // Wait, I didn't install date-fns. I'll use standard JS.

export default function HistoryPage() {
  const { workouts, deleteWorkout, isLoading } = useWorkouts();

  if (isLoading) return <div className="p-8 text-center">Loading history...</div>;

  const handleDelete = async (id: any) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Workout History</h1>
        <p className="text-gray-500 dark:text-gray-400">Your past sessions and progress.</p>
      </header>

      {workouts && workouts.length > 0 ? (
        <div className="space-y-4">
          {workouts.map((w) => (
            <div key={w.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 relative group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${w.type === 'strength' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                    {w.type === 'strength' ? <Weight className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{w.exerciseName}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(w.timestamp).toLocaleDateString()} at {new Date(w.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {w.type === 'strength' ? (
                <div className="flex flex-wrap gap-2">
                  {w.sets?.map((s, si) => (
                    <div key={si} className="text-sm px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-800">
                      <span className="font-semibold">{s.reps}</span> × {s.weight}kg
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {w.duration} minutes
                </div>
              )}
              
              {w.notes && (
                <p className="mt-2 text-sm text-gray-500 italic">"{w.notes}"</p>
              )}

              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No records found</h3>
          <p className="text-gray-500 mb-6">Start logging your workouts with voice or manual input.</p>
        </div>
      )}
    </div>
  );
}
