"use client";

import { createContext, useContext } from "react";

const ScrollRevealDisabledContext = createContext(false);

export function ScrollRevealProvider({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ScrollRevealDisabledContext.Provider value={!!disabled}>
      {children}
    </ScrollRevealDisabledContext.Provider>
  );
}

export function useScrollRevealDisabled(): boolean {
  return useContext(ScrollRevealDisabledContext);
}
