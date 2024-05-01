import { UserProfile } from "@clerk/nextjs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProfile } from "@/hooks/use-profile";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const ProfileModal = () => {
  const { isOpen, onClose } = useProfile();
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark : undefined;
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="right-0">
      <DialogContent className="bg-transparent p-0 flex items-center justify-center">
        <div className={theme === "dark" ? "dark" : ""}>
          <UserProfile
            appearance={{
              baseTheme: clerkTheme,
              variables: {
                colorText: textColor
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
