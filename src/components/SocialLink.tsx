import ScrambleText from "@/components/ScrambleText";

interface SocialLinkProps {
  label: string;
  href: string;
}

const SocialLink = ({ label, href }: SocialLinkProps) => {
  const isMailto = href.startsWith("mailto:");
  
  return (
    <a
      href={href}
      {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
      className="text-muted-foreground link-hover inline-flex items-center gap-0.5 hover:text-primary"
    >
      <ScrambleText text={label} />
      <span className="text-primary">↗</span>
    </a>
  );
};

export default SocialLink;
