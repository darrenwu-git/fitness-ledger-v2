'use client';

import { useWorkouts } from '@/hooks/useWorkouts';
import { calculateAssetNetWorth, getVolumeByDay, calculateTotalVolume, calculateCardioDuration } from '@/utils/metrics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, Weight, Clock, Info } from 'lucide-react';

export default function DashboardPage() {
  const { workouts, isLoading } = useWorkouts();

  if (isLoading) return <div className="p-8 text-center text-gray-500">Calculating your fitness assets...</div>;

  const totalVolume = workouts ? calculateTotalVolume(workouts) : 0;
  const totalCardio = workouts ? calculateCardioDuration(workouts) : 0;
  const netWorth = workouts ? calculateAssetNetWorth(workouts) : 0;
  const chartData = workouts ? getVolumeByDay(workouts).slice(-7) : []; // Last 7 days

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Progress Asset Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Visualizing your fitness gains.</p>
      </header>

      {/* Asset Summary Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-lg shadow-blue-100 dark:shadow-none relative overflow-hidden">
          <Activity className="absolute -right-4 -top-4 w-24 h-24 opacity-10" />
          <div className="relative z-10">
            <div className="text-xs uppercase font-bold opacity-80 mb-1">Fitness Net Worth</div>
            <div className="text-3xl font-bold">{netWorth.toLocaleString()}</div>
            <div className="text-[10px] mt-1 opacity-70 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Volume + Cardio Duration × 10
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-xs uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
             <TrendingUp className="w-3 h-3 text-green-500" />
             Strength Volume
          </div>
          <div className="text-2xl font-bold">{totalVolume.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-1">Total weight lifted (kg)</div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-xs uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
             <Clock className="w-3 h-3 text-purple-500" />
             Cardio Duration
          </div>
          <div className="text-2xl font-bold">{totalCardio.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-1">Total minutes</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-xs uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
             <Weight className="w-3 h-3 text-blue-500" />
             Total Entries
          </div>
          <div className="text-2xl font-bold">{workouts?.length || 0}</div>
          <div className="text-[10px] text-gray-400 mt-1">Recorded sessions</div>
        </div>
      </div>

      {/* Progress Chart */}
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Volume Progression (Last 7 Sessions)
        </h3>
        
        <div className="h-64 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
               No enough data for charts. Start logging!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
