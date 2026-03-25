import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help | ngpocket",
  description: "Help and quick guidance for ngpocket features.",
};

export default function HelpPage() {
  return (
    <main className="info-page">
      <h1>Help</h1>
      <p>Quick help for understanding how ngpocket works.</p>

      <section>
        <h2>How do swipes work?</h2>
        <p>Swipe left to mark as read, right to save, up for next. Swipe down is currently disabled.</p>
      </section>

      <section>
        <h2>Where are my saved articles?</h2>
        <p>Open Library to browse saved stories with All, Unread, and Read filters.</p>
      </section>

      <section>
        <h2>Can I read offline?</h2>
        <p>Yes. ngpocket is local-first and optimized for reading under unstable network conditions.</p>
      </section>

      <section>
        <h2>How does RSS sync work?</h2>
        <p>Feeds can be refreshed manually, and the app supports morning sync notifications with an unread threshold.</p>
      </section>
    </main>
  );
}
