import { useState, useCallback } from "react";

export const useHubSpotForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openForm,
    closeForm,
    setIsOpen,
  };
};
