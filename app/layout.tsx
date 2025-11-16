import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProviderWrapper } from "./components/AuthProviderWrapper";
import { QueryProvider } from "./components/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GBUR - Campus for Christ",
  description: "To see every student and graduate as an agent of Godly transformation in church and society. Join our campus ministry community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <AuthProviderWrapper>
            {children}
          </AuthProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
