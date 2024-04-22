import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="dark:bg-[#0D171E] h-full w-full flex flex-col gap-y-5 items-center justify-center">
      <h1 className="text-4xl">Hello, World!</h1>

      <Button variant="default" size="lg">
        Click me
      </Button>
    </main>
  );
};

export default HomePage;
