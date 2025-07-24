import "@/app/globals.css";
import NavigationBar from "@/app/components/NavigationBar";
import Footer from "@/app/components/Footer";
import Providers from "@/app/providers"; // dodaj ten import

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Wózki Planner",
  description: "Planowanie i zarządzanie wózkami",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" data-theme="light">
      <body className="w-full max-w-screen-lg mx-auto min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "10px",
              },
              success: {
                iconTheme: {
                  primary: "green",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "red",
                  secondary: "white",
                },
              },
            }}
          />
          <NavigationBar />
          <main className="px-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
