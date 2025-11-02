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
        <h2 className="font-heading text-4xl font-bold mb-12 fade-in">Contact</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 fade-in-delay">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-muted transition-colors group"
              aria-label={contact.label}
            >
              <contact.icon className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
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
