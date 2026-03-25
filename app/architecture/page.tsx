import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";

export const metadata: Metadata = {
  title: "Architecture | ngpocket",
  description: "Offline-first architecture and reliability model behind ngpocket experience.",
};

export default function ArchitecturePage() {
  return (
    <PageScaffold
      eyebrow="Reliability Model"
      title="Offline-first by design, not as an afterthought"
      lead="The product is tuned for daily reading under real-world network conditions with local-first storage and predictable fallback behavior."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Local-first storage</h2>
          <p>Articles, feeds, highlights, and tags are persisted locally so readers can continue without network dependency.</p>
        </article>
        <article className="surface-panel">
          <h2>Background cadence</h2>
          <p>Morning feed sync keeps queues fresh. Notifications trigger at unread thresholds (3-10) for controlled attention.</p>
        </article>
      </section>

      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Parsing resilience</h2>
          <p>When parser services are unavailable, ngpocket falls back gracefully rather than blocking reading sessions.</p>
        </article>
        <article className="surface-panel">
          <h2>Shared-link ingestion</h2>
          <p>
            Native app can accept shared URLs from browser or other apps, parse content, and inject it directly into the same swipe/read pipeline.
          </p>
        </article>
      </section>

      <section className="section-grid">
        <article className="surface-panel">
          <h2>Website vs native clarity</h2>
          <p>
            This website demonstrates UX logic and state transitions. OS-specific background schedulers, share intents, and haptics are described as native capabilities.
          </p>
        </article>
      </section>
    </PageScaffold>
  );
}
