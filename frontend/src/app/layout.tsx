import type { Metadata } from "next";
import "./styles/globals.css";
import Providers from "./utils/Providers";

export const metadata: Metadata = {
  title: "FitWise",
  description: "Your personal fitness assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
