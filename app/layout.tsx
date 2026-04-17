import type { Metadata } from "next";
import { Bricolage_Grotesque, BioRhyme } from "next-desktop-fonts"; // Using Next.js font convention
import { Bricolage_Grotesque as HeadingFont, BioRhyme as BodyFont } from "next/font/google";
import "./globals.css";

const heading = HeadingFont({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700", "800"]
});

const body = BodyFont({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Just4KitchenUtensils | Elevating Every Kitchen",
  description: "Lagos' premier destination for high-end kitchenware and bespoke souvenirs in Ikota.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}