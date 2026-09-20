# 🇩🇪 DeutschBuddy — Frontend Application

This directory contains the client-side and SSR source code for **DeutschBuddy (GermanBuddy)**, built with **Angular 21**, **Tailwind CSS v4**, and **Vitest**.

For complete project documentation, overview, and roadmap, please see the root [README.md](../README.md).

---

## 🛠 Tech Stack

- **Framework**: Angular 21 (Signals, standalone components, control flow)
- **Styling**: Tailwind CSS v4 with PostCSS & custom glassmorphism
- **UI/UX**: 3D spatial tilt & flip cards, ambient glowing orbs, dark mode
- **SSR**: `@angular/ssr` + Express 5
- **Unit Testing**: Vitest 4 with jsdom
- **Typography**: Hind Siliguri & Plus Jakarta Sans

---

## 🚀 Quick Development Commands

### Development Server
Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
npm start
```

### Production Build
Run `npm run build` or `npx ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
npm run build
```

### Unit Tests
Run `npm test` or `ng test` to execute unit tests via [Vitest](https://vitest.dev/).

```bash
npm test
```

### SSR Server
To run the server-side rendered build locally:

```bash
npm run serve:ssr:frontend
```

---

## 📁 Key Directories

- `src/app/component/dashboard/`: Main homepage with 3D flashcard showcase and learning modules.
- `src/app/component/language/`: Modules for German Alphabet, Numbers, Vocabulary, Conversation, and Grammar.
- `src/app/component/game/`: Interactive Word Game (Speed Quiz & Card Matching).
- `src/app/data/`: Static vocabulary and dialogue datasets.
