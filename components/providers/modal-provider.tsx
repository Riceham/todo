"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
import { ShareModal } from "@/components/modals/share-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <ShareModal />
    </>
  );
};
