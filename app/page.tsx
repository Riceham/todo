import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="bg-[#0D171E] h-full w-full flex flex-col gap-y-5 items-center justify-center">
      <h1 className="text-white">Hello, World!</h1>

      <Button variant="secondary" size="lg">
        Click me
      </Button>
    </main>
  );
};

export default HomePage;
