import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyMentoring from "@/components/WhyMentoring";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyMentoring />
        <Services />
        <About />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
