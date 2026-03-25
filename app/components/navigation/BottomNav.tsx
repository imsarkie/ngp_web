"use client";

import { useEffect, useMemo, useState } from "react";
import { useSlidingSelector } from "./useSlidingSelector";

const NAV_ITEMS = [
  { label: "Overview", icon: "◉", hash: "#overview" },
  { label: "Features", icon: "✦", hash: "#features" },
  { label: "Proof", icon: "✓", hash: "#proof" },
  { label: "FAQ", icon: "?", hash: "#faq" },
] as const;

const EASE_OUT_CUBIC = "cubic-bezier(0.215, 0.61, 0.355, 1)";

function indexFromHash(hash: string) {
  const index = NAV_ITEMS.findIndex((item) => item.hash === hash);
  return index >= 0 ? index : 0;
}

export function BottomNav() {
  const [activeHash, setActiveHash] = useState<string>("#overview");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const {
    railRef,
    activeIndex,
    previewIndex,
    isDragging,
    selectorState,
    startDrag,
    moveDrag,
    endDrag,
    syncActiveIndex,
    setActiveIndex,
  } = useSlidingSelector({
    itemCount: NAV_ITEMS.length,
    initialIndex: indexFromHash(activeHash),
    dragIntentThreshold: 10,
    flingVelocityThreshold: 760,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyHash = () => {
      const hash = window.location.hash || "#overview";
      setActiveHash(hash);
      syncActiveIndex(indexFromHash(hash));
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [syncActiveIndex]);

  const goToIndex = (index: number) => {
    const item = NAV_ITEMS[index];
    if (!item) return;

    const target = document.querySelector(item.hash);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }

    if (window.location.hash !== item.hash) {
      window.history.replaceState(null, "", item.hash);
    }

    setActiveHash(item.hash);
    syncActiveIndex(index);
  };

  return (
    <nav className="bottom-nav-wrap" aria-label="Primary bottom navigation">
      <div
        ref={railRef}
        className="bottom-nav-rail"
        role="tablist"
        aria-orientation="horizontal"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={(event) => endDrag(event, (index) => goToIndex(index))}
        onPointerCancel={(event) => endDrag(event, (index) => goToIndex(index))}
      >
        <div
          className={`bottom-selector ${isDragging ? "dragging" : "idle"}`}
          aria-hidden
          style={{
            left: `${selectorState.left}px`,
            width: `${selectorState.width}px`,
            transition:
              isDragging || prefersReducedMotion
                ? "none"
                : `left 220ms ${EASE_OUT_CUBIC}, width 220ms ${EASE_OUT_CUBIC}`,
          }}
        />

        {NAV_ITEMS.map((item, index) => {
          const isActive = (isDragging ? previewIndex : activeIndex) === index;

          return (
            <button
              key={item.hash}
              type="button"
              className={`bottom-tab ${isActive ? "active" : ""}`}
              role="tab"
              aria-selected={activeHash === item.hash}
              aria-label={item.label}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => {
                setActiveIndex(index);
                goToIndex(index);
              }}
              onKeyDown={(event) => {
                let target = index;

                if (event.key === "ArrowRight") {
                  target = Math.min(index + 1, NAV_ITEMS.length - 1);
                } else if (event.key === "ArrowLeft") {
                  target = Math.max(index - 1, 0);
                } else if (event.key === "Home") {
                  target = 0;
                } else if (event.key === "End") {
                  target = NAV_ITEMS.length - 1;
                } else if (event.key === "Enter" || event.key === " ") {
                  target = index;
                } else {
                  return;
                }

                event.preventDefault();
                setActiveIndex(target);
                goToIndex(target);
              }}
            >
              <span className="tab-icon" aria-hidden>
                {item.icon}
              </span>
              <span className="tab-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
