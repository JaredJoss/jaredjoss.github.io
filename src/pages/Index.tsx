import { useState } from "react";
import ExperienceItem from "@/components/ExperienceItem";
import SocialLink from "@/components/SocialLink";
import Footer from "@/components/Footer";
import ScrambleText from "@/components/ScrambleText";
import CyclingScrambleText from "@/components/CyclingScrambleText";
import NoLightModePopup from "@/components/NoLightModePopup";
import CursorTrail from "@/components/CursorTrail";

const TITLES = [
  "research engineer", 
  "wildlife photographer",
  "26 years old",
  "south african",
  "llm researcher",
  "published author",
  "rlhf enthusiast",
  "clinical ai",
];

const PUBLICATIONS = [
  {
    year: "2025",
    venue: "COLM 2025",
    title: "Insights from the Inverse: Reconstructing LLM Training Goals Through Inverse Reinforcement Learning",
    description: "Understanding how LLM reward models can be reverse-engineered using inverse reinforcement learning to improve interpretability and alignment.",
    tags: ["#RLHF", "#Interpretability", "#LLM"],
    link: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:9yKSN-GCB0IC",
    status: "Published",
  },
  {
    year: "2025",
    venue: "ACL 2025",
    title: "ASTRID — An Automated and Scalable TRIaD for RAG Evaluation",
    description: "Framework for evaluating retrieval-augmented generation (RAG) systems in clinical QA, focusing on safety, reliability, and scalability.",
    tags: ["#RAG", "#Healthcare", "#Evaluation"],
    link: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:UeHWp8X0CEIC",
    status: "Published",
  },
  {
    year: "2025",
    venue: "arXiv Preprint",
    title: "MATRIX: Multi-Agent simulaTion fRamework for safe Interactions",
    description: "Structured multi-agent framework to evaluate safety and behaviour risks in clinical dialogue agents at scale.",
    tags: ["#MultiAgent", "#Safety", "#Healthcare"],
    link: "https://arxiv.org/abs/2508.19163",
    status: "Preprint",
  },
  {
    year: "2025",
    venue: "arXiv Preprint",
    title: "WER is Unaware: Assessing How ASR Errors Distort Clinical Understanding",
    description: "Finds WER poorly reflects clinical risk from ASR errors and proposes an LLM judge matching clinician safety assessments.",
    tags: ["#ASR", "#Clinical", "#Safety"],
    link: "https://arxiv.org/abs/2511.16544",
    status: "Preprint",
  },
  {
    year: "2024",
    venue: "CICE 2024",
    title: "Video Selection for Enjoyable Learning",
    description: "Data-driven approach to optimizing educational video selection for improved learner engagement and enjoyment.",
    tags: ["#Education", "#ML"],
    link: "https://scholar.google.com/citations?user=1Eh35coAAAAJ",
    status: "Published",
  },
  {
    year: "2024",
    venue: "ECSM 2024",
    title: "On Presenters and Commenters in YouTube Climate Change Videos",
    description: "Analyzing how presenter style and audience interaction influence public engagement with climate change communication.",
    tags: ["#NLP", "#Climate", "#Social Media"],
    link: "https://papers.academic-conferences.org/index.php/ecsm/article/view/2076",
    status: "Published",
  },
  {
    year: "2023",
    venue: "E3S Web of Conferences",
    title: "Video Features Predicting Engagement in Climate Change Education",
    description: "Identifying which visual and content features in educational videos drive audience engagement and retention.",
    tags: ["#Education", "#Climate"],
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=1Eh35coAAAAJ&citation_for_view=1Eh35coAAAAJ:u-x6o8ySG0sC",
    status: "Published",
  },
  {
    year: "2022",
    venue: "CSCL 2022",
    title: "Collaborative Learning in YouTube: Under Which Conditions Can Learning Happen?",
    description: "Studying online collaborative learning dynamics to understand when and how digital discussions foster real learning outcomes.",
    tags: ["#Education", "#Collaboration"],
    link: "https://repository.isls.org/handle/1/8363",
    status: "Published",
  },
];

// To add your own photos:
// 1. Create folder: public/photos/
// 2. Add your images there
// 3. Update the src paths below to "/photos/your-image.jpg"
const PHOTOS = [
  {
    src: "/photos/zebra.jpeg",  // Replace with your actual photo path
    title: "Zebra",
    meta: "ISO 400 • F/2.8 • 1/1000s",  // Update with your actual camera settings
  },
  {
    src: "/photos/malachite_kingfisher.jpeg",
    title: "Malachite Kingfisher", 
    meta: "ISO 800 • F/4.0 • 1/2000s",
  },
  {
    src: "/photos/lion.jpeg",
    title: "Lion",
    meta: "ISO 200 • F/5.6 • 1/500s",
  },
  {
    src: "/photos/baby_baboon.jpeg",
    title: "Infant Baboon",
    meta: "ISO 100 • F/8.0 • 1/250s",
  },
  {
    src: "/photos/crocodile.jpeg",
    title: "Crocodile",
    meta: "ISO 200 • F/5.6 • 1/500s",
  },
  {
    src: "/photos/leopard.jpeg",
    title: "Leopard",
    meta: "ISO 200 • F/5.6 • 1/500s",
  }
];

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-foreground font-mono">
      <CursorTrail />
      
      {/* Theme toggle in corner */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-[calc(10%+2rem)] z-50">
        <button 
          onClick={() => setShowPopup(true)}
          className="text-foreground hover:text-primary transition-colors text-lg sm:text-xl p-2"
        >
          ☾
        </button>
        <NoLightModePopup open={showPopup} onClose={() => setShowPopup(false)} />
      </div>

      {/* Hero Section */}
      <section className="h-screen relative flex flex-col">
        <main className="px-4 sm:px-8 pt-20 sm:pt-32 pb-24 sm:pb-20 max-w-2xl flex-1 sm:mx-[10%]">
          {/* Introduction */}
          <div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-8">
            <p className="text-muted-foreground text-xs sm:text-base">
              <ScrambleText text="howzit, i'm" />
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
              <ScrambleText text="jared joselowitz" />
            </h1>
            <div className="flex items-center gap-2 text-primary text-xs sm:text-base">
              <span className="animate-blink">{">"}</span>
              <CyclingScrambleText texts={TITLES} interval={3500} />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-5 sm:space-y-6">
            {/* Currently */}
            <div className="space-y-2 sm:space-y-2">
              <p className="text-muted-foreground text-sm">
                <ScrambleText text="currently" />
              </p>
              <ExperienceItem
                role="ai research engineer"
                company="ufonia"
                companyIcon="https://www.google.com/s2/favicons?domain=ufonia.com&sz=32"
                companyUrl="http://www.ufonia.com/"
              />
            </div>

            {/* Previously */}
            <div className="space-y-2 sm:space-y-2">
              <p className="text-muted-foreground text-sm">
                <ScrambleText text="previously" />
              </p>
              <ExperienceItem
                role="data scientist"
                company="the awareness company"
                companyIcon="https://www.google.com/s2/favicons?domain=awarenesscompany.co.za&sz=32"
                companyUrl="https://awarenesscompany.co.za/"
              />
              <ExperienceItem
                role="software engineer"
                company="tesserae"
                companyIcon="https://www.google.com/s2/favicons?domain=tesserae.co&sz=32"
                companyUrl="https://www.tesserae.co/"
              />
            </div>

            {/* Education */}
            <div className="space-y-2 sm:space-y-2">
              <p className="text-muted-foreground text-sm">
                <ScrambleText text="education" />
              </p>
              <ExperienceItem
                role="msc applied ml"
                company="imperial college london"
                companyIcon="https://www.google.com/s2/favicons?domain=imperial.ac.uk&sz=32"
                companyUrl="https://www.imperial.ac.uk/"
              />
              <ExperienceItem
                role="bsc electrical engineering"
                company="wits"
                companyIcon="https://www.google.com/s2/favicons?domain=wits.ac.za&sz=32"
                companyUrl="https://www.wits.ac.za/"
              />
            </div>

            {/* Social Links */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-base">
              <SocialLink label="email" href="mailto:jaredjoss123@gmail.com" />
              <SocialLink label="linkedin" href="https://www.linkedin.com/in/jaredjoselowitz/" />
              <SocialLink label="github" href="https://github.com/JaredJoss" />
              <SocialLink label="scholar" href="https://scholar.google.com/citations?user=1Eh35coAAAAJ&hl=en&oi=ao" />
            </div>
          </div>
        </main>

        {/* Scroll Indicator - desktop only */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2">
          <button 
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-primary transition-colors animate-bounce-slow"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
        </div>

        {/* Subtle gradient fade on mobile to hint at more content */}
        <div className="sm:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none"></div>

        {/* Footer - only on hero section */}
        <Footer />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen px-4 sm:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="text-primary font-medium text-sm sm:text-base">01.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="section-border-left space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground max-w-2xl">
          <p>
            I design and study large language models for healthcare applications, with a focus on{" "}
            <span className="text-foreground">reliability</span>,{" "}
            <span className="text-foreground">interpretability</span>, and{" "}
            <span className="text-foreground">safety</span>.
          </p>
          <p>
            My research aims to make AI systems that clinicians can understand and trust — advancing both 
            performance and accountability. I'm particularly interested in{" "}
            <span className="text-primary">steerable LLMs</span> that adapt to context while maintaining 
            alignment with human values.
          </p>
        </div>
      </section>

      {/* Research & Publications Section */}
      <section id="research" className="min-h-screen px-4 sm:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="text-primary font-medium text-sm sm:text-base">02.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Research & Publications</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="space-y-6">
          {PUBLICATIONS.map((pub, index) => (
            <div key={index} className="publication-card">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-lg">📄</span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium">
                  {pub.year}
                </span>
                <span className="text-muted-foreground text-sm">{pub.venue}</span>
                {pub.status === "Preprint" && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-medium">
                    Preprint
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {pub.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {pub.description}
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-2 flex-wrap">
                  {pub.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-border px-4 py-2 rounded hover:border-primary hover:text-primary transition-colors"
                >
                  Read Paper ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="min-h-screen px-4 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="text-primary font-medium text-sm sm:text-base">03.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Photography</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="mb-6 sm:mb-8">
          <code className="text-muted-foreground text-xs sm:text-sm">
            perspective: <span className="text-primary font-medium">str</span> = <span className="text-primary">"wildlife"</span>
          </code>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
            Wildlife photography helps me think differently about perception and adaptation — qualities 
            central to both natural and artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PHOTOS.map((photo, index) => (
            <div key={index} className="photo-card group">
              <img 
                src={photo.src} 
                alt={photo.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h4 className="text-foreground font-medium">{photo.title}</h4>
                <p className="text-primary text-sm">{photo.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
