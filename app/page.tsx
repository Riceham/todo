import Carousel from "@/components/carousel";
import Firstsection from "./firstsection/page";
import Navbar from "./navbar/page";
import FifthSection from "./fifthsection/page";
import Footer from "./footer/page";
import FourthSection from "./fourthsection/page";
import SixthSection from "./sixthsection/page";
import ThirdSection from "./thirdsection/page";
import SecondSection from "./secondsection/page";
import Pricing from "./pricing/page";

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
