"use client";

import { useMemo, useState } from "react";

type Feed = {
  id: number;
  title: string;
  url: string;
  updated: string;
};

const initialFeeds: Feed[] = [
  { id: 1, title: "Longform Weekly", url: "https://longformweekly.com/rss", updated: "Today, 07:12" },
  { id: 2, title: "Signal Journal", url: "https://signaljournal.com/feed", updated: "Yesterday, 06:45" },
];

export function RssFlowDemo() {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [url, setUrl] = useState("https://feeds.example.com/design");
  const [state, setState] = useState("Idle");
  const isLoading = state.startsWith("Loading");

  const articleCount = useMemo(() => feeds.length * 8, [feeds]);

  const addFeed = () => {
    if (!url.trim()) {
      setState("Error: enter a valid feed URL");
      return;
    }

    setFeeds((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Custom Feed ${prev.length + 1}`,
        url,
        updated: "Just now",
      },
    ]);
    setState("Feed imported and queue refreshed");
  };

  const removeFeed = (id: number) => {
    setFeeds((prev) => prev.filter((feed) => feed.id !== id));
    setState("Feed removed");
  };

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: RSS Management</h3>
        <p>Add feed URLs, refresh sources, inspect feed previews, and download stories into your reading queue.</p>
      </header>

      <div className="input-row">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          type="url"
          placeholder="Paste RSS source URL"
          aria-label="RSS feed URL"
        />
        <button type="button" className="button" onClick={addFeed}>
          Add Feed
        </button>
      </div>

      <div className="action-row" role="group" aria-label="Feed actions">
        <button type="button" className="button muted" onClick={() => setState("Refreshing all feeds (demo pull-to-refresh)")}>
          Refresh All
        </button>
        <button type="button" className="button muted" onClick={() => setState("Loading state: syncing feed metadata") }>
          Show Loading
        </button>
      </div>

      <ul className="list-panel" aria-label="Feed list">
        {isLoading ? (
          <>
            <li className="list-empty">Loading feed snapshots...</li>
            <li className="list-empty">[skeleton] Source metadata placeholder</li>
            <li className="list-empty">[skeleton] Article preview placeholder</li>
          </>
        ) : feeds.length === 0 ? (
          <li className="list-empty">No feeds yet. Add one to start building your queue.</li>
        ) : (
          feeds.map((feed) => (
            <li key={feed.id}>
              <div>
                <strong>{feed.title}</strong>
                <p>{feed.url}</p>
                <small>Last updated: {feed.updated}</small>
              </div>
              <div className="row-actions">
                <button type="button" onClick={() => setState(`Refreshed ${feed.title}`)}>
                  Refresh
                </button>
                <button type="button" onClick={() => removeFeed(feed.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="surface-panel">
        <h4>Feed Detail Preview</h4>
        <p>{articleCount} articles available. Download imports one article into Read Inbox.</p>
        <button type="button" className="button secondary" onClick={() => setState("Article downloaded into queue") }>
          Download Article
        </button>
      </div>

      <p className="state-pill">{state}</p>
      <p className="small-note">Native-only capability: automatic background schedulers. Demo explains behavior without requiring OS integration.</p>
    </section>
  );
}
