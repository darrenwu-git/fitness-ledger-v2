# Quickstart: Fitness Ledger PWA

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn
- A Gemini API Key (from Google AI Studio)

### Steps
1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd fitness-ledger-v2
   npm install
   ```
2. **Setup Environment**:
   - Create a `.env.local` file.
   - Add `VITE_GEMINI_API_KEY=your_key_here` (for development only).
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
4. **Access App**:
   - Open `http://localhost:5173`.
   - Go to **Settings** and ensure your API Key is correctly configured if not using the `.env.local` file.

## Developer Workflow

- **Logging**: Use the microphone icon on the **Log** page to record your workout. Speak clearly like: "I did 3 sets of 10 bench presses at 60kg".
- **Dashboard**: Check the **Dashboard** to see your "Fitness Assets" (Cumulative Volume) and strength trends.
- **Database**: The app uses IndexedDB. You can inspect it in DevTools under the **Application** tab -> **IndexedDB** -> `FitnessLedgerDB`.

## Testing
- **Unit Tests**: `npm run test`
- **E2E Tests**: `npm run test:e2e` (requires Playwright)
