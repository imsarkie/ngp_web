"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSlidingSelector } from "./useSlidingSelector";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "◉" },
  { href: "/experience", label: "Swipe", icon: "↔" },
  { href: "/features", label: "Features", icon: "✦" },
  { href: "/reader", label: "Reader", icon: "▣" },
  { href: "/rss", label: "RSS", icon: "≈" },
  { href: "/library", label: "Library", icon: "☰" },
  { href: "/settings", label: "Settings", icon: "⚙" },
  { href: "/architecture", label: "Architecture", icon: "⌁" },
] as const;

const SUPPORT_ITEMS = [
  { href: "/contact-us", label: "Contact" },
  { href: "/help", label: "Help" },
  { href: "/privacy-policy", label: "Privacy" },
] as const;

const EASE_OUT_CUBIC = "cubic-bezier(0.215, 0.61, 0.355, 1)";

function indexFromPath(pathname: string) {
  const direct = NAV_ITEMS.findIndex((item) => item.href === pathname);
  if (direct >= 0) return direct;

  const nested = NAV_ITEMS.findIndex((item) => item.href !== "/" && pathname.startsWith(item.href));
  return nested >= 0 ? nested : 0;
}

export function TopShowcaseNav() {
  const pathname = usePathname();
  const router = useRouter();

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
    initialIndex: indexFromPath(pathname),
    dragIntentThreshold: 10,
    flingVelocityThreshold: 760,
  });

  useEffect(() => {
    syncActiveIndex(indexFromPath(pathname));
  }, [pathname, syncActiveIndex]);

  const goToIndex = (index: number) => {
    const item = NAV_ITEMS[index];
    if (!item) return;

    if (item.href !== pathname) {
      router.push(item.href, { scroll: true });
    }

    syncActiveIndex(index);
  };

  return (
    <div className="showcase-top-shell">
      <div className="brand-column">
        <Link href="/" className="brand-lockup" aria-label="ngpocket home">
          <span className="brand-mark" aria-hidden>
            ng
          </span>
          <span className="brand-copy">
            <strong>ngpocket</strong>
            <small>minimal reader showcase</small>
          </span>
        </Link>
      </div>

      <nav className="top-nav-wrap" aria-label="Primary product navigation">
        <div
          ref={railRef}
          className="top-nav-rail"
          role="tablist"
          aria-orientation="horizontal"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={(event) => endDrag(event, (index) => goToIndex(index))}
          onPointerCancel={(event) => endDrag(event, (index) => goToIndex(index))}
        >
          <div
            className={`top-selector ${isDragging ? "dragging" : "idle"}`}
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
            const isPreviewed = (isDragging ? previewIndex : activeIndex) === index;
            const isSelected = indexFromPath(pathname) === index;

            return (
              <button
                key={item.href}
                type="button"
                className={`top-tab ${isPreviewed ? "active" : ""}`}
                role="tab"
                aria-selected={isSelected}
                aria-label={item.label}
                tabIndex={isSelected ? 0 : -1}
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
                <span className="top-tab-icon" aria-hidden>
                  {item.icon}
                </span>
                <span className="top-tab-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav className="support-nav" aria-label="Support navigation">
        {SUPPORT_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className={`support-link ${isActive ? "is-active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
