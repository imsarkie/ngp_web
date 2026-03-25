"use client";

import { useMemo, useState } from "react";

type SwipeItem = {
  id: number;
  title: string;
  source: string;
  minutes: string;
  description: string;
};

const initialQueue: SwipeItem[] = [
  {
    id: 1,
    title: "The Small Rituals That Keep Deep Reading Alive",
    source: "Longform Weekly",
    minutes: "7 min",
    description: "A practical ritual stack for reducing inbox drift and preserving focused reading sessions.",
  },
  {
    id: 2,
    title: "Designing Offline UX That Never Feels Broken",
    source: "Sage Systems",
    minutes: "9 min",
    description: "How local-first decisions influence confidence, speed, and trust across weak networks.",
  },
  {
    id: 3,
    title: "Why RSS Is Quietly Becoming Essential Again",
    source: "Signal Journal",
    minutes: "6 min",
    description: "Independent feeds, calmer curation, and reclaiming intent in the age of algorithmic noise.",
  },
];

function actionFromDirection(direction: "left" | "right" | "up") {
  if (direction === "left") return "Marked as Read";
  if (direction === "right") return "Saved and parsed";
  return "Skipped to Next";
}

export function SwipeReaderDemo() {
  const [queue, setQueue] = useState(initialQueue);
  const [feedback, setFeedback] = useState("Drag a card or use Read/Save/Next");

  const active = queue[0];
  const upcoming = useMemo(() => queue.slice(1, 3), [queue]);

  const applyAction = (direction: "left" | "right" | "up") => {
    if (!active) return;
    setFeedback(actionFromDirection(direction));
    setQueue((prev) => prev.slice(1));
  };

  const resetDemo = () => {
    setQueue(initialQueue);
    setFeedback("Queue reset with freshly synced stories");
  };

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: Swipe Reader</h3>
        <p>
          Direction mapping is kept identical to the app: left = Read, right = Save, up = Next, down = disabled.
        </p>
      </header>

      <div className="swipe-stage" aria-live="polite">
        {active ? (
          <article className="swipe-card" role="group" aria-label="Current article card">
            <div className="swipe-overlay-row">
              <span className="overlay-chip left">Read</span>
              <span className="overlay-chip up">Next</span>
              <span className="overlay-chip right">Save</span>
            </div>
            <p className="meta-line">
              {active.source} · {active.minutes}
            </p>
            <h4>{active.title}</h4>
            <p>{active.description}</p>
            <p className="queue-hint">Upcoming cards are image-precached for smooth transitions.</p>
          </article>
        ) : (
          <article className="swipe-card empty" role="group" aria-label="Queue empty">
            <h4>Queue is clear.</h4>
            <p>Add an RSS feed to refill your swipe stack for tomorrow morning.</p>
            <button type="button" onClick={resetDemo} className="button secondary">
              Add Feed (Demo)
            </button>
          </article>
        )}

        {upcoming.map((item, index) => (
          <div key={item.id} className="swipe-card ghost" style={{ transform: `translateY(${(index + 1) * 10}px)` }}>
            <p className="meta-line">{item.source}</p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <div className="action-row" role="group" aria-label="Swipe actions">
        <button type="button" onClick={() => applyAction("left")} className="button muted" disabled={!active}>
          Read
        </button>
        <button type="button" onClick={() => applyAction("right")} className="button" disabled={!active}>
          Save
        </button>
        <button type="button" onClick={() => applyAction("up")} className="button muted" disabled={!active}>
          Next
        </button>
      </div>

      <p className="state-pill">{feedback}</p>
      <p className="small-note">Native-only capability: tactile haptics. Website mirrors it with visual state pulses only.</p>
    </section>
  );
}
