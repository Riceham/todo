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
  const bgColor = theme === "dark" ? "#1f2937" : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-transparent p-0 flex items-center justify-center"
        moveCloseButtonRight
      >
        <div className={theme === "dark" ? "dark" : ""}>
          <UserProfile
            appearance={{
              baseTheme: clerkTheme,
              variables: {
                colorText: textColor,
                colorBackground: bgColor,
                colorInputBackground: bgColor,
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
