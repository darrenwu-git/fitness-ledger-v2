'use client';

import { useState } from 'react';
import { Mic, MicOff, Send, Loader2, Save, X, RotateCcw } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { parseWorkoutDescription } from '@/api/gemini';
import { useSettings } from '@/features/settings/useSettings';
import { useWorkouts } from '@/hooks/useWorkouts';
import type { WorkoutEntry, WorkoutSet } from '@/types';

export default function VoiceLogger() {
  const { isRecording, transcript, error, startRecording, stopRecording, setTranscript } = useVoiceRecorder();
  const { preferences } = useSettings();
  const { addWorkout } = useWorkouts();
  
  const [isParsing, setIsParsing] = useState(false);
  const [parsedWorkouts, setParsedWorkouts] = useState<any[] | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleParse = async () => {
    if (!transcript || !preferences?.geminiApiKey) return;
    
    setIsParsing(true);
    try {
      const response = await parseWorkoutDescription(transcript, preferences.geminiApiKey);
      setParsedWorkouts(response.workouts);
    } catch (e) {
      console.error(e);
      alert('Failed to parse workout. Please check your API key or try again.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSave = async () => {
    if (!parsedWorkouts) return;
    
    setSaveStatus('saving');
    try {
      for (const w of parsedWorkouts) {
        const entry: WorkoutEntry = {
          exerciseName: w.exerciseName,
          type: w.type,
          timestamp: Date.now(),
          sets: w.sets,
          duration: w.duration,
          source: 'voice',
          notes: ''
        };
        await addWorkout(entry);
      }
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setParsedWorkouts(null);
        setTranscript('');
      }, 2000);
    } catch (e) {
      console.error(e);
      alert('Failed to save workout.');
      setSaveStatus('idle');
    }
  };

  const handleCancel = () => {
    setParsedWorkouts(null);
    setTranscript('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Mic className="w-5 h-5 text-blue-500" />
          Voice Record
        </h2>

        {!parsedWorkouts ? (
          <div className="space-y-4 text-center">
            <div 
              className={`w-24 h-24 mx-auto flex items-center justify-center rounded-full transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 animate-pulse scale-110 shadow-lg shadow-red-200' 
                  : 'bg-blue-50 text-blue-600'
              }`}
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
            >
              {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </div>
            
            <p className="text-sm font-medium">
              {isRecording ? 'Listening...' : 'Hold to speak'}
            </p>

            <div className="min-h-[60px] p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-600">
              {transcript || (
                <span className="text-gray-400 italic">"I did 3 sets of 10 squats at 80kg"</span>
              )}
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            {transcript && !isRecording && (
              <button
                onClick={handleParse}
                disabled={isParsing || !preferences?.geminiApiKey}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isParsing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Process with Gemini
                  </>
                )}
              </button>
            )}
            
            {!preferences?.geminiApiKey && (
              <p className="text-amber-600 text-xs mt-2">
                ⚠️ Gemini API key missing. Go to Settings.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-semibold text-green-600 flex items-center gap-1">
                Detected Workouts
              </h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {parsedWorkouts.map((w, i) => (
                <div key={i} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="font-semibold text-lg">{w.exerciseName}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {w.type === 'strength' ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {w.sets.map((s: any, si: number) => (
                          <span key={si} className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-700">
                            {s.reps} × {s.weight}{w.unit || 'kg'}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-1">
                        Duration: {w.duration} min
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
              >
                <RotateCcw className="w-5 h-5" />
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex-[2] py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition-all"
              >
                {saveStatus === 'saved' ? (
                  <>Saved!</>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save to Ledger
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
