import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "Jobs portal",
    template: "%s | IZAM",
  },
  description: "Find your dream job in a moment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-dm-sans flex flex-col h-screen`}
      >
        <Navbar />
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
