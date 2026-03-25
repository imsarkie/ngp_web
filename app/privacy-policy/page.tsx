import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ngpocket",
  description: "Privacy policy for the ngpocket application showcase website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="info-page">
      <h1>Privacy Policy</h1>
      <p>
        This showcase site explains ngpocket product capabilities. It does not require account creation or collect
        personal reading content.
      </p>

      <section>
        <h2>What this website stores</h2>
        <p>
          We only use essential browser behavior needed to render the pages. No hidden trackers or invasive data
          collection are used in this static showcase.
        </p>
      </section>

      <section>
        <h2>How ngpocket works in the app</h2>
        <p>
          The native app is designed local-first: saved articles, highlights, tags, and feed data are primarily stored
          on-device for reliability and offline access.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent through the Contact Us page.
        </p>
      </section>
    </main>
  );
}
