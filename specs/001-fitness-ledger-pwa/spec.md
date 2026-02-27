# Feature Specification: Fitness Ledger PWA

**Feature Branch**: `001-fitness-ledger-pwa`  
**Created**: 2026-02-27  
**Status**: Draft  
**Input**: User description: "健身帳本 (Fitness Ledger) PWA - 語音/手動記錄運動、資產視覺化儀表板、使用 Gemini API 語音輸入、需要設定頁面輸入 API Key"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Voice-Powered Workout Logging (Priority: P1)

As a fitness enthusiast who is busy or currently exercising, I want to record my workout details using my voice so that I don't have to stop my flow to type on a screen.

**Why this priority**: This is a core differentiator of the application, utilizing Gemini API to simplify data entry during active sessions.

**Independent Test**: Can be tested by initiating a voice recording, speaking a workout description (e.g., "I did 3 sets of 10 bench presses at 60kg"), and verifying that the system correctly parses and saves the workout details.

**Acceptance Scenarios**:

1. **Given** the user has a valid Gemini API Key configured, **When** they speak a workout sentence into the app, **Then** the app uses Gemini to extract structured data (exercise, sets, reps, weight) and displays a confirmation.
2. **Given** a voice input is processed, **When** the extracted data is confirmed by the user, **Then** it is saved to the local ledger/database.
3. **Given** the voice input is ambiguous or low quality, **When** Gemini cannot parse it, **Then** the app prompts the user to clarify or edit the entry manually.

---

### User Story 2 - Fitness Asset Visualization Dashboard (Priority: P1)

As a user tracking my progress, I want to see a visual representation of my fitness "assets" (stats and progress) so that I can stay motivated and understand my trends over time.

**Why this priority**: Data visualization is essential for a "ledger" style application to provide value from the collected data.

**Independent Test**: Can be tested by navigating to the dashboard after entering several days of workout data and verifying that charts/graphs correctly reflect the recorded "assets".

**Acceptance Scenarios**:

1. **Given** the user has recorded multiple workouts, **When** they open the dashboard, **Then** they see charts showing trends for key metrics (e.g., total volume, frequency, or specific lift progress).
2. **Given** the "Asset" metaphor, **When** the user views the dashboard, **Then** they see a summary of their "Fitness Net Worth" calculated as Cumulative Volume (total weight lifted + cardio duration).

---

### User Story 3 - Manual Entry and Editing (Priority: P2)

As a user, I want to manually enter or edit workout logs when I'm in a quiet environment or when I need to correct a mistake in a voice entry.

**Why this priority**: Essential for data accuracy and as a fallback for voice input.

**Independent Test**: Can be tested by filling out a manual form with workout details and saving it.

**Acceptance Scenarios**:

1. **Given** the user is on the logging screen, **When** they choose manual entry, **Then** they are presented with a form to input exercise name, sets, reps, and weight.
2. **Given** an existing entry, **When** the user selects "Edit", **Then** they can modify any field and save the changes.

---

### User Story 4 - Gemini API Configuration (Priority: P2)

As a user, I want to securely input and store my Gemini API key so that I can use the voice logging features.

**Why this priority**: Prerequisite for the core voice-logging functionality.

**Independent Test**: Can be tested by entering a key in the settings page and verifying that subsequent voice requests are successful.

**Acceptance Scenarios**:

1. **Given** a new user, **When** they navigate to the Settings page, **Then** they see an input field for the Gemini API Key.
2. **Given** an API Key is entered, **When** it is saved, **Then** it is persisted locally and used for all Gemini-related features.

### Edge Cases

- **Offline Mode**: Since it's a PWA, what happens when the user tries to use voice logging without an internet connection? (Assumption: App should notify that Gemini requires connection, but allow manual logging or "queue" the voice for later).
- **Invalid API Key**: How does the system handle an expired or incorrect Gemini API Key? (Requirement: Show clear error message and direct user to settings).
- **Multiple Exercises in One Voice Clip**: Can the system handle "I did squats and then some lunges" in one go? (Assumption: Gemini should handle multiple extraction, but UI must support reviewing them).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST be a Progressive Web App (PWA) that is installable on mobile and desktop.
- **FR-002**: System MUST allow users to record audio clips for workout logging.
- **FR-003**: System MUST integrate with the Gemini API to convert voice/text descriptions into structured workout data.
- **FR-004**: System MUST provide a manual data entry form for workouts.
- **FR-005**: System MUST include a dashboard with at least two types of visualizations (e.g., progress charts, frequency heatmaps).
- **FR-006**: System MUST provide a Settings page for managing the Gemini API Key.
- **FR-007**: System MUST store workout data locally (e.g., IndexedDB) to ensure responsiveness and basic offline viewing.
- **FR-008**: System MUST prioritize Strength Focus (weight, sets, reps trends) for "Asset Visualization".
- **FR-009**: System MUST allow users to delete or modify historical workout entries.

### Key Entities *(include if feature involves data)*

- **Workout Entry**: Represents a single exercise session. Attributes include Exercise Name, Sets, Reps, Weight/Intensity, Timestamp, and Notes.
- **Fitness Asset**: A derived metric or aggregate representing user progress (e.g., "Total Volume" or "Estimated 1RM").
- **User Configuration**: Stores local settings, including the Gemini API Key and UI preferences.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a workout log via voice in under 15 seconds (from starting recording to confirmation).
- **SC-002**: The system successfully parses and structures at least 90% of clear voice descriptions of standard exercises.
- **SC-003**: The PWA passes the standard Lighthouse audit for "PWA" status (installable, serves over HTTPS, etc.).
- **SC-004**: The dashboard loads and renders visualizations in under 2 seconds for a user with 100+ entries.
