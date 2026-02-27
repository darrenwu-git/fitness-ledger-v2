import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { UserPreferences } from '@/types';

const SETTINGS_ID = 1;

export function useSettings() {
  const preferences = useLiveQuery(
    () => db.userPreferences.get(SETTINGS_ID)
  );

  const saveSettings = async (settings: Partial<UserPreferences>) => {
    const current = await db.userPreferences.get(SETTINGS_ID);
    if (current) {
      return await db.userPreferences.update(SETTINGS_ID, settings);
    } else {
      return await db.userPreferences.add({
        id: SETTINGS_ID,
        geminiApiKey: '',
        preferredUnit: 'kg',
        theme: 'system',
        ...settings
      } as UserPreferences);
    }
  };

  return {
    preferences,
    saveSettings,
    isLoading: preferences === undefined
  };
}
