"use client";

import { useState } from "react";

type InboxRow = {
  id: number;
  title: string;
  source: string;
  readingTime: string;
  date: string;
  unread: boolean;
  bookmarked: boolean;
};

const rows: InboxRow[] = [
  {
    id: 1,
    title: "How to Build a Better Reading Queue",
    source: "Longform Weekly",
    readingTime: "8 min",
    date: "Mar 25",
    unread: true,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Calm Interface Design for Focus",
    source: "Design Systems Journal",
    readingTime: "5 min",
    date: "Mar 24",
    unread: false,
    bookmarked: true,
  },
];

export function ReadInboxDemo() {
  const [items, setItems] = useState(rows);

  const toggleBookmark = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item,
      ),
    );
  };

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: Read Inbox</h3>
        <p>Chronological queue with unread markers, source/time/date metadata, and one-tap bookmark actions.</p>
      </header>

      <div className="action-row">
        <button type="button" className="button secondary">
          Feeds
        </button>
        <p className="small-note">Feeds button is the entrypoint to RSS source management.</p>
      </div>

      <ul className="list-panel" aria-label="Read inbox list">
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <p>
                {item.source} · {item.readingTime} · {item.date}
              </p>
              <small>{item.unread ? "Unread" : "Read"}</small>
            </div>
            <div className="row-actions">
              <button type="button" onClick={() => toggleBookmark(item.id)}>
                {item.bookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
