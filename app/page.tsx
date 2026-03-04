import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import Team from "@/components/Team";
export default function Home() {
  return (
        <>
          <Navbar/>
            <Hero/>
            <AboutSection/>
            <Team/>
        </>
  );
}
