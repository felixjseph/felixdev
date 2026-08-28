import { siteConfig } from "@/content/site";
import { AnalyticsLink } from "./analytics-link";

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
    <AnalyticsLink
      className={className}
      data-resume-state="available"
      download
      eventName="resume_downloaded"
      href={destination}
      onClick={onClick}
    >
      {label}
    </AnalyticsLink>
  );
}
