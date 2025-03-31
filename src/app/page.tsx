"use client";
import { Suspense } from 'react';
import ShopByCategory from "@/components/category/ShopByCategory";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBanner } from "@/components/layout/TopBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { DealOfMonth } from "@/components/sections/DealOfMonth";
import { Hero } from "@/components/sections/Hero";
import { WhyShopWithUs } from "@/components/sections/WhyShopWithUs";
import { demoProducts } from "@/data/demo";

export default function Home() {
  return (
    <>
      <TopBanner theme={'dark'} />
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <Hero />
      <DealOfMonth />
      <ShopByCategory />
      <ProductGrid
        title="Explore Products"
        subtitle=""
        viewAllLink="/products"
        products={demoProducts.slice(0, 8)}
      />
      <WhyShopWithUs />
      <ProductGrid
        title="New Arrivals"
        subtitle=""
        viewAllLink="/products/new"
        products={demoProducts.slice(0, 8)}
      />
      <CTASection />
      <Footer />
    </>
  );
}

// Create a separate viewport.ts file in the same directory
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#184193'
};
