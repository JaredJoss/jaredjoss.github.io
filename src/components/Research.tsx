import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const papers = [
  {
    title: "Insights from the Inverse: Reconstructing LLM Training Goals Through Inverse Reinforcement Learning",
    conference: "COLM 2025",
    description: "Understanding how LLM reward models can be reverse-engineered using inverse reinforcement learning to improve interpretability and alignment.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:9yKSN-GCB0IC",
  },
  {
    title: "ASTRID — An Automated and Scalable TRIaD for the Evaluation of RAG-based Clinical Question Answering Systems",
    conference: "ACL 2025 (Findings)",
    description: "Framework for evaluating retrieval-augmented generation (RAG) systems in clinical QA, focusing on safety, reliability, and scalability.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1Eh35coAAAAJ:UeHWp8X0CEIC",
  },
  {
    title: "Video Selection for Enjoyable Learning",
    conference: "CICE 2024",
    description: "Data-driven approach to optimizing educational video selection for improved learner engagement and enjoyment.",
    pdfUrl: "https://scholar.google.com/citations?user=1Eh35coAAAAJ",
  },
  {
    title: "On Presenters and Commenters in YouTube Climate Change Videos",
    conference: "ECSM 2024",
    description: "Analyzing how presenter style and audience interaction influence public engagement with climate change communication.",
    pdfUrl: "https://papers.academic-conferences.org/index.php/ecsm/article/view/2076",
  },
  {
    title: "Video Features Predicting Engagement in Climate Change Education",
    conference: "E3S Web of Conferences 2023",
    description: "Identifying which visual and content features in educational videos drive audience engagement and retention.",
    pdfUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=1Eh35coAAAAJ&citation_for_view=1Eh35coAAAAJ:u-x6o8ySG0sC",
  },
  {
    title: "Collaborative Learning in YouTube: Under Which Conditions Can Learning Happen or Fail to Happen?",
    conference: "CSCL 2022",
    description: "Studying online collaborative learning dynamics to understand when and how digital discussions foster real learning outcomes.",
    pdfUrl: "https://repository.isls.org/handle/1/8363",
  },
];

const Research = () => {
  return (
    <section id="research" className="section-container">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-12 text-center fade-in">Publications</h2>
        
        <div className="grid gap-6 fade-in-delay">
          {papers.map((paper, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card hover:-translate-y-1 hover:bg-secondary/5 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="font-heading text-xl mb-2 group-hover:text-secondary transition-colors">
                      {paper.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium">
                      {paper.conference}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="View Paper"
                    >
                      <ExternalLink className="w-4 h-4" />
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
    </section>
  );
};

export default Research;
