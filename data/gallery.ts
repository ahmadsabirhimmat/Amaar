import { projects } from "@/data/projects";

const layouts = [
  {
    className: "md:col-span-7",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    className: "md:col-span-5 md:self-end",
    aspect: "aspect-[3/4]",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    className: "md:col-span-7 md:self-end",
    aspect: "aspect-[16/11]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    className: "md:col-span-4",
    aspect: "aspect-[3/4]",
    sizes: "(min-width: 768px) 34vw, 100vw",
  },
  {
    className: "md:col-span-8",
    aspect: "aspect-[16/10]",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  {
    className: "md:col-span-8",
    aspect: "aspect-[16/9]",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  {
    className: "md:col-span-4",
    aspect: "aspect-[3/4]",
    sizes: "(min-width: 768px) 34vw, 100vw",
  },
] as const;

export type GalleryImage = {
  src: string;
  alt: string;
  position: string;
  project: string;
  location: string;
  year: number;
  className: string;
  aspect: string;
  sizes: string;
};

export function getGalleryImages(): GalleryImage[] {
  const images = projects.flatMap((project) =>
    [project.heroImage, ...project.gallery].map((image) => ({
      src: image.src,
      alt: image.alt,
      position: "position" in image && image.position ? image.position : "center center",
      project: project.name,
      location: project.location,
      year: project.year,
    })),
  );

  return images.map((image, index) => {
    const layout = layouts[index] ?? layouts[layouts.length - 1];

    return {
      ...image,
      className: layout.className,
      aspect: layout.aspect,
      sizes: layout.sizes,
    };
  });
}
