import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const papers = [
  {
    title: "Context-Aware Multi-Agent Learning in Dynamic Environments",
    conference: "NeurIPS 2025",
    description: "Novel approach to adaptive agent behavior using contextual embeddings",
    pdfUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Emergent Communication Through Interaction",
    conference: "ICLR 2025",
    description: "Studying how agents develop shared protocols through environmental interaction",
    pdfUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Hierarchical Attention Mechanisms for Long-Context Learning",
    conference: "ICML 2024",
    description: "Efficient attention architectures for processing extended contextual information",
    pdfUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Transfer Learning in Multi-Agent Systems",
    conference: "AAMAS 2024",
    description: "Cross-domain knowledge transfer for collaborative agent training",
    pdfUrl: "#",
    githubUrl: "#",
  },
];

const Research = () => {
  return (
    <section id="research" className="section-container">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-12 text-center fade-in">Research</h2>
        
        <div className="grid gap-6 fade-in-delay">
          {papers.map((paper, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card transition-all duration-300"
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
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="View PDF"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a 
                      href={paper.githubUrl}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
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
