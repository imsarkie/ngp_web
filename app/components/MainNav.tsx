"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/features", label: "Features" },
  { href: "/reader", label: "Reader" },
  { href: "/rss", label: "RSS" },
  { href: "/library", label: "Library" },
  { href: "/settings", label: "Settings" },
  { href: "/architecture", label: "Architecture" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-lockup" aria-label="ngpocket home">
          <span className="brand-mark" aria-hidden>
            ng
          </span>
          <span className="brand-copy">
            <strong>ngpocket</strong>
            <small>swipe-first read-later + RSS</small>
          </span>
        </Link>

        <nav className="nav-strip" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
                {item.label === "Library" ? (
                  <span className="unread-pill" aria-label="Unread count">
                    17
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
