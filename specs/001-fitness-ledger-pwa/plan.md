# Implementation Plan: Fitness Ledger PWA

**Branch**: `001-fitness-ledger-pwa` | **Date**: 2026-02-27 | **Spec**: `/specs/001-fitness-ledger-pwa/spec.md`
**Input**: Feature specification from `/specs/001-fitness-ledger-pwa/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

A Progressive Web App (PWA) designed for seamless fitness tracking. Key features include voice-powered workout logging using the Gemini API, manual data entry, and a visualization dashboard. The app calculates "Fitness Assets" based on Cumulative Volume (total weight + cardio duration) and prioritizes strength metrics (weight, sets, reps). It emphasizes offline capability and local data storage.

## Technical Context

**Language/Version**: TypeScript, React (Vite)
**Primary Dependencies**: @google/generative-ai, Dexie.js (IndexedDB wrapper), Recharts, TailwindCSS, Lucide React
**Storage**: IndexedDB (Local)
**Testing**: Vitest, Playwright
**Target Platform**: Web (PWA), Mobile-friendly
**Project Type**: Progressive Web Application
**Performance Goals**: Dashboard render < 2s, Voice log parse < 5s
**Constraints**: Offline-first, Gemini API requires internet (fallback to manual), Local API Key storage
**Scale/Scope**: Personal fitness tracker, ~5 views

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Simple & Focused**: Single-purpose PWA for fitness tracking.
- [x] **Offline-First**: Uses IndexedDB for data persistence.
- [x] **Testable**: Structured for unit and E2E testing.
- [x] **Secure**: API Key handled via user settings, not hardcoded.

## Project Structure

### Documentation (this feature)

```text
specs/001-fitness-ledger-pwa/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (Gemini API prompt contract)
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code (repository root)

```text
src/
├── api/                 # Gemini API integration service
├── components/          # Reusable UI components (Layout, UI primitives)
├── features/            # Core feature modules
│   ├── dashboard/       # Asset visualization and charts
│   ├── logging/         # Voice and manual entry logic
│   ├── workout-history/ # List and edit historical logs
│   └── settings/        # API key and user preferences
├── hooks/               # useWorkouts, useGemini, etc.
├── lib/                 # Database initialization (Dexie)
├── types/               # Shared TypeScript interfaces
└── utils/               # Formatting and calculations
```

**Structure Decision**: Single React project with feature-based organization to keep domain logic encapsulated.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
