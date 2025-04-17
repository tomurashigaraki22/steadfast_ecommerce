import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Inter, Montserrat } from 'next/font/google'
import { Suspense } from "react";

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})


export const metadata = {
  title: 'Steadfast International',
  description: 'Your trusted source for quality products',
  keywords: "ecommerce, online shopping, PWA, affiliate marketing",
  authors: [{ name: "Robinson Honour" }],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Steadfast Store',
  },
  // Remove the viewport property from here
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#184193',
  maximumScale: 1,
  minimumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body
        className={`${montserrat.className}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          {children}
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
