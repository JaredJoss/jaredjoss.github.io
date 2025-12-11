import ScrambleText from "@/components/ScrambleText";

interface ExperienceItemProps {
  role: string;
  company: string;
  companyIcon?: string;
  companyUrl?: string;
}

const ExperienceItem = ({ role, company, companyIcon, companyUrl }: ExperienceItemProps) => {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <ScrambleText text={role} className="text-foreground" />
      <span className="text-muted-foreground">at</span>
      {companyIcon && (
        <img 
          src={companyIcon} 
          alt={`${company} icon`} 
          className="w-4 h-4 rounded-sm brightness-150"
        />
      )}
      {companyUrl ? (
        <a 
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary link-hover"
        >
          <ScrambleText text={company} />
        </a>
      ) : (
        <ScrambleText text={company} className="text-primary" />
      )}
    </div>
  );
};

export default ExperienceItem;
