import { createContext, useContext } from 'react';

type WatchlistContextValue = {
  watchlistIds: string[];
  isInWatchlist: (id: string) => boolean;
  toggleWatchlist: (id: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  // TODO(Dhruv, Sprint 2): replace these stubs with real state + AsyncStorage
  const value: WatchlistContextValue = {
    watchlistIds: [],
    isInWatchlist: () => false,
    toggleWatchlist: () => {},
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error('useWatchlist must be used inside WatchlistProvider');
  }
  return ctx;
}
