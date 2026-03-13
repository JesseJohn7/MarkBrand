import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
/* import Gallery from "@/components/Gallery"; */
import Services from "@/components/Services"
import Footer from "@/components/Footer"
export default function Home() {
  return (
        <>
          <Navbar/>
            <Hero/>
            <AboutSection/>
            {/* <Gallery/> */}
            <Services/>
            <Footer/>
        </>
  );
}
