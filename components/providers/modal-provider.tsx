"use client";

import { useEffect, useState } from "react";

import { CreateWorkspaceModal } from "@/components/modals/create-workspace";
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
      <CreateWorkspaceModal />
    </>
  );
};
