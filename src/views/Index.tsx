import HomeHeroSpotlight from "@/components/home/HomeHeroSpotlight";
import HomeHeroStatement from "@/components/home/HomeHeroStatement";
import HomeStatement from "@/components/home/HomeStatement";
import HomeRoster from "@/components/home/HomeRoster";
import HomeMethod from "@/components/home/HomeMethod";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { druk, bebas } from "@/fonts/editorial";

/* Editorial home with one CTA ("Envía tu perfil"), in the hero and at the
   close. Two header proposals share everything below the hero:
   A "spotlight" (rotating players) and B "statement" (one portrait). */
const Index = ({ variant = "a" }: { variant?: "a" | "b" }) => (
  <>
    <Navbar tone="dark" />
    <main className={`min-h-screen ${druk.variable} ${bebas.variable}`}>
      {variant === "a" ? <HomeHeroSpotlight /> : <HomeHeroStatement />}
      <HomeStatement />
      <HomeRoster />
      <HomeMethod />
      <FaqSection />
      <HomeFinalCta />
      <Footer />
    </main>
  </>
);

export default Index;
