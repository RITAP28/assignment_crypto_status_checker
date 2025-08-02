// context/WatchlistContext.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext<{
  watchlist: string[];
  toggleCoin: (id: string) => void;
} | null>(null);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleCoin = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((coin) => coin !== id) : [...prev, id]
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleCoin }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
};
