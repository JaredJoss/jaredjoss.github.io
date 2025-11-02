import { Mail, Linkedin, Github, GraduationCap } from "lucide-react";

const contacts = [
  { icon: Mail, href: "mailto:jaredjoss123@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jaredjoselowitz/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/JaredJoss", label: "GitHub" },
  { icon: GraduationCap, href: "https://scholar.google.com/citations?user=1Eh35coAAAAJ&hl=en&oi=ao", label: "Google Scholar" },
];

const Contact = () => {
  return (
    <section id="contact" className="section-container">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12 fade-in">
          <h2 className="font-heading-option-3 text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
            Contact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 fade-in-delay">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? "_blank" : undefined}
              rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-secondary/10 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-secondary/30"
              aria-label={contact.label}
            >
              <div className="p-3 rounded-full bg-secondary/10 dark:bg-secondary/25 group-hover:bg-secondary/20 dark:group-hover:bg-secondary/40 transition-colors">
                <contact.icon className="w-6 h-6 text-secondary/70 dark:text-white/90 group-hover:text-secondary dark:group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-medium text-muted-foreground dark:text-foreground/80 group-hover:text-secondary dark:group-hover:text-secondary transition-colors">
                {contact.label}
              </span>
            </a>
          ))}
        </div>
        
        <footer className="text-sm text-muted-foreground fade-in-delay">
        </footer>
      </div>
    </section>
  );
};

export default Contact;
