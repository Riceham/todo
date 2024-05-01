import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";

import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";

const MarketingPage = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Features />

      <Separator className="mb-12" />

      <Pricing />

      <Footer />

      <aside>
        <ThemeSwitch />
      </aside>
    </main>
  );
};

export default MarketingPage;
