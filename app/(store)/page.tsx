"use client";

import dynamic from "next/dynamic";
import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import PromoBanner from "@/components/home/PromoBanner";

const HomeProducts = dynamic(
  () => import("@/components/home/HomeProducts"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <HomeProducts />
      <PromoBanner />
    </>
  );
}
