import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";
import { RssFlowDemo } from "@/app/components/RssFlowDemo";

export const metadata: Metadata = {
  title: "RSS Flow | ngpocket",
  description: "Showcase of RSS ingestion, feed management, and queue download behavior.",
};

export default function RssPage() {
  return (
    <PageScaffold
      eyebrow="RSS Flow"
      title="From feed URL to ready-to-read queue"
      lead="ngpocket keeps RSS practical: add sources quickly, refresh in bulk, inspect each feed, and import what matters into your reading flow."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Problem</h2>
          <p>Feed readers either overwhelm users or hide key source controls behind dense settings menus.</p>
        </article>
        <article className="surface-panel">
          <h2>ngpocket behavior</h2>
          <p>Feed controls stay visible: add by URL, refresh all, refresh/remove per source, preview articles, then download into queue.</p>
        </article>
      </section>

      <RssFlowDemo />

      <section className="section-grid">
        <article className="surface-panel">
          <h2>Trust note</h2>
          <p>Morning sync alerts summarize unread volume so users can triage before opening the app.</p>
        </article>
      </section>
    </PageScaffold>
  );
}
