import type { ReactNode } from "react";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function PageScaffold({ eyebrow, title, lead, children }: PageScaffoldProps) {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </section>
      {children}
    </main>
  );
}
