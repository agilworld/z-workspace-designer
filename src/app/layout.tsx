import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workspace Designer | monis.rent",
  description:
    "Design your dream workspace — pick a desk, choose a chair, add monitors and accessories, then rent it all from monis.rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </body>
    </html>
  );
}
