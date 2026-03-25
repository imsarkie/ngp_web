import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { TopShowcaseNav } from "@/app/components/navigation/TopShowcaseNav";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-reading",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ngpocket.app"),
  title: {
    default: "ngpocket | Application Showcase",
    template: "%s",
  },
  description:
    "Application showcase website for ngpocket, featuring product highlights and support pages.",
  openGraph: {
    title: "ngpocket",
    description: "Feature overview for ngpocket.",
    type: "website",
    url: "https://ngpocket.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sourceSerif.variable} ${playfair.variable}`}>
      <body>
        <div className="site-backdrop" aria-hidden />
        <div className="minimal-wrap">
          <TopShowcaseNav />
          {children}
          <footer className="site-footer">
            <p>ngpocket application showcase</p>
            <div className="footer-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/contact-us">Contact Us</Link>
              <Link href="/help">Help</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
