# Doodle Chat Challenge 💬

A responsive, high-performance web-based chat application built with **React** and **TypeScript**. This project was developed as part of the Doodle frontend challenge, focusing on clean architecture, accessibility, and smooth user experience.

## 🚀 Quick Start (How to run locally)

Follow these steps to run the application on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dmitrii1600/code-challenge-doodle.git
   cd code-challenge-doodle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory based on the provided example:
   ```bash
   cp .env.example .env
   ```
   *Open the `.env` file and insert the provided API token:*
   `VITE_API_TOKEN=your_super_secret_token_here`

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:5173/`.*

---

## ✨ Key Functionality Demonstrated

The core messaging features work as intended and are highly optimized:
* **Real-time Messaging:** Users can send messages smoothly. The UI instantly responds, and the input field automatically regains focus for continuous typing.
* **Infinite Scroll (Cursor-based):** Chat history is fetched efficiently in chunks. Scrolling up automatically loads older messages without disrupting the user's current scroll position (no visual jumping).
* **Safe Text Rendering:** Incoming messages from the backend are safely decoded using the native `DOMParser` to prevent XSS attacks while correctly displaying HTML entities (e.g., `&#39;`).

---

## 🎯 Fulfilling the Challenge Requirements

### 1. Code Readability and Clean Architecture
* **Custom Hooks:** API logic and state management are isolated inside `useMessages.ts`, keeping the UI components clean and focused purely on rendering.
* **TypeScript:** Strict typing (interfaces for `Message`, `SendMessagePayload`) is used across the app to ensure predictability and prevent runtime errors.

### 2. Performance & Efficient Rendering
* **React Query (`@tanstack/react-query`):** Used for advanced state management, caching, and handling the cursor-based pagination.
* **Preventing Re-renders:** Applied `React.memo` for message items and `useCallback` for event handlers to ensure the app runs at a smooth 60fps, even with a large DOM tree.
* **Scroll Manipulation:** Used `useLayoutEffect` to calculate scroll heights synchronously before the browser paints, guaranteeing zero visual flickering during history fetching.

### 3. Accessibility (a11y)
* **Keyboard Navigation:** The input and submit button are wrapped in a `<form>`, allowing users to send messages natively via the `Enter` key.
* **Focus Management:** Focus is automatically returned to the input field after a message is sent.
* **Semantic HTML:** Utilized the `<time dateTime="...">` tag for machine-readable timestamps and `aria-labels` for screen reader support.

### 4. Design Attention & Responsiveness
* The UI is fully responsive (mobile-first approach) and scales gracefully down to 320px screens using modern CSS (Flexbox, CSS Nesting).
* Carefully implemented designer hints (e.g., percentage-based max-widths for message bubbles) and native `Intl.DateTimeFormat` for lightweight, pixel-perfect date formatting (`en-GB` without commas).

---

## 🔌 Clarifying Backend Decisions & Scope

* **Backend:** As per the challenge instructions and time constraints (4-6 hours), no custom backend was built. The application relies entirely on the provided Doodle REST API (`/messages`).
* **State Synchronization:** Instead of manual Optimistic Updates (which can be error-prone and complex to rollback in a 4-6 hour scope), I utilized React Query's cache invalidation (`queryClient.invalidateQueries`). This ensures 100% data consistency with the server while keeping the codebase clean.

## 🧪 Testing Constraints

Due to the strict 4-6 hour time commitment, I prioritized core architecture, UX/UI, and accessibility over writing comprehensive unit/E2E test suites (like Jest or Cypress).
All modern APIs (React 18, React Query v5) are up-to-date. The code is structured in a highly modular way, making it extremely easy to cover with tests in a real-world scenario.