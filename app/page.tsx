import { Footer, Navbar, Services, Welcome, } from "./components";
import Benefits from "./components/Benefits";
import ButtonGradient from "./components/ButtonGradient";

export default function Home() {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Navbar />
        <Welcome />
        <Benefits />
        <Services/>
        <Footer />
      </div>

      <ButtonGradient />
      {/* <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Footer />
    </div> */}
    </>
  );
}
