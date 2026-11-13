import HomeHero from "@/components/home/HomeHero";
import HomePromise from "@/components/home/HomePromise";
import HomeWhyUs from "@/components/home/HomeWhyUs";
import HomeRoster from "@/components/home/HomeRoster";
import HomeMethod from "@/components/home/HomeMethod";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import LogoCarousel from "@/components/LogoCarousel";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { druk, bebas } from "@/fonts/editorial";

/* Editorial home with one CTA ("Envía tu perfil"), in the hero and at the
   close. Order: hero, proof (logos), promise, players, method, why FUA,
   doubts (FAQ), close. */
const Index = () => (
  <>
    {/* The navbar's desktop drawer uses the same display faces. */}
    <div className={`${druk.variable} ${bebas.variable}`}>
      <Navbar tone="dark" />
    </div>
    <main className={`min-h-screen ${druk.variable} ${bebas.variable}`}>
      <HomeHero />
      <LogoCarousel />
      <HomePromise />
      <HomeRoster />
      <HomeMethod />
      <HomeWhyUs />
      <FaqSection />
      <HomeFinalCta />
      <Footer />
    </main>
  </>
);

export default Index;
