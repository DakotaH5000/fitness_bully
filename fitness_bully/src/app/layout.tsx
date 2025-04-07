import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/navbar/page";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitness Bully",
  description: "Your personal negative reinforcement trainer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Add header and footer items to this file
  
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
      <header>
      <NavBar />
      </header>
        {children}
      <footer></footer>
      </UserProvider>
      </body>
    </html>
  );
}
