import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { TopBanner } from "@/components/layout/TopBanner";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function Home() {
  return (
    <>
      <TopBanner theme={'dark'} />
      <ComingSoon
        buttonText="Login to Dashboard"
        buttonLink="/auth/login"
      />
      <CTASection />
      <Footer />
    </>
  );
}
