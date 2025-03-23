import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function Home() {
  return (
    <>
      <ComingSoon
        buttonText="Login to Dashboard"
        buttonLink="/auth/login"
      />
      <Footer />
    </>
  );
}
