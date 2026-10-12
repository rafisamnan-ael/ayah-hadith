"use client";

import { useEffect, useState } from "react";

/**
 * Guards against SSR/client hydration mismatches for state that is rehydrated
 * from localStorage (favorites, recents, language).
 */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
