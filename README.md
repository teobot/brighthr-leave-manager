# BrightHR Absence Manager

A single-page application (SPA) built with Next.js and TypeScript for managing and viewing employee absences, as part of the BrightHR technical assessment.

## Features

- **Absence Table:** Displays start date, end date, employee name, approval status, and absence type for each absence.
- **Sorting:** Sort absences by name, type, start date, end date, days, and approval status.
- **Conflict Indication:** Visual indicator for absences with conflicts, using the provided API endpoint.
- **Employee Filter:** Click an employee’s name to filter and view all their absences.
- **Search:** Filter absences by employee name.
- **Accessible UI:** Uses semantic HTML and accessible components.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) for testing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API requests

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

To run all tests:

```bash
npm test
```

or

```bash
npm run test
```

## Project Structure

- `src/app/` – Main app entry and layout
- `src/components/` – UI components (atoms, molecules, organisms)
- `src/common/` – Shared helpers, API logic, and types
- `__tests__/` – Unit and integration tests

## API Endpoints Used

- `GET https://front-end-kata.brighthr.workers.dev/api/absences` – Fetch all absences
- `GET https://front-end-kata.brighthr.workers.dev/api/conflict/{id}` – Check for conflicts for a given absence

## Approach & Decisions

- **TDD:** Helper functions and atomic components are covered by tests. (Next step: add more tests for main table components.)
- **Type Safety:** All data and props are strongly typed with TypeScript.
- **Accessibility:** Interactive elements use semantic HTML. (Next step: make employee name a button for improved accessibility.)
- **Separation of Concerns:** API logic, helpers, and UI components are organized for clarity and maintainability.

## Improvements & Next Steps

- Add more tests for main table and row components to improve coverage.
- Increase search and sortably
- pagination
- Using branches with pull requests
  - I didn't for this project since its a solo developer with zero code review or deployment requirement
- Debounce the user search
