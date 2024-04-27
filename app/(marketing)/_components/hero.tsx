import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="md:py-20 py-16">
      <div className="container mx-auto text-center mt-10">
        <div className="text-6xl md:text-8xl lg:text-7xl xl:text-8xl flex justify-center font-bold md:px-20 pb-10 dark:bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text dark:text-transparent text-primary pt-19">
          Prepare for your school year
        </div>

        <p className="text-lg md:text-xl lg:text-2xl md-10 dark:bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text dark:text-transparent font-bold">
          Stay on top of your school year, schedule, prioritize tasks, and ace
          every exam with ease.
        </p>

        <div className="flex gap-4 justify-center pt-10">
          <Button size="xl" asChild>
            <Link href="#pricing">Try CountWave</Link>
          </Button>
        </div>

        <div className="pt-10">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/hero-video.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
