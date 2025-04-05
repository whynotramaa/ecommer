import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google'; // Import DM Sans
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";




const dmSans = DM_Sans({ // Define DM Sans
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: "Ecomr - A modern world ecommmerce",
  description: "Built with 🤗 by Rama",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${dmSans.variable} ${dmSans.variable} antialiased`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}


          <main>
            <Header />
            {children}
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
