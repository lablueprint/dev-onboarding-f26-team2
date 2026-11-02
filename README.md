# Film Discovery

Onboarding project for Team 2: a React Native (Expo) app for discovering movies.

## Getting started

You'll need Node 22 or newer (`node -v` to check).

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone (same Wi-Fi as your laptop).

Before opening a PR:

```bash
npx expo lint
npx tsc --noEmit
```

## Project structure

```
src/
  app/                  screens (file-based routing with Expo Router)
    (tabs)/index.tsx    Discover feed
    (tabs)/saved.tsx    Watchlist
    movie/[id].tsx      movie detail
    add.tsx             add a movie
    edit/[id].tsx       edit a movie
    api-test.tsx        API test screen
  components/           UI components
  context/              shared state (watchlist, watched)
  data/                 mock data
  hooks/                data hooks
  services/             data layer (mock now, real API later)
  types/                shared TypeScript types
  utils/                helper functions
```

## Workflow

- Branch off `main`: `git checkout -b <firstname>/<feature>`
- Stick to the files listed in your ticket. If you need to change something shared (`src/types`, `src/app/(tabs)/index.tsx`, `package.json`), ask first
- Open a draft PR early and request a review when it's ready
- Start each sprint on a new branch from the latest `main`

## Backend

The API lives in `server/` (added in Sprint 1). See `server/README.md` for how to run it. To point the app at it, create `.env.local`:

```
EXPO_PUBLIC_API_URL=http://<your-laptop-ip>:3000
```

Without that variable, the app uses mock data.
