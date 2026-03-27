import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import USA from "./pages/USA";
import Spain from "./pages/Spain";
import Players from "./pages/Players";
import About from "./pages/About";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/usa" element={<USA />} />
            <Route path="/spain" element={<Spain />} />
            <Route path="/players" element={<Players />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <LanguageSwitcher />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
