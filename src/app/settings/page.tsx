'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/features/settings/useSettings';
import { Save, Shield, ShieldCheck, Moon, Sun, Monitor } from 'lucide-react';
import type { ThemePreference, WeightUnit } from '@/types';

export default function SettingsPage() {
  const { preferences, saveSettings, isLoading } = useSettings();
  const [apiKey, setApiKey] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (preferences) {
      setApiKey(preferences.geminiApiKey || '');
      setUnit(preferences.preferredUnit || 'kg');
      setTheme(preferences.theme || 'system');
    }
  }, [preferences]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    await saveSettings({
      geminiApiKey: apiKey,
      preferredUnit: unit,
      theme: theme,
    });
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  if (isLoading) return <div className="p-4 text-center">Loading settings...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Configure your application preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <h2>API Configuration</h2>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium">
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500">
              Your API key is stored locally in your browser's IndexedDB and is never sent to our servers.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Monitor className="w-5 h-5 text-purple-500" />
            <h2>Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Weight Unit</label>
              <div className="flex gap-4">
                {(['kg', 'lbs'] as WeightUnit[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      unit === u
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {u.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex gap-2">
                {[
                  { id: 'light', icon: Sun, label: 'Light' },
                  { id: 'dark', icon: Moon, label: 'Dark' },
                  { id: 'system', icon: Monitor, label: 'System' },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTheme(id as ThemePreference)}
                    className={`flex-1 flex flex-col items-center py-3 px-2 rounded-lg border transition-colors ${
                      theme === id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={saveStatus === 'saving'}
          className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
            saveStatus === 'saved'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saveStatus === 'saved' ? (
            <>
              <ShieldCheck className="w-5 h-5" />
              Settings Saved
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
