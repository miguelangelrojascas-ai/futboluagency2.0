import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomeRoster from "@/components/home/HomeRoster";
import HomeMethod from "@/components/home/HomeMethod";
import HomeVideo from "@/components/home/HomeVideo";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { druk, bebas } from "@/fonts/editorial";

/* Editorial home: black hero and numbers, white chapters, one CTA ("Envía tu
   perfil") repeated in the hero and at the close, nothing competing with it. */
const Index = () => (
  <>
    <Navbar />
    <main className={`min-h-screen ${druk.variable} ${bebas.variable}`}>
      <HomeHero />
      <HomeStats />
      <HomeRoster />
      <HomeMethod />
      <HomeVideo />
      <FaqSection />
      <HomeFinalCta />
      <Footer />
    </main>
  </>
);

export default Index;
