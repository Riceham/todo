import { Features } from "./_components/features";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";

const MarketingPage = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
};

export default MarketingPage;
