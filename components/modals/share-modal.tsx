"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShare } from "@/hooks/use-share";

export const ShareModal = () => {
  const { isOpen, onClose } = useShare();

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inviteUrl = "http://localhost:3000/preview/TODO-LIST-ID";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Share Todo List
          </DialogTitle>

          <DialogDescription className="text-center font-semibold text-zinc-500">
            Share your to-do lists with friends or team members.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500">
            Link
          </Label>

          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/30 dark:bg-zinc-300/10 text-black dark:text-white cursor-pointer pointer-events-none"
              tabIndex={-1}
              value={inviteUrl}
              disabled={isLoading}
              aria-disabled
            />
            <Hint
              side="left"
              sideOffset={12}
              description={isCopied ? "Copied" : "Copy to clipboard"}
            >
              <Button
                disabled={isLoading || isCopied}
                aria-disabled={isLoading || isCopied}
                onClick={onCopy}
                size="icon"
              >
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </Hint>
          </div>

          <Button
            disabled={isLoading}
            aria-disabled={isLoading}
            onClick={() => {}}
            variant="link"
            size="sm"
            className="group text-xs text-zinc-500 mt-4 dark:hover:text-zinc-400 hover:text-zinc-600 transition"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2 group-hover:rotate-90 transition" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
