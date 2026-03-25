import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ngpocket",
  description: "Contact page for ngpocket showcase website.",
};

export default function ContactUsPage() {
  return (
    <main className="info-page">
      <h1>Contact Us</h1>
      <p>
        Reach out for product questions, partnership requests, or feedback about the ngpocket reading experience.
      </p>

      <section className="contact-grid">
        <article>
          <h2>General</h2>
          <p>hello@ngpocket.app</p>
        </article>
        <article>
          <h2>Support</h2>
          <p>support@ngpocket.app</p>
        </article>
        <article>
          <h2>Product Feedback</h2>
          <p>feedback@ngpocket.app</p>
        </article>
      </section>

      <section>
        <h2>Response Time</h2>
        <p>
          We typically respond within 1-2 business days.
        </p>
      </section>
    </main>
  );
}
