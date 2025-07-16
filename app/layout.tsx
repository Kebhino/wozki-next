import "@/app/globals.css";
import NavigationBar from "@/app/components/NavigationBar";
import Footer from "@/app/components/Footer";
import Providers from "@/app/providers"; // dodaj ten import

import type { ReactNode } from "react";

export const metadata = {
  title: "Wózki Planner",
  description: "Planowanie i zarządzanie wózkami",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" data-theme="fantasy">
      <body className="w-full max-w-screen-lg mx-auto min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Providers>
          <NavigationBar />
          <main className="px-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
