"use client";

import { useState } from "react";

export function SettingsDemo() {
  const [morningSync, setMorningSync] = useState(true);
  const [threshold, setThreshold] = useState(6);
  const [parserUrl, setParserUrl] = useState("https://parser.ngpocket.app");
  const [state, setState] = useState("Settings synced locally");

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: Settings + Notifications</h3>
        <p>Shows highlight metrics, parser configuration, and morning sync notifications with unread threshold logic (3-10).</p>
      </header>

      <div className="controls-grid">
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={morningSync}
            onChange={(event) => setMorningSync(event.target.checked)}
          />
          Morning RSS sync notifications
        </label>

        <label>
          Unread threshold ({threshold})
          <input
            type="range"
            min={3}
            max={10}
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
          />
        </label>

        <label>
          Parser endpoint
          <input
            type="url"
            value={parserUrl}
            onChange={(event) => setParserUrl(event.target.value)}
          />
        </label>
      </div>

      <div className="surface-panel">
        <h4>Highlights</h4>
        <p>42 saved highlights across 18 articles.</p>
        <button type="button" className="button secondary" onClick={() => setState("Highlights panel opened") }>
          Open Highlights
        </button>
      </div>

      <div className="action-row">
        <button
          type="button"
          className="button"
          onClick={() => setState(`Test notification sent at threshold ${threshold}`)}
        >
          Test Notification
        </button>
        <button
          type="button"
          className="button muted"
          onClick={() => setState("Deep-link preview: notification opens Reader article")}
        >
          Preview Deep Link
        </button>
      </div>

      <p className="state-pill">{state}</p>
      <p className="small-note">Native-only capability: OS-level background jobs and local push delivery. Web simulates trigger logic and outcomes.</p>
    </section>
  );
}
