import About from "./About";
import HowWeWork from "./HowWeWork";
import Slider from "./Slide";
import Quote from "./Quote";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
export default function Home() {
  return (
    <>
      <div>
        <Slider />
        <About />
        <HowWeWork />
        <Quote />
      </div>
    </>
  );
}
