import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";
import { LibraryDemo } from "@/app/components/LibraryDemo";

export const metadata: Metadata = {
  title: "Library | ngpocket",
  description: "Saved article workflow with filters, open reader behavior, and highlight-safe removal logic.",
};

export default function LibraryPage() {
  return (
    <PageScaffold
      eyebrow="Saved Library"
      title="A saved collection that stays manageable"
      lead="Library is where saved articles stay organized by status and where removal flows remain explicit about highlight retention."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Problem</h2>
          <p>Saved lists often become cluttered because read state and delete behavior are unclear.</p>
        </article>
        <article className="surface-panel">
          <h2>ngpocket behavior</h2>
          <p>
            Users can filter by All/Unread/Read, mark unread from swipe actions, remove while keeping highlights, or delete article + highlights.
          </p>
        </article>
      </section>

      <LibraryDemo />

      <section className="section-grid">
        <article className="surface-panel">
          <h2>Trust note</h2>
          <p>Highlights and tags persist locally, so cleanup actions remain deliberate and recoverable in normal offline usage.</p>
        </article>
      </section>
    </PageScaffold>
  );
}
