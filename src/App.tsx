import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Players from "./pages/Players";
import About from "./pages/About";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

const USA = lazy(() => import("./pages/USA"));
const Spain = lazy(() => import("./pages/Spain"));
const FUASports = lazy(() => import("./pages/FUASports"));
const VolleyballPage = lazy(() => import("./pages/sports/VolleyballPage"));
const GolfPage = lazy(() => import("./pages/sports/GolfPage"));
const TennisPage = lazy(() => import("./pages/sports/TennisPage"));
const TrackPage = lazy(() => import("./pages/sports/TrackPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/usa" element={<USA />} />
              <Route path="/spain" element={<Spain />} />
              <Route path="/players" element={<Players />} />
              <Route path="/about" element={<About />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/sports" element={<FUASports />} />
              <Route path="/sports/volleyball" element={<VolleyballPage />} />
              <Route path="/sports/golf" element={<GolfPage />} />
              <Route path="/sports/tennis" element={<TennisPage />} />
              <Route path="/sports/track" element={<TrackPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <LanguageSwitcher />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
