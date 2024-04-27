import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { Pricing } from "./_components/pricing";
import { Features } from "./_components/features";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#141414" }}>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;
