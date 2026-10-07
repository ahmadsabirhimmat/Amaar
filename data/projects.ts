export type ProjectImage = {
  src: string;
  alt: string;
  position?: string;
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: number;
  category: string;
  description: string;
  heroImage: ProjectImage;
  gallery: ProjectImage[];
  status: "Completed" | "In progress";
  area: string;
  floors: number;
};

export const projects = [
  {
    slug: "aino-house",
    name: "Aino House",
    location: "Aino Mina, Kandahar",
    year: 2024,
    category: "Residential",
    description:
      "A private house of dark metal and timber, with a sheltered entrance turned toward the evening light.",
    heroImage: {
      src: "/images/projects/01-exterior.jpg",
      alt: "A dusk view of a modern house with a dark metal upper floor, a warm timber wall, and a lit wooden door.",
      position: "center 72%",
    },
    gallery: [
      {
        src: "/images/projects/03-apartment.jpg",
        alt: "A bright living room with a grey sofa, wooden chairs, and plants beside a large window.",
      },
    ],
    status: "Completed",
    area: "480 m²",
    floors: 2,
  },
  {
    slug: "timber-court",
    name: "Timber Court",
    location: "Aino Mina, Kandahar",
    year: 2023,
    category: "Residential",
    description:
      "A two-storey court house with a deep timber canopy, screened from the lane and open to the garden.",
    heroImage: {
      src: "/images/projects/01-court.jpg",
      alt: "A timber and glass house with a deep canopy, a black side wall, and a paved forecourt.",
      position: "center center",
    },
    gallery: [
      {
        src: "/images/projects/03-room.jpg",
        alt: "A pale living and dining room with large windows, a fireplace, and a view toward neighboring roofs.",
      },
    ],
    status: "Completed",
    area: "360 m²",
    floors: 2,
  },
  {
    slug: "kabul-courts",
    name: "Kabul Courts",
    location: "Kabul",
    year: 2026,
    category: "Mixed-use",
    description:
      "Shops and showrooms at street level, with apartments stacked above in a long brick court.",
    heroImage: {
      src: "/images/projects/03-block.jpg",
      alt: "A brick apartment building with dark cladding, glass balconies, and a band of warm interior light.",
      position: "center 35%",
    },
    gallery: [
      {
        src: "/images/projects/02-interior.jpg",
        alt: "A long commercial interior with dark cabinetry, a glass corridor, and a pale concrete floor.",
      },
    ],
    status: "In progress",
    area: "6,200 m²",
    floors: 8,
  },
  {
    slug: "open-court",
    name: "Open Court",
    location: "Aino Mina, Kandahar",
    year: 2025,
    category: "Residential",
    description:
      "A two-storey house opened to a private court, with deep shade under a timber soffit.",
    heroImage: {
      src: "/images/projects/04-house.jpg",
      alt: "A white two-storey house with a timber ceiling, full-height glass, and a still pool in the court.",
      position: "center center",
    },
    gallery: [
      {
        src: "/images/projects/04-living.jpg",
        alt: "A living room with a grey sofa, a timber table, leather chairs, and tall windows onto trees.",
      },
    ],
    status: "In progress",
    area: "640 m²",
    floors: 2,
  },
] as const satisfies readonly Project[];

export function formatProjectNumber(index: number, total: number) {
  const current = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return `${current} / ${count}`;
}

export function formatFloorCount(floors: number) {
  return `${floors} ${floors === 1 ? "floor" : "floors"}`;
}
