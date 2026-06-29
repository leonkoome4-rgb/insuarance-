"use client";

import { useMediaQuery } from "./use-media-query";

export function useIsReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
