import About from "./About";
import HowWeWork from "./HowWeWork";
// import Slider from "./Slide";
import Quote from "./Quote";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import HeroBanner from "./Slide";
export default function Home() {
  return (
    <>
      <div>
        <HeroBanner />
        <About />
        <HowWeWork />
        <Quote />
      </div>
    </>
  );
}
