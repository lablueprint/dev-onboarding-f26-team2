import { createContext, useContext } from 'react';

type WatchedContextValue = {
  watchedIds: string[];
  isWatched: (id: string) => boolean;
  toggleWatched: (id: string) => void;
};

const WatchedContext = createContext<WatchedContextValue | null>(null);

export function WatchedProvider({ children }: { children: React.ReactNode }) {
  // TODO(Eda, Sprint 2): replace these stubs with real state + AsyncStorage
  const value: WatchedContextValue = {
    watchedIds: [],
    isWatched: () => false,
    toggleWatched: () => {},
  };

  return <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>;
}

export function useWatched() {
  const ctx = useContext(WatchedContext);
  if (!ctx) {
    throw new Error('useWatched must be used inside WatchedProvider');
  }
  return ctx;
}
