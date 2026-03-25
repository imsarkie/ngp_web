import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | ngpocket",
  description: "ngpocket application showcase homepage.",
};

export default function Home() {
  return (
    <main className="minimal-page showcase-home">
      <header className="minimal-header hero" id="overview">
        <p className="label">Application Showcase</p>
        <h1>ngpocket</h1>
        <p>
          A swipe-first read-later and RSS workflow that turns article overload into a quiet daily reading ritual.
        </p>
        <div className="hero-note">
          <strong>Core flow:</strong> ingest links, triage with gestures, read deeply, capture highlights, and return to a refreshed queue.
        </div>
      </header>

      <section className="section-grid two-up" aria-label="Primary showcase routes">
        <article className="surface-panel">
          <h2>Interactive experiences</h2>
          <p>Explore live demos for Swipe Reader, Reader Mode, RSS Flow, Library controls, and Settings behavior.</p>
          <p>
            Start with <Link href="/experience">Experience</Link> for swipe triage, then continue into <Link href="/reader">Reader</Link> and <Link href="/rss">RSS</Link>.
          </p>
        </article>
        <article className="surface-panel">
          <h2>Product system</h2>
          <p>Review complete capability coverage in <Link href="/features">Features</Link> and reliability details in <Link href="/architecture">Architecture</Link>.</p>
          <p>
            Need support details? Visit <Link href="/contact-us">Contact</Link>, <Link href="/help">Help</Link>, and <Link href="/privacy-policy">Privacy</Link>.
          </p>
        </article>
      </section>

      <section className="feature-list" aria-label="ngpocket features" id="features">
        <article>
          <h2>Swipe Reader</h2>
          <p>Left marks read, right saves and parses, up skips next. Down remains intentionally disabled.</p>
        </article>
        <article>
          <h2>Read Inbox</h2>
          <p>Chronological feed of readable articles with source metadata, reading time, date, and bookmark actions.</p>
        </article>
        <article>
          <h2>Library</h2>
          <p>Saved-only collection with All, Unread, and Read filters plus explicit removal/highlight-retention choices.</p>
        </article>
        <article>
          <h2>RSS Management</h2>
          <p>Add feed URLs, refresh globally or per feed, inspect previews, and import selected stories into queue.</p>
        </article>
        <article>
          <h2>Reader Mode</h2>
          <p>Immersive reading surface with progress indicator, semantic content blocks, reparsing, and source links.</p>
        </article>
        <article>
          <h2>Highlights and Tags</h2>
          <p>Capture highlights, manage snippet history, and organize knowledge with custom tags and suggestions.</p>
        </article>
        <article>
          <h2>Reader Personalization</h2>
          <p>Adjust reading fonts, text size, and alignment to match personal reading comfort and context.</p>
        </article>
        <article>
          <h2>Notifications and Sync</h2>
          <p>Morning sync alerts with unread thresholds (3-10) so attention is prompted only when useful.</p>
        </article>
        <article>
          <h2>Shared Link Ingestion</h2>
          <p>Shared URLs from browser or apps drop directly into the same read-later pipeline.</p>
        </article>
        <article>
          <h2>Offline-first Reliability</h2>
          <p>Local-first persistence keeps interactions fast, with graceful fallback when parser/network conditions fail.</p>
        </article>
      </section>

      <section className="minimal-header trust-strip" id="proof">
        <h2>Why ngpocket feels different</h2>
        <p>
          It combines tactile triage mechanics with an editorial reader, then backs it with local-first reliability so
          daily usage feels dependable rather than fragile.
        </p>
      </section>

      <section className="minimal-header" id="faq">
        <h2>Quick FAQ</h2>
        <p><strong>Is this the full app?</strong> No. This website showcases product behavior and interaction patterns.</p>
        <p><strong>Does swipe mapping match production?</strong> Yes: left read, right save, up next, down disabled.</p>
        <p><strong>Can it handle weak networks?</strong> Yes, ngpocket is local-first with parser fallback messaging.</p>
      </section>
    </main>
  );
}
