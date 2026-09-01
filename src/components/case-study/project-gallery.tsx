import Image from "next/image";
import type { ProjectMedia } from "@/types/project";

type ProjectGalleryProps = {
  media: ProjectMedia[];
  projectTitle: string;
};

export function ProjectGallery({ media, projectTitle }: ProjectGalleryProps) {
  return (
    <section aria-label={`${projectTitle} project gallery`} className="border-b-2 border-[var(--color-text)] bg-[var(--color-surface)] py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {media.map((item) => (
            <figure className="border-2 border-[var(--color-text)] bg-[var(--color-bg)] shadow-[5px_5px_0_var(--color-text)]" key={item.src}>
              <Image alt={item.alt} className="block h-auto w-full" height={item.height} src={item.src} width={item.width} />
              <figcaption className="border-t-2 border-[var(--color-text)] p-4 text-sm">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
