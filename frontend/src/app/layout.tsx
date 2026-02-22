import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ReactQueryProvider } from "@/lib/react-query";
import ConditionalNavigation from "./components/ConditionalNavigation";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BetterBobcats",
  description: "Open-source platform for UC Merced students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalNavigation />
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
