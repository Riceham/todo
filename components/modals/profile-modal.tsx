"use client";

import { UserProfile } from "@clerk/nextjs";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProfile } from "@/hooks/use-profile";

export const ProfileModal = () => {
  const { isOpen, onClose } = useProfile();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white h-full w-fit">
        <UserProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
