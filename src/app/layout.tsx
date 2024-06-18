import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import GridPattern from "@/components/magicui/grid-pattern";

export const metadata: Metadata = {
  title: "X Bio Generator",
  description: "Generate a custom bio for your X profile with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <GridPattern width={60} height={60} className="-z-10 opacity-70" />
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html >
  );
}
