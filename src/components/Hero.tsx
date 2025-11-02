import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { Download } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10 section-container text-center fade-in">
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-gray-700 dark:text-white drop-shadow-lg">
          Jared Joselowitz
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
          AI Research Engineer — I work on LLMs in healthcare to design safe and steerable systems that serve real people
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            size="lg" 
            variant="default"
            onClick={() => scrollToSection('research')}
            className="min-w-[160px]"
          >
            Research
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => scrollToSection('photography')}
            className="min-w-[160px]"
          >
            Photography
          </Button>
        </div>
        
        <a 
          href="/cv.pdf" 
          download
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white transition-colors drop-shadow-md"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>
      </div>
    </section>
  );
};

export default Hero;
