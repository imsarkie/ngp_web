"use client";

import { useMemo, useState } from "react";

const sampleTags = ["Productivity", "Offline", "Reading Habit"];
const tagSuggestions = ["UX", "RSS", "Knowledge Base"];

const textBlocks = [
  { kind: "heading", copy: "Reader mode that stays out of your way" },
  {
    kind: "body",
    copy: "ngpocket renders parsed content as semantic blocks so long-form reading stays clean, focused, and predictable.",
  },
  {
    kind: "quote",
    copy: "Good reading software should reduce cognitive drag, not create a second inbox to maintain.",
  },
  {
    kind: "list",
    copy: "Link handling supports markdown links and raw URLs like https://example.com/deep-dive without extra cleanup.",
  },
];

export function ReaderDemo() {
  const [fontFamily, setFontFamily] = useState("serif");
  const [align, setAlign] = useState("left");
  const [scale, setScale] = useState(100);
  const [tags, setTags] = useState(sampleTags);
  const [state, setState] = useState("Reader ready");

  const progress = useMemo(() => Math.min(95, Math.round(scale / 1.5)), [scale]);

  const addSuggestion = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((value) => value !== tag));
  };

  return (
    <section className="demo-card">
      <header className="demo-header">
        <h3>Interactive Website Demo: Reader Experience</h3>
        <p>This simulates progress, typography controls, highlights, and per-article tagging from the native reader.</p>
      </header>

      <div className="reader-progress" role="progressbar" aria-valuemin={0} aria-valuenow={progress} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <article className={`reader-sheet ${fontFamily} align-${align}`} style={{ fontSize: `${scale}%` }}>
        <p className="meta-line">Signal Journal · 9 min · Reader View</p>
        {textBlocks.map((block) => {
          if (block.kind === "heading") return <h4 key={block.copy}>{block.copy}</h4>;
          if (block.kind === "quote") return <blockquote key={block.copy}>{block.copy}</blockquote>;
          if (block.kind === "list") {
            return (
              <ul key={block.copy}>
                <li>{block.copy}</li>
              </ul>
            );
          }
          return <p key={block.copy}>{block.copy}</p>;
        })}
        <p>
          Open original in browser: <a href="https://example.com/original-story">example.com/original-story</a>
        </p>
      </article>

      <div className="controls-grid">
        <label>
          Font family
          <select value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>
            <option value="serif">Source Serif</option>
            <option value="sans">DM Sans</option>
            <option value="playfair">Playfair</option>
          </select>
        </label>

        <label>
          Alignment
          <select value={align} onChange={(event) => setAlign(event.target.value)}>
            <option value="left">Left</option>
            <option value="justify">Justified</option>
          </select>
        </label>

        <label>
          Font scale ({scale}%)
          <input type="range" min={85} max={130} value={scale} onChange={(event) => setScale(Number(event.target.value))} />
        </label>
      </div>

      <div className="action-row">
        <button type="button" className="button secondary" onClick={() => setState("Re-parse complete using fallback-safe parser") }>
          Re-parse Article
        </button>
      </div>

      <div className="highlight-panel">
        <h4>Highlights + Tags</h4>
        <p>Selected quote saved: &quot;reduce cognitive drag&quot; · March 25</p>
        <ul>
          <li>&quot;quiet interface keeps focus&quot; · Longform Weekly · Mar 22</li>
          <li>&quot;local-first beats flaky sessions&quot; · Signal Journal · Mar 20</li>
        </ul>
        <div className="chip-row">
          {tags.map((tag) => (
            <button type="button" key={tag} className="chip" onClick={() => removeTag(tag)}>
              {tag} ×
            </button>
          ))}
        </div>
        <p className="meta-line">Suggested tags</p>
        <div className="chip-row">
          {tagSuggestions.map((tag) => (
            <button type="button" key={tag} className="chip muted" onClick={() => addSuggestion(tag)}>
              + {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="state-pill">{state}</p>
      <p className="small-note">Native-only capability: true text selection gestures. Website simulates highlight outcomes for clarity.</p>
    </section>
  );
}
