import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My-Books-List",
  description: "Generated by create next app",
  
};

export default function RootLayout({ children , Component, pageProps  }) {
  return (
    <StoreProvider >
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
