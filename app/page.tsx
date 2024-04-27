import Firstsection from "./firstsection/page";
import Navbar from "./navbar/page";
import Pricing from "./pricing/page";
import SixthSection from "./sixthsection/page";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#141414" }}>
      <Navbar />
      <Firstsection />
      <SixthSection />
      <Pricing />
    </div>
  );
};

export default Home;
