import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BriefSignal — Walk in informed",
  description: "A source-backed meeting brief. The last 30 days, the right questions, and the evidence behind every signal.",
  icons: {
    icon: "/briefsignal.svg",
    shortcut: "/briefsignal.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
