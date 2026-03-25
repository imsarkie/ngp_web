import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";
import { ReadInboxDemo } from "@/app/components/ReadInboxDemo";
import { SwipeReaderDemo } from "@/app/components/SwipeReaderDemo";

export const metadata: Metadata = {
  title: "Experience | ngpocket",
  description: "Swipe-first interaction narrative for ngpocket, including directional behavior and fallback controls.",
};

export default function ExperiencePage() {
  return (
    <PageScaffold
      eyebrow="Gesture Narrative"
      title="A triage flow designed for momentum"
      lead="ngpocket transforms unread overload into a simple card rhythm: Read, Save, or Next, with immediate directional feedback and desktop-safe fallback controls."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Problem</h2>
          <p>Most read-later queues become stagnant because triage is slow and list-heavy.</p>
        </article>
        <article className="surface-panel">
          <h2>ngpocket behavior</h2>
          <p>
            Swipe left marks an article read, swipe right saves and attempts full parsing, swipe up advances,
            swipe down remains intentionally disabled in the current implementation.
          </p>
        </article>
      </section>

      <SwipeReaderDemo />

      <ReadInboxDemo />

      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Read Inbox tie-in</h2>
          <p>
            Every accepted story lands in Read inbox with source, date, reading-time estimate, unread marker, and one-tap bookmark.
          </p>
        </article>
        <article className="surface-panel">
          <h2>Trust note</h2>
          <p>Card assets are preloaded in sequence to keep swiping smooth even under inconsistent connectivity.</p>
        </article>
      </section>
    </PageScaffold>
  );
}
