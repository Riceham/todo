import { SignIn } from "@clerk/nextjs";

export const SignInPage = () => {
  return <SignIn path="/sign-in" />;
};
