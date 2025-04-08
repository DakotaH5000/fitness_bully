'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/navbar/page";
import { SessionProvider } from "next-auth/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Add header and footer items to this file
  
  return (
    <html lang="en">
    <SessionProvider>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <header>
      <NavBar />
      </header>
        {children}
      <footer></footer>   
      </body>
      </SessionProvider>
    </html>
  );
}
