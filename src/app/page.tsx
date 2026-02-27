'use client';

import VoiceLogger from '@/features/logging/VoiceLogger';
import { useWorkouts } from '@/hooks/useWorkouts';
import { Activity, TrendingUp, History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { workouts } = useWorkouts();
  
  const recentWorkouts = workouts?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Fitness Ledger</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your gains with voice.</p>
      </header>

      <VoiceLogger />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-purple-500" />
            Recent Activity
          </h2>
          <Link href="/history" className="text-blue-600 text-sm font-medium">View All</Link>
        </div>

        {recentWorkouts.length > 0 ? (
          <div className="space-y-3">
            {recentWorkouts.map((w, i) => (
              <div key={w.id || i} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{w.exerciseName}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(w.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {w.type === 'strength' ? (
                      <span className="text-sm font-medium text-blue-600">
                        {w.sets?.length} sets
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-green-600">
                        {w.duration} min
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No workouts recorded yet.</p>
          </div>
        )}
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Link href="/dashboard" className="p-4 bg-blue-600 text-white rounded-2xl flex flex-col justify-between h-32 shadow-lg shadow-blue-200 dark:shadow-none">
          <TrendingUp className="w-8 h-8 opacity-50" />
          <div>
            <div className="text-2xl font-bold">Progress</div>
            <div className="text-xs opacity-80">See your gains</div>
          </div>
        </Link>
        <Link href="/settings" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col justify-between h-32">
          <Activity className="w-8 h-8 text-gray-400" />
          <div>
            <div className="text-2xl font-bold">Stats</div>
            <div className="text-xs text-gray-500">View metrics</div>
          </div>
        </Link>
      </section>
    </div>
  );
}
