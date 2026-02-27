# Tasks: Fitness Ledger PWA

**Input**: Design documents from `/specs/001-fitness-ledger-pwa/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests are included for core logic (Gemini parsing, metric calculations) to ensure technical integrity.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 [P] Initialize Vite project with TypeScript and React
- [ ] T003 [P] Install dependencies: `dexie`, `dexie-react-hooks`, `@google/generative-ai`, `recharts`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`
- [ ] T004 [P] Configure TailwindCSS and basic styling in `src/index.css`
- [ ] T005 [P] Configure `vite-plugin-pwa` and manifest in `vite.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Setup Dexie database schema in `src/lib/db.ts` (WorkoutEntry, UserPreferences)
- [ ] T007 [P] Create shared TypeScript interfaces in `src/types/index.ts` (WorkoutEntry, WorkoutSet, UserPreferences)
- [ ] T008 [P] Implement base Layout component with navigation in `src/components/Layout.tsx`
- [ ] T009 [P] Setup React Router and basic routes in `src/App.tsx`
- [ ] T010 [P] Implement `useWorkouts` hook for basic CRUD operations in `src/hooks/useWorkouts.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 4 - Gemini API Configuration (Priority: P2)

**Goal**: Allow users to securely input and store their Gemini API Key.

**Independent Test**: Navigate to Settings, enter an API key, save it, and verify it persists after a page refresh.

### Implementation for User Story 4

- [ ] T011 [P] [US4] Create Settings feature directory and `SettingsPage.tsx` in `src/features/settings/SettingsPage.tsx`
- [ ] T012 [US4] Implement settings management hook `useSettings.ts` in `src/features/settings/useSettings.ts`
- [ ] T013 [US4] Create API key input form with masked field and save button in `src/features/settings/SettingsPage.tsx`
- [ ] T014 [US4] Add validation logic for the API key format in `src/features/settings/validation.ts`

**Checkpoint**: US4 complete - API Key infrastructure ready for Voice Logging.

---

## Phase 4: User Story 1 - Voice-Powered Workout Logging (Priority: P1) 🎯 MVP

**Goal**: Record workouts using voice input processed by Gemini API.

**Independent Test**: Record a workout sentence, confirm the parsed structured data, and verify the entry appears in the database.

### Tests for User Story 1

- [ ] T015 [P] [US1] Unit test for Gemini parsing logic in `src/api/__tests__/gemini.test.ts`
- [ ] T016 [P] [US1] Unit test for voice recording state machine in `src/hooks/__tests__/useVoiceRecorder.test.ts`

### Implementation for User Story 1

- [ ] T017 [P] [US1] Create Gemini integration service in `src/api/gemini.ts` using `@google/generative-ai`
- [ ] T018 [US1] Implement voice recording logic with Web Audio API in `src/hooks/useVoiceRecorder.ts`
- [ ] T019 [P] [US1] Create Voice Logging UI component in `src/features/logging/VoiceLogger.tsx`
- [ ] T020 [US1] Implement parsing workflow (Audio -> Text -> Gemini JSON) in `src/features/logging/useVoiceLogging.ts`
- [ ] T021 [US1] Create `WorkoutReview` component for editing/confirming parsed data in `src/features/logging/WorkoutReview.tsx`
- [ ] T022 [US1] Implement PR (Personal Record) detection logic in `src/utils/workoutUtils.ts`
- [ ] T023 [US1] Integrate review confirmation with `useWorkouts` to persist data in `src/features/logging/VoiceLogger.tsx`

**Checkpoint**: MVP Complete - Voice logging is fully functional.

---

## Phase 5: User Story 2 - Fitness Asset Visualization Dashboard (Priority: P1)

**Goal**: Visualize fitness progress and "assets" (Cumulative Volume, 1RM trends).

**Independent Test**: Navigate to Dashboard and verify that charts correctly display data from existing workout entries.

### Tests for User Story 2

- [ ] T024 [P] [US2] Unit tests for Asset and 1RM calculation formulas in `src/utils/__tests__/metrics.test.ts`

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create Dashboard feature directory and `DashboardPage.tsx` in `src/features/dashboard/DashboardPage.tsx`
- [ ] T026 [US2] Implement metric calculation utilities (Asset Volume, Brzycki 1RM) in `src/utils/metrics.ts`
- [ ] T027 [US2] Implement dashboard data aggregation hook in `src/features/dashboard/useDashboardData.ts`
- [ ] T028 [P] [US2] Create `AssetTrendChart` using Recharts in `src/features/dashboard/AssetTrendChart.tsx`
- [ ] T029 [P] [US2] Create `StrengthFocusChart` using Recharts in `src/features/dashboard/StrengthFocusChart.tsx`
- [ ] T030 [US2] Assemble charts and metric summaries in `src/features/dashboard/DashboardPage.tsx`

**Checkpoint**: US2 complete - Users can now visualize their progress.

---

## Phase 6: User Story 3 - Manual Entry and Editing (Priority: P2)

**Goal**: Provide manual fallback for logging and ability to edit/delete history.

**Independent Test**: Manually add a workout, then find it in the history list, edit it, and verify the changes.

### Implementation for User Story 3

- [ ] T031 [P] [US3] Create `ManualEntryForm` component in `src/features/logging/ManualEntryForm.tsx`
- [ ] T032 [US3] Implement manual entry logic in `src/features/logging/useManualLogging.ts`
- [ ] T033 [P] [US3] Create Workout History feature directory and `HistoryPage.tsx` in `src/features/workout-history/HistoryPage.tsx`
- [ ] T034 [US3] Implement scrollable list of historical workouts in `src/features/workout-history/WorkoutList.tsx`
- [ ] T035 [US3] Add Edit and Delete functionality to history items in `src/features/workout-history/WorkoutItem.tsx`
- [ ] T036 [US3] Integrate `ManualEntryForm` as an "Edit Mode" for existing entries

**Checkpoint**: US3 complete - Full data management (CRUD) is available.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and PWA optimizations.

- [ ] T037 [P] Add high-resolution PWA icons and theme colors to `public/` and `index.html`
- [ ] T038 [P] Implement "Offline" status indicator in the Layout
- [ ] T039 [P] Add empty state illustrations for Dashboard and History
- [ ] T040 Perform final build and Lighthouse PWA audit verification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001-T005).
- **User Story 4 (Phase 3)**: Depends on Foundational (T006-T010).
- **User Story 1 (Phase 4)**: Depends on US4 (T011-T014) for API key.
- **User Story 2 & 3 (Phases 5 & 6)**: Depend on Foundational (Phase 2). Can be done in parallel with US1.
- **Polish (Phase 7)**: Depends on core features being functional.

### Parallel Opportunities

- Phase 1 tasks T002-T005 can run in parallel.
- Phase 2 tasks T007-T010 can run in parallel.
- Phase 5 and Phase 6 can be developed simultaneously after Phase 2 is done.
- UI Components (marked [P]) within any story can be built in parallel with their respective service logic.

---

## Parallel Example: User Story 2

```bash
# Developer A: Implement calculations and data fetching
Task: "Implement metric calculation utilities in src/utils/metrics.ts"
Task: "Implement dashboard data aggregation hook in src/features/dashboard/useDashboardData.ts"

# Developer B: Create visualization components
Task: "Create AssetTrendChart using Recharts in src/features/dashboard/AssetTrendChart.tsx"
Task: "Create StrengthFocusChart using Recharts in src/features/dashboard/StrengthFocusChart.tsx"
```

---

## Implementation Strategy

### MVP First (Voice Logging + Settings)

1. Complete Setup & Foundational.
2. Complete US4 (Settings) to enable API key storage.
3. Complete US1 (Voice Logging).
4. **VALIDATE**: Speak a workout, confirm it saves. This is the core MVP.

### Incremental Delivery

1. Add Dashboard (US2) to provide value from the saved data.
2. Add Manual Entry/History (US3) for data correction and full control.
3. Apply Polish (Phase 7).

---

## Notes

- [P] tasks = different files, no dependencies.
- [US?] labels map to stories in `spec.md`.
- Ensure Dexie database is initialized before any feature tries to access it.
- Gemini API calls MUST handle network errors and missing API keys gracefully.
