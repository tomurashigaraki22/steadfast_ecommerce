import "./globals.css";
import { Inter, Montserrat } from 'next/font/google'

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// })

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
  themeColor: "#184193",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#184193'
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
        {children}
      </body>
    </html>
  );
}
