import { Fragment, useState, type ReactNode } from "react";
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

// Shown highlighted in each author line.
const ME = "J. Joselowitz";

type Publication = {
  year: string;
  venue: string;
  title: string;
  authors: string[];
  description: ReactNode;
  tags: string[];
  link: string;
  status: string;
  presentation?: string;
  codeLink?: string;
};

const PUBLICATIONS: Publication[] = [
  {
    year: "2026",
    venue: "RTCA Workshop @ NeurIPS 2026",
    title: "From Text to Voice: How Real-Time Pipelines Change Interruption Recovery in Cascaded Clinical Agents",
    authors: ["Z. Ellis", "S. Thio", "Y. Zhou", "Y. V. He", "A. Michael", "J. Joselowitz"],
    description: (
      <>
        Replays the same clinical <span className="text-foreground/80 font-medium">interruption</span> in text and through a live{" "}
        <span className="text-foreground/80 font-medium">cascaded voice pipeline</span>, and finds that one or two words committed after the patient starts speaking can flip the{" "}
        <span className="text-foreground/80 font-medium">safety verdict</span>.
      </>
    ),
    tags: ["#VoiceAI", "#Clinical", "#Safety"],
    link: "https://openreview.net/forum?id=ez6dvTCMby",
    status: "Published",
    presentation: "Oral",
  },
  {
    year: "2026",
    venue: "ML4H 2026 · GenAI4Health @ NeurIPS 2026",
    title: "Does the Voice Matter? Evaluating Frustration Detection on Deployed Clinical Voice-Agent Calls",
    authors: ["A. Michael", "Z. Ellis", "Y. Zhou", "S. Thio", "Y. V. He", "S. Hazel", "J. Joselowitz"],
    description: (
      <>
        Tests per-turn <span className="text-foreground/80 font-medium">frustration detection</span> on real calls from a deployed clinical voice agent. About 59% of patient turns are{" "}
        <span className="text-foreground/80 font-medium">one or two words</span>, where transcript-only detection does not exclude chance, and whether{" "}
        <span className="text-foreground/80 font-medium">audio</span> helps depends on the model and the instruction.
      </>
    ),
    tags: ["#VoiceAI", "#Clinical", "#Evaluation"],
    link: "https://arxiv.org/abs/2611.21001",
    status: "Published",
  },
  {
    year: "2026",
    venue: "VLM4RWD Workshop @ NeurIPS 2026",
    title: "Same Eye, Different Scanner: A Decision-Reliability Benchmark for Frontier VLMs and OCT Foundation Models in Glaucoma",
    authors: ["H. Li", "J. Joselowitz", "Z. Ellis", "Y. Zhou", "S. Thio", "A. Higham", "Y. V. He"],
    description: (
      <>
        Benchmarks whether <span className="text-foreground/80 font-medium">frontier VLMs</span> and{" "}
        <span className="text-foreground/80 font-medium">OCT foundation models</span> keep the same glaucoma decision for the same eye when the{" "}
        <span className="text-foreground/80 font-medium">scanner changes</span>, scoring decision flips, sensitivity change and calibration.
      </>
    ),
    tags: ["#VLM", "#Ophthalmology", "#Evaluation"],
    link: "https://openreview.net/forum?id=1I9Pfkv8dY",
    status: "Published",
  },
  {
    year: "2026",
    venue: "TAE Workshop @ NeurIPS 2026",
    title: "The Camera, the Split, and the Label: A Three-Check Audit of Glaucoma-Progression Prediction",
    authors: ["H. Li", "J. Joselowitz", "Z. Ellis", "Y. Zhou", "S. Thio", "A. Higham", "Y. V. He"],
    description: (
      <>
        Audits <span className="text-foreground/80 font-medium">glaucoma-progression</span> results on the public GRAPE benchmark with{" "}
        <span className="text-foreground/80 font-medium">three checks</span>: a device-only baseline, a patient-grouped split and an input-label overlap test. At this sample size, none of the reported numbers can be distinguished from a{" "}
        <span className="text-foreground/80 font-medium">trivial baseline</span>.
      </>
    ),
    tags: ["#Evaluation", "#Ophthalmology", "#Reproducibility"],
    link: "https://openreview.net/forum?id=AJbpzv4COc",
    status: "Published",
  },
  {
    year: "2026",
    venue: "EMNLP 2026 Findings",
    title: "When Patients Cut In: Extending Clinical Conversational AI Safety to Interruptions",
    authors: ["Z. Ellis", "S. Hazel", "A. Brandt", "E. Lim", "Y. V. He", "J. Joselowitz"],
    description: (
      <>
        Evaluating whether <span className="text-foreground/80 font-medium">clinical voice agents</span> can recover when patients{" "}
        <span className="text-foreground/80 font-medium">interrupt</span> mid-utterance, using conversation-analytic interruption categories and{" "}
        <span className="text-foreground/80 font-medium">LLM judges</span> to score recovery against required clinical content.
      </>
    ),
    tags: ["#VoiceAI", "#Clinical", "#Safety"],
    link: "https://aclanthology.org/2026.findings-emnlp.2456/",
    status: "Published",
    presentation: "Oral at DAIH @ COLM 2026",
  },
  {
    year: "2026",
    venue: "DAIH Workshop @ COLM 2026",
    title: "When the Language Changes, Is It Still Safe? Multilingual Evaluation of Clinical Voice Agents",
    authors: ["Z. Ellis", "J. Joselowitz", "Y. V. He"],
    description: (
      <>
        Adapts <span className="text-foreground/80 font-medium">MATRIX</span> to English, French, Polish and Urdu.{" "}
        <span className="text-foreground/80 font-medium">Emergency handling</span> holds in all four languages, while symptom coverage and follow-up{" "}
        <span className="text-foreground/80 font-medium">degrade unevenly</span> across models and languages.
      </>
    ),
    tags: ["#Multilingual", "#VoiceAI", "#Safety"],
    link: "https://openreview.net/forum?id=mfgdFCAplv",
    status: "Published",
  },
  {
    year: "2026",
    venue: "IWSDS 2026",
    title: "WER is Unaware: Assessing How ASR Errors Distort Clinical Understanding",
    authors: ["Z. Ellis", "J. Joselowitz", "Y. Deo", "Y. He", "A. Kalygina", "A. Higham", "M. Rahimzadeh", "Y. Jia", "I. Habli", "E. Lim"],
    description: (
      <>
        Finds <span className="text-foreground/80 font-medium">WER</span> poorly reflects{" "}
        <span className="text-foreground/80 font-medium">clinical risk</span> from ASR errors and proposes an <span className="text-foreground/80 font-medium">LLM judge</span> matching clinician safety assessments.
      </>
    ),
    tags: ["#ASR", "#Clinical", "#Safety", "#GEPA"],
    link: "https://aclanthology.org/2026.iwsds-1.39/",
    status: "Published",
    presentation: "Oral",
    codeLink: "https://github.com/Ufonia/wer-is-unaware",
  },
  {
    year: "2025",
    venue: "COLM 2025",
    title: "Insights from the Inverse: Reconstructing LLM Training Goals Through Inverse Reinforcement Learning",
    authors: ["J. Joselowitz", "R. Majumdar", "A. Jagota", "M. Bou", "N. Patel", "S. Krishna", "S. Parbhoo"],
    description: (
      <>
        Understanding how LLM reward models can be reverse-engineered using{" "}
        <span className="text-foreground/80 font-medium">inverse reinforcement learning</span>{" "}
        to improve <span className="text-foreground/80 font-medium">interpretability</span> and <span className="text-foreground/80 font-medium">alignment</span>.
      </>
    ),
    tags: ["#RLHF", "#Interpretability", "#LLM"],
    link: "https://arxiv.org/abs/2410.12491",
    status: "Published",
    codeLink: "https://github.com/ai4ai-lab/irl_for_llms",
  },
  {
    year: "2025",
    venue: "ACL 2025",
    title: "ASTRID — An Automated and Scalable TRIaD for RAG Evaluation",
    authors: ["Y. V. He", "M. Chowdhury", "J. Joselowitz", "A. Higham", "E. Lim"],
    description: (
      <>
        Framework for evaluating <span className="text-foreground/80 font-medium">retrieval-augmented generation (RAG)</span> systems in clinical QA, focusing on{" "}
        <span className="text-foreground/80 font-medium">safety</span>,{" "}
        <span className="text-foreground/80 font-medium">reliability</span>, and scalability.
      </>
    ),
    tags: ["#RAG", "#Healthcare", "#Evaluation"],
    link: "https://aclanthology.org/2025.findings-acl.857/",
    status: "Published",
  },
  {
    year: "2025",
    venue: "arXiv",
    title: "MATRIX: Multi-Agent simulaTion fRamework for safe Interactions",
    authors: ["E. Lim", "Y. V. He", "J. Joselowitz", "K. Preston", "M. Chowdhury", "L. Williams", "A. Higham", "K. Mason", "M. Melo", "T. Lawton", "Y. Jia", "I. Habli"],
    description: (
      <>
        Structured <span className="text-foreground/80 font-medium">multi-agent</span> framework to evaluate{" "}
        <span className="text-foreground/80 font-medium">safety</span> and behaviour risks in clinical dialogue agents at scale.
      </>
    ),
    tags: ["#MultiAgent", "#Safety", "#Healthcare"],
    link: "https://arxiv.org/abs/2508.19163",
    status: "Preprint",
  },
];

// Older papers, shown as a compact list under the publication cards.
type EarlierWork = {
  year: string;
  venue: string;
  title: string;
  link: string;
};

const EARLIER_WORK: EarlierWork[] = [
  {
    year: "2024",
    venue: "CICE 2024",
    title: "Video Selection for Enjoyable Learning",
    link: "https://doi.org/10.20533/cice.2024.0052",
  },
  {
    year: "2024",
    venue: "ECSM 2024",
    title: "On Presenters and Commenters in YouTube Climate Change Videos",
    link: "https://papers.academic-conferences.org/index.php/ecsm/article/view/2076",
  },
  {
    year: "2023",
    venue: "E3S Web of Conferences",
    title: "Video Features Predicting Engagement in Climate Change Education",
    link: "https://doi.org/10.1051/e3sconf/202343606009",
  },
  {
    year: "2022",
    venue: "CSCL 2022",
    title: "Collaborative Learning in YouTube: Under Which Conditions Can Learning Happen?",
    link: "https://repository.isls.org/handle/1/8363",
  },
];

type Talk = {
  date: string;
  venue: string;
  title: string;
  description: string;
  link: string;
};

const TALKS: Talk[] = [
  {
    date: "June 2026",
    venue: "AI Engineer World's Fair 2026 · San Francisco",
    title: "Shipping AI to a Million Patients Without an A/B Test",
    description:
      "How Ufonia ships and keeps improving a regulated clinical voice agent without A/B testing on patients: simulate the highest-risk scenarios at scale, then improve it with reproducible, auditable prompt optimisation, using simulation as the release gate.",
    link: "https://youtu.be/McknwOzbmyg",
  },
];

// To add your own photos:
// 1. Create folder: public/photos/
// 2. Add your images there
// 3. Update the src paths below to "/photos/your-image.jpg"
const PHOTOS = [
  {
    src: "/photos/zebra.jpeg",  // Replace with your actual photo path
    meta: "ISO 400 • F/2.8 • 1/1000s",  // Update with your actual camera settings
  },
  {
    src: "/photos/malachite_kingfisher.jpeg",
    meta: "ISO 800 • F/4.0 • 1/2000s",
  },
  {
    src: "/photos/lion.jpeg",
    meta: "ISO 200 • F/5.6 • 1/500s",
  },
  {
    src: "/photos/baby_baboon.jpeg",
    meta: "ISO 100 • F/8.0 • 1/250s",
  },
  {
    src: "/photos/crocodile.jpeg",
    meta: "ISO 200 • F/5.6 • 1/500s",
  },
  {
    src: "/photos/leopard.jpeg",
    meta: "ISO 200 • F/5.6 • 1/500s",
  }
];

// Venue parts are separated by " · ". On phones each part gets its own line and
// the separator is hidden, so a long venue never breaks in the middle of a part.
const VenueLine = ({ venue }: { venue: string }) => {
  const parts = venue.split(" · ");
  return (
    <span className="text-muted-foreground text-sm">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="hidden sm:inline">{" · "}</span>}
          <span className="block sm:inline">{part}</span>
        </Fragment>
      ))}
    </span>
  );
};

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const linkButtonClass =
    "group inline-flex items-center gap-2 text-sm text-muted-foreground border border-border/70 rounded-xl px-4 py-2 bg-background/60 transition-colors duration-200";

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
          <div className="space-y-0.5 sm:space-y-1 mb-9 sm:mb-8">
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
      <section id="about" className="px-4 sm:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="text-primary font-medium text-sm sm:text-base">01.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <div className="section-border-left space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground">
              <p>
                I'm an AI research engineer at Ufonia, working on{" "}
                <span className="text-foreground">safety evaluation</span> for{" "}
                <span className="text-primary">clinical voice agents</span>. My research covers{" "}
                <span className="whitespace-nowrap">multi-agent</span> simulation,{" "}
                <span className="whitespace-nowrap">LLM-as-judge</span> methods validated against clinicians, and
                how speech recognition errors and patient interruptions affect{" "}
                <span className="whitespace-nowrap">clinical safety</span>.
              </p>
              <p>
                Before Ufonia, I completed an MSc in Applied Machine Learning at Imperial College London, where
                my thesis used <span className="text-foreground">inverse reinforcement learning</span> to recover
                the reward models of <span className="whitespace-nowrap">RLHF-trained</span> LLMs.
              </p>
            </div>
          </div>
          <div className="md:col-span-1 flex flex-col items-center justify-between">
            <img src="/profile.jpeg" alt="Jared Joselowitz" className="rounded-lg w-64 h-64 object-cover mb-4"/>
            <a href="/research_cv.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm text-muted-foreground border border-border/70 rounded-xl px-4 py-2 bg-background/60 transition-colors duration-200">
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Research & Publications Section */}
      <section id="research" className="px-4 sm:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 max-w-4xl mx-auto">
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
                <VenueLine venue={pub.venue} />
                {pub.status === "Preprint" && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-medium">
                    Preprint
                  </span>
                )}
                {pub.presentation && (
                  <span className="bg-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded font-medium">
                    {pub.presentation}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {pub.title}
              </h3>

              <p className="text-muted-foreground text-xs mb-3">
                {pub.authors.map((author, i) => (
                  <Fragment key={i}>
                    {i > 0 && ", "}
                    <span className={author === ME ? "text-foreground font-medium whitespace-nowrap" : "whitespace-nowrap"}>
                      {author}
                    </span>
                  </Fragment>
                ))}
              </p>

              <p className="text-muted-foreground text-sm mb-4">
                {pub.description}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2 flex-wrap">
                  {pub.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {pub.codeLink && (
                    <a
                      href={pub.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkButtonClass}
                    >
                      <span>View Code</span>
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-colors duration-200"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </a>
                  )}
                  <a 
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkButtonClass}
                  >
                    <span>Read Paper</span>
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-colors duration-200"
                    >
                      <path d="M7 17l9-9" />
                      <path d="M10 8h6v6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Earlier work: compact list, no descriptions */}
        <div className="mt-10 sm:mt-12">
          <h3 className="text-muted-foreground text-sm mb-3">Earlier work</h3>
          <ul className="bg-card/50 border border-border/50 rounded-lg px-4 sm:px-6 py-1 divide-y divide-border/50">
            {EARLIER_WORK.map((item) => (
              <li key={item.title}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 sm:gap-4 py-3.5"
                >
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium shrink-0">
                    {item.year}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm text-foreground/90 transition-colors duration-200 group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">{item.venue}</span>
                  </span>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 mt-1 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                  >
                    <path d="M7 17l9-9" />
                    <path d="M10 8h6v6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Talks Section */}
      <section id="talks" className="px-4 sm:px-8 pt-8 sm:pt-12 pb-8 sm:pb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="text-primary font-medium text-sm sm:text-base">03.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Talks</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="space-y-6">
          {TALKS.map((talk, index) => (
            <div key={index} className="publication-card">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-lg">🎤</span>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium">
                  {talk.date}
                </span>
                <VenueLine venue={talk.venue} />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {talk.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {talk.description}
              </p>

              <div className="flex items-center justify-end">
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkButtonClass}
                >
                  <span>Watch Talk</span>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-200"
                  >
                    <path d="M7 17l9-9" />
                    <path d="M10 8h6v6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="px-4 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="text-primary font-medium text-sm sm:text-base">04.</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Photography</h2>
          <div className="flex-1 h-px bg-border ml-2 sm:ml-4"></div>
        </div>

        <div className="mb-6 sm:mb-8">
          <code className="text-muted-foreground text-xs sm:text-sm">
            perspective: <span className="text-primary font-medium">str</span> = <span className="text-primary">"wildlife"</span>
          </code>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
            Wildlife photography helps me think differently about perception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PHOTOS.map((photo, index) => (
            <div key={index} className="photo-card group">
              <img 
                src={photo.src} 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
