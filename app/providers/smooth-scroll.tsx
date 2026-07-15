"use client"
import React from "react"
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: !prefersReduced,
        syncTouch: false, // touch devices keep native momentum, don't fight it
      }}
    >
      {children}
    </ReactLenis>
  )
}
