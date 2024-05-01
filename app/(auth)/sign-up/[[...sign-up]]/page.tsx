"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark : undefined;

  let textColor = "#FFFFFF";
  let bgColor = undefined; // Default background color

  if (theme === "light") {
    textColor = "#000000";
  } else if (theme === "dark") {
    bgColor = "#1f2937"; // Background color for dark mode
  }

  const signUpVariables = {
    colorPrimary: "#ffd800",
    colorBackground: bgColor, // Set background color based on theme
  };

  const signUpAppearance = {
    baseTheme: clerkTheme,
    variables: signUpVariables,
    text: {
      color: textColor
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <SignUp
        appearance={signUpAppearance}
        path="/sign-up"
      />
    </div>
  );
};

export default SignUpPage;
