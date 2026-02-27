# Data Model: Fitness Ledger PWA

## Entities & Relationships

### `WorkoutEntry`
Represents a single recorded exercise or cardio activity.

- `id`: `string` (UUID, Primary Key)
- `exerciseName`: `string` (Index)
- `type`: `string` ('strength' | 'cardio')
- `timestamp`: `number` (Epoch ms, Index)
- `sets`: `WorkoutSet[]` (Required for 'strength')
- `duration`: `number` (Required for 'cardio', minutes)
- `notes`: `string` (Optional)
- `source`: `string` ('voice' | 'manual')

### `WorkoutSet`
Represents a single set within a strength exercise.

- `reps`: `number`
- `weight`: `number` (kg/lbs)
- `isPersonalRecord`: `boolean` (Calculated on save)

### `UserPreferences` (Local Storage / Settings)
Simple configuration object.

- `geminiApiKey`: `string` (Masked/Stored)
- `preferredUnit`: `string` ('kg' | 'lbs')
- `theme`: `string` ('light' | 'dark' | 'system')

## Derived Metrics

### `FitnessAsset` (Calculation)
`Σ (Set Weight × Set Reps) + Σ (Cardio Duration)`

### `Estimated1RM` (Brzycki Formula)
`Weight × (36 / (37 - Reps))` (Used for Strength Focus trends)

## Validation Rules

- `exerciseName`: MUST be at least 2 characters.
- `sets`: MUST have at least 1 set if type is 'strength'.
- `reps/weight`: MUST be positive numbers.
- `timestamp`: MUST NOT be in the future.
- `geminiApiKey`: MUST match valid pattern if provided.

## State Transitions

1. **Pending (Voice Parsing)**: Voice clip recorded, sending to Gemini.
2. **Review (UI)**: Gemini returns structured data, user confirms or edits.
3. **Persisted (IndexedDB)**: User clicks save, data is written to local storage.
4. **Synced (Future)**: (Out of scope for v1, but planned for future sync).
