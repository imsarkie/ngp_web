"use client";

import { useMemo, useState } from "react";

type Item = {
  id: number;
  title: string;
  source: string;
  status: "Unread" | "Read";
};

const items: Item[] = [
  { id: 1, title: "Practical Offline Patterns", source: "Sage Systems", status: "Unread" },
  { id: 2, title: "The Return of RSS", source: "Signal Journal", status: "Read" },
  { id: 3, title: "Making Reader UI Quiet", source: "Designer Notes", status: "Unread" },
];

export function LibraryDemo() {
  const [filter, setFilter] = useState<"All" | "Unread" | "Read">("All");
  const [state, setState] = useState("Saved library ready");

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: Library</h3>
        <p>Saved-only view with filters, open-in-reader behavior, and removal choices that preserve or delete highlights.</p>
      </header>

      <div className="chip-row" role="group" aria-label="Library filters">
        {(["All", "Unread", "Read"] as const).map((option) => (
          <button
            type="button"
            key={option}
            className={`chip ${filter === option ? "active" : "muted"}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="list-panel" aria-label="Saved articles">
        {visible.length === 0 ? (
          <li className="list-empty">No saved stories in this filter. Swipe right in Swipe Reader to save an article.</li>
        ) : (
          visible.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.source}</p>
                <small>Status: {item.status}</small>
              </div>
              <div className="row-actions">
                <button type="button" onClick={() => setState(`Opened \"${item.title}\" in Reader`)}>
                  Open
                </button>
                <button type="button" onClick={() => setState(`Marked \"${item.title}\" unread via swipe action`)}>
                  Mark Unread
                </button>
                <button type="button" onClick={() => setState(`Removed \"${item.title}\" (highlights kept)`)}>
                  Remove Only
                </button>
                <button type="button" onClick={() => setState(`Deleted \"${item.title}\" with highlights`)}>
                  Delete + Highlights
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <p className="state-pill">{state}</p>
    </section>
  );
}
