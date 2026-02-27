# Research: Fitness Ledger PWA Implementation

## Decisions & Findings

### Decision: Gemini API Prompt Strategy
- **Choice**: Few-shot prompting with structured JSON output schema.
- **Rationale**: Ensures the API returns consistent, machine-readable workout data.
- **Alternatives considered**: Zero-shot (higher risk of inconsistent output format).
- **Integration Pattern**: Use `@google/generative-ai` SDK and provide a system prompt that defines the schema.

### Decision: Local Data Persistence (IndexedDB)
- **Choice**: Dexie.js (IndexedDB wrapper).
- **Rationale**: Simplified syntax for complex queries and schema versioning.
- **Alternatives considered**: LocalStorage (too small for historical logs), raw IndexedDB (too complex).
- **Best Practice**: Use an observable pattern (Dexie `useLiveQuery` hook) for reactive UI updates.

### Decision: PWA Configuration (Vite-PWA-Plugin)
- **Choice**: `vite-plugin-pwa` with `generateSW`.
- **Rationale**: Seamless integration with Vite, handles precaching and basic offline routing out-of-the-box.
- **Integration Pattern**: `injectRegister: 'auto'` for zero-config service worker registration.

### Decision: Fitness Asset & Metric Visualizations
- **Choice**: Recharts (LineChart for trends, BarChart for volume).
- **Rationale**: Responsive, React-native, and highly customizable.
- **Metric Calculation**:
  - `Fitness Asset` = Σ (Weight × Sets × Reps) + Σ (Cardio Duration).
  - `Strength Focus` = Tracking Estimated 1RM (Brzycki formula) for key lifts.

## Best Practices Identified

### Progressive Web App (PWA)
- **Service Worker Lifecycle**: Ensure immediate activation of new versions to avoid stale app states.
- **Manifest**: Provide high-resolution icons (192x192, 512x512) and a theme color matching the UI.

### Gemini API Security
- **API Key Handling**: NEVER hardcode or commit keys. Use an environment variable for local dev and provide a user settings UI for the live PWA.

### IndexedDB performance
- **Indexing**: Always index `timestamp` and `exerciseName` for efficient range queries and history filtering.
