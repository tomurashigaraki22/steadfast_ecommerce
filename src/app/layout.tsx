import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google'

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// })

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Steadfast International eCommerce",
  description: "Your one-stop shop for all your needs - PWA eCommerce platform by Steadfast International",
  keywords: "ecommerce, online shopping, PWA, affiliate marketing",
  authors: [{ name: "Robinson Honour" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        {children}
      </body>
    </html>
  );
}
