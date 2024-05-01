"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const SignInPage = () => {
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark : undefined;

  let textColor = "#FFFFFF";
  let bgColor = undefined; // Default background color

  if (theme === "light") {
    textColor = "#000000";
  } else if (theme === "dark") {
    bgColor = "#1f2937"; // Background color for dark mode
  }

  const signInVariables = {
    colorPrimary: "#ffd800",
    colorBackground: bgColor, // Set background color based on theme
  };

  const signInAppearance = {
    baseTheme: clerkTheme,
    variables: signInVariables,
    text: {
      color: textColor
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <SignIn
        appearance={signInAppearance}
        path="/sign-in"
      />
    </div>
  );
};

export default SignInPage;
