import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./globals.css";

export const metadata = {
  title: "MetaworkMQTT Monitor",
  description: "Created by Nagoya Univ. UCLab",
};

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children}) {
  return (
    <html lang="ja">
      <body className={inter.className} data-bs-theme="dark">{children}</body>
    </html>
  );
}
