// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Metadata is perfectly fine here now!
export const metadata: Metadata = {
  title: "DevMatch",
  description: "Commit to the perfect team.",
  icons: {
    icon: "/dev-logo.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-screen antialiased bg-[#091413]">
        <AuthProvider>
          <MainLayout> 
            {children}
          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}