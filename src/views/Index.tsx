import HomeHero from "@/components/home/HomeHero";
import HomeStatement from "@/components/home/HomeStatement";
import HomeRoster from "@/components/home/HomeRoster";
import HomeMethod from "@/components/home/HomeMethod";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import LogoCarousel from "@/components/LogoCarousel";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { druk, bebas } from "@/fonts/editorial";

/* Editorial home with one CTA ("Envía tu perfil"), in the hero and at the
   close. The university logos sit straight under the hero as proof. */
const Index = () => (
  <>
    <Navbar tone="dark" />
    <main className={`min-h-screen ${druk.variable} ${bebas.variable}`}>
      <HomeHero />
      <LogoCarousel />
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
