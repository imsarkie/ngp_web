import type { Metadata } from "next";
import { PageScaffold } from "@/app/components/PageScaffold";
import { SettingsDemo } from "@/app/components/SettingsDemo";

export const metadata: Metadata = {
  title: "Settings | ngpocket",
  description: "Showcase of reader personalization, parser options, and notification threshold controls.",
};

export default function SettingsPage() {
  return (
    <PageScaffold
      eyebrow="Settings"
      title="Personalization and sync controls with clear feedback"
      lead="ngpocket keeps advanced controls simple: typography preferences, parser endpoint settings, highlights overview, and morning RSS alert logic."
    >
      <section className="section-grid two-up">
        <article className="surface-panel">
          <h2>Problem</h2>
          <p>Reader personalization and notification settings are often fragmented across unrelated menus.</p>
        </article>
        <article className="surface-panel">
          <h2>ngpocket behavior</h2>
          <p>
            One settings area controls highlights, font scale, parser endpoint, morning sync toggle, threshold slider, and test notification behavior.
          </p>
        </article>
      </section>

      <SettingsDemo />

      <section className="section-grid">
        <article className="surface-panel">
          <h2>Trust note</h2>
          <p>Notification deep-links route users straight into Reader for immediate context after a sync alert.</p>
        </article>
      </section>
    </PageScaffold>
  );
}
