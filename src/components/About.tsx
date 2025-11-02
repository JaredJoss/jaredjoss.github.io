import profileImg from "@/assets/profile.jpeg";

const About = () => {
  return (
    <section id="about" className="section-container bg-card">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div className="fade-in">
          <div className="mb-6">
            <h2 className="font-heading-option-3 text-5xl font-bold mb-3 bg-gradient-to-r from-secondary to-foreground bg-clip-text text-transparent">
              About
            </h2>
            <div className="w-16 h-1 bg-secondary"></div>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I design and study large language models for healthcare applications, with a focus on reliability, interpretability, and safety. My research aims to make AI systems that clinicians can understand and trust — advancing both performance and accountability. I'm particularly interested in steerable LLMs that adapt to context while maintaining alignment with human values.
          </p>
        </div>
        
        <div className="fade-in-delay relative">
          <div className="aspect-square rounded-lg overflow-hidden shadow-card">
            <img 
              src={profileImg} 
              alt="Jared Joselowitz" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
