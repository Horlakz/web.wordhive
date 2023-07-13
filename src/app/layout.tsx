import { Metadata } from "next";

import Wrapper from "@/components/baselayout/Wrapper";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Wordhive",
    default: "Wordhive",
  },
  description: "For Write Code, Write Docs, Write Anything",
  keywords: "wordhive, word, hive, write, code, docs, anything",
  authors: [{ name: "Horlakz", url: "https://github.com/horlakz" }],
  creator: "Horlakz",
  metadataBase: new URL("https://wordhive.com"),
  openGraph: {
    title: "Wordhive",
    description: "For Write Code, Write Docs, Write Anything",
    siteName: "Wordhive",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
