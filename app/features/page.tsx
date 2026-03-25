import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";

const featureRows = [
  ["Swipe Reader", "Card stack triage with Read / Save / Next controls and directional overlays."],
  ["Read Inbox", "Chronological queue with unread markers, reading-time estimate, source/date metadata, and bookmark toggle."],
  ["Library", "Saved-only collection with All / Unread / Read filters and removal flows with highlight retention options."],
  ["RSS Management", "Add source by URL, refresh all, per-feed refresh/remove, feed detail previews, download to queue."],
  ["Reader Mode", "Progress indicator, hero metadata, semantic content blocks, open-original action, re-parse action."],
  ["Highlights", "Save snippets, browse dedicated highlights list, delete highlight entries by article/date."],
  ["Tags", "Add/remove custom tags with suggestion chips from prior tag history."],
  ["Typography Controls", "Source Serif / DM Sans / Playfair options with font scale and alignment controls."],
  ["Notifications", "Morning sync toggle, unread threshold slider (3-10), test notification narrative, reader deep-link."],
  ["Shared Link Ingestion", "Paste/share a URL from other apps and route it directly into reading flow."],
  ["Reliability", "Offline-first local persistence for feeds/articles/highlights/tags with graceful parser fallback."],
];

export const metadata: Metadata = {
  title: "Features | ngpocket",
  description: "Full product feature matrix for ngpocket's static showcase website.",
};

export default function FeaturesPage() {
  return (
    <PageScaffold
      eyebrow="Feature Matrix"
      title="Every core app capability mapped clearly"
      lead="This page is the product truth table: what users can experience directly in the website demo versus what remains native-only behavior."
    >
      <section className="section-grid">
        <article className="surface-panel">
          <h2>Coverage</h2>
          <p>All mandatory feature categories from the ngpocket brief are represented in this static site.</p>
        </article>
      </section>

      <section className="feature-matrix" aria-label="Feature matrix">
        {featureRows.map(([name, detail]) => (
          <article key={name} className="feature-row">
            <h3>{name}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Interactive website demos</h2>
          <p>Swipe cards, reader controls, tag chips, RSS workflows, library filters, and settings threshold logic.</p>
        </article>
        <article className="surface-panel">
          <h2>Native app capabilities (stated)</h2>
          <p>Share-intent interception, true haptic feedback, and OS-managed background notification delivery.</p>
        </article>
      </section>
    </PageScaffold>
  );
}
