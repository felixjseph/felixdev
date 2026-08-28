import { siteConfig } from "@/content/site";

type ResumeActionProps = {
  className?: string;
  destination?: string;
  label: "Download résumé" | "Résumé";
  onClick?: () => void;
};

export function ResumeAction({
  className = "",
  destination = siteConfig.resume.url,
  label,
  onClick,
}: ResumeActionProps) {
  if (!destination) {
    return (
      <span
        aria-disabled="true"
        aria-label={`${label} — not yet available`}
        className={`${className} cursor-not-allowed opacity-70`}
        data-resume-state="unavailable"
        title="Résumé PDF is not yet available"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      className={className}
      data-resume-state="available"
      download
      href={destination}
      onClick={onClick}
    >
      {label}
    </a>
  );
}
