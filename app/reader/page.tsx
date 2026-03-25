import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";
import { ReaderDemo } from "@/app/components/ReaderDemo";

export const metadata: Metadata = {
  title: "Reader | ngpocket",
  description: "Immersive reader mode showcase with highlights, tags, progress, and typography controls.",
};

export default function ReaderPage() {
  return (
    <PageScaffold
      eyebrow="Reader Mode"
      title="Long-form reading that feels focused"
      lead="The reading view emphasizes content hierarchy, predictable typography, and low-friction annotation so users can stay in flow."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Problem</h2>
          <p>Most web readers collapse article semantics and make highlighting feel disconnected from context.</p>
        </article>
        <article className="surface-panel">
          <h2>ngpocket behavior</h2>
          <p>
            Reader renders headings, quotes, lists, and paragraphs cleanly, keeps progress visible, and supports direct
            links back to the original source.
          </p>
        </article>
      </section>

      <ReaderDemo />

      <section className="section-grid">
        <article className="surface-panel">
          <h2>Trust note</h2>
          <p>
            If remote parsing fails, ngpocket uses graceful fallback content so saved articles remain available offline.
          </p>
        </article>
      </section>
    </PageScaffold>
  );
}
