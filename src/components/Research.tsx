import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const works = [
  {
    title: "Insights from the Inverse: Reconstructing LLM Training Goals Through Inverse Reinforcement Learning",
    conference: "COLM 2025",
    description: "Understanding how LLM reward models can be reverse-engineered using inverse reinforcement learning to improve interpretability and alignment.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:9yKSN-GCB0IC",
    status: "Published",
  },
  {
    title: "ASTRID — An Automated and Scalable TRIaD for the Evaluation of RAG-based Clinical Question Answering Systems",
    conference: "ACL 2025",
    description: "Framework for evaluating retrieval-augmented generation (RAG) systems in clinical QA, focusing on safety, reliability, and scalability.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:UeHWp8X0CEIC",
    status: "Published",
  },
  {
    title: "Video Selection for Enjoyable Learning",
    conference: "CICE 2024",
    description: "Data-driven approach to optimizing educational video selection for improved learner engagement and enjoyment.",
    pdfUrl: "https://scholar.google.com/citations?user=1Eh35coAAAAJ",
    status: "Published",
  },
  {
    title: "On Presenters and Commenters in YouTube Climate Change Videos",
    conference: "ECSM 2024",
    description: "Analyzing how presenter style and audience interaction influence public engagement with climate change communication.",
    pdfUrl: "https://papers.academic-conferences.org/index.php/ecsm/article/view/2076",
    status: "Published",
  },
  {
    title: "Video Features Predicting Engagement in Climate Change Education",
    conference: "E3S Web of Conferences 2023",
    description: "Identifying which visual and content features in educational videos drive audience engagement and retention.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=1Eh35coAAAAJ&citation_for_view=1Eh35coAAAAJ:u-x6o8ySG0sC",
    status: "Published",
  },
  {
    title: "Collaborative Learning in YouTube: Under Which Conditions Can Learning Happen or Fail to Happen?",
    conference: "CSCL 2022",
    description: "Studying online collaborative learning dynamics to understand when and how digital discussions foster real learning outcomes.",
    pdfUrl: "https://repository.isls.org/handle/1/8363",
    status: "Published",
  },
  {
    title: "MATRIX: Multi-Agent simulaTion fRamework for safe Interactions and conteXtual clinical conversational evaluation",
    conference: "arXiv:2508.19163",
    description: "Structured multi-agent framework to evaluate safety and behaviour risks in clinical dialogue agents at scale.",
    pdfUrl: "https://arxiv.org/abs/2508.19163",
    status: "Preprint",
  },
  {
    title: "WER is Unaware: Assessing How ASR Errors Distort Clinical Understanding in Patient Facing Dialogue",
    conference: "arXiv:2511.16544",
    description: "Finds WER poorly reflects clinical risk from ASR errors and proposes an LLM judge (using DSPy + GEPA optimiser) matching clinician safety assessments.",
    pdfUrl: "https://arxiv.org/abs/2511.16544",
    status: "Preprint",
  },
];

const sections = [
  {
    heading: "Publications",
    filter: (work: (typeof works)[number]) => work.status === "Published",
  },
  {
    heading: "Preprints",
    filter: (work: (typeof works)[number]) => work.status === "Preprint",
  },
];

const Research = () => {
  return (
    <section id="research" className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-heading-option-3 text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
            Research
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </div>
        
        <div className="flex flex-col gap-12 fade-in-delay">
          {sections.map((section) => {
            const items = works.filter(section.filter);
            if (!items.length) return null;

            return (
              <div key={section.heading} className="space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-heading-option-3 font-semibold">{section.heading}</h3>
                </div>

                <div className="grid gap-6">
                  {items.map((paper, index) => (
                    <Card
                      key={`${section.heading}-${index}`}
                      className="group hover:shadow-card hover:-translate-y-1 hover:bg-secondary/5 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-secondary"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <CardTitle className="font-heading-option-3 text-xl group-hover:text-secondary transition-colors leading-tight">
                                {paper.title}
                              </CardTitle>
                              {paper.status === "Preprint" && (
                                <Badge variant="outline" className="text-xs">
                                  Preprint
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-sm font-semibold text-secondary/80">
                              {paper.conference}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors"
                              aria-label={paper.status === "Preprint" ? "View preprint on arXiv" : "View paper"}
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{paper.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;
