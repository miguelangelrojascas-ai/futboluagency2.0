"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * The client-side shell that used to live in App.tsx.
 *
 * Only the tooltip provider survives from the old stack: react-query, the
 * toaster and sonner were mounted there but nothing in the site ever used them.
 */
const Providers = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>
    {children}
    <LanguageSwitcher />
  </TooltipProvider>
);

export default Providers;
