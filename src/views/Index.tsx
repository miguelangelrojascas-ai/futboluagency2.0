import HomeHero from "@/components/home/HomeHero";
import HomePromise from "@/components/home/HomePromise";
import HomeWhyUs from "@/components/home/HomeWhyUs";
import HomeReviews from "@/components/home/HomeReviews";
import HomeRoster from "@/components/home/HomeRoster";
import HomePaths from "@/components/home/HomePaths";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import LogoCarousel from "@/components/LogoCarousel";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* Editorial home with one CTA ("Envía tu perfil"), in the hero and at the
   close. Order: hero and university logos, success stories (proof first),
   the promise, the two paths (USA and Spain), why FUA, doubts (FAQ), close.
   The step-by-step method lives on the USA page only. */
const Index = () => (
  <>
    <Navbar tone="dark" />
    <main className="min-h-screen">
      <HomeHero />
      <LogoCarousel />
      <HomeRoster />
      <HomePromise />
      <HomePaths />
      <HomeWhyUs />
      <HomeReviews />
      <FaqSection />
      <HomeFinalCta />
      <Footer />
    </main>
  </>
);

export default Index;
