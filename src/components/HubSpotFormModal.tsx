import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface HubSpotFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

const HubSpotFormModal = ({ open, onOpenChange }: HubSpotFormModalProps) => {
  const { t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!open) return;

    const loadForm = () => {
      if (formContainerRef.current && window.hbspt) {
        // Clear previous form
        formContainerRef.current.innerHTML = "";
        
        window.hbspt.forms.create({
          portalId: "50757411",
          formId: "16a71fa4-3618-420a-b755-0abff6c34759",
          region: "na1",
          target: "#hubspot-form-container",
        });
      }
    };

    if (scriptLoaded.current && window.hbspt) {
      loadForm();
      return;
    }

    // Load HubSpot script
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      loadForm();
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup is handled by clearing innerHTML on next open
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl sm:text-3xl text-center font-bold">
            {t("hero.cta")}
          </DialogTitle>
        </DialogHeader>
        <div
          id="hubspot-form-container"
          ref={formContainerRef}
          className="min-h-[300px] py-4"
        />
      </DialogContent>
    </Dialog>
  );
};

export default HubSpotFormModal;
