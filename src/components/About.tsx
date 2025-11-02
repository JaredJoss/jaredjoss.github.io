import profileImg from "@/assets/profile.jpg";

const About = () => {
  return (
    <section id="about" className="section-container bg-card">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
        <div className="fade-in">
          <h2 className="font-heading text-4xl font-bold mb-6">About</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I build and study AI systems that learn from context — training agents to understand and adapt through interaction. My research focuses on contextual learning, multi-agent systems, and the emergence of intelligent behavior. Outside of research, I spend time in the field photographing wildlife — a reminder that perception and adaptation are deeply human and natural. Both pursuits teach me about intelligence: one through code, the other through observation.
          </p>
        </div>
        
        <div className="fade-in-delay relative">
          <div className="aspect-square rounded-lg overflow-hidden shadow-card">
            <img 
              src={profileImg} 
              alt="Alex Chen" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
