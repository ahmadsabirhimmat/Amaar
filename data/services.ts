export type Service = {
  id: string;
  index: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
};

export type ProcessStep = {
  index: string;
  name: string;
  description: string;
};

export const services = [
  {
    id: "architectural-design",
    index: "01",
    name: "Architectural Design",
    description:
      "Plans, sections, and elevations drawn for the site, the climate, and the life the building has to hold.",
    image: {
      src: "/images/projects/01-court.jpg",
      alt: "A timber and glass house with a deep canopy, a black side wall, and a paved forecourt.",
      position: "center center",
    },
  },
  {
    id: "building-construction",
    index: "02",
    name: "Building Construction",
    description:
      "The structure raised in place, from foundation to finish, with one team accountable for the work.",
    image: {
      src: "/images/projects/03-block.jpg",
      alt: "A brick apartment building with dark cladding, glass balconies, and a band of warm interior light.",
      position: "center 35%",
    },
  },
  {
    id: "structural-engineering",
    index: "03",
    name: "Structural Engineering",
    description:
      "Frames, loads, and joints resolved so the architecture can stand without clutter or excess.",
    image: {
      src: "/images/projects/01-exterior.jpg",
      alt: "A dusk view of a modern house with a dark metal upper floor, a warm timber wall, and a lit wooden door.",
      position: "center 72%",
    },
  },
  {
    id: "interior-design",
    index: "04",
    name: "Interior Design",
    description:
      "Rooms, daylight, and materials composed once the plan is set, down to the way a table meets a window.",
    image: {
      src: "/images/projects/04-living.jpg",
      alt: "A living room with a grey sofa, a timber table, leather chairs, and tall windows onto trees.",
      position: "center 72%",
    },
  },
  {
    id: "renovation",
    index: "05",
    name: "Renovation",
    description:
      "Existing buildings opened, repaired, and returned to use without losing the logic of the original rooms.",
    image: {
      src: "/images/projects/03-room.jpg",
      alt: "A pale living and dining room with large windows, a fireplace, and a view toward neighboring roofs.",
    },
  },
  {
    id: "project-management",
    index: "06",
    name: "Project Management",
    description:
      "Sequence, cost, and the site held together from the first meeting through handover.",
    image: {
      src: "/images/projects/02-interior.jpg",
      alt: "A long commercial interior with dark cabinetry, a glass corridor, and a pale concrete floor.",
    },
  },
] as const satisfies readonly Service[];

export const processSteps = [
  {
    index: "01",
    name: "Consultation",
    description: "A visit, a brief, and a reading of the ground the building will stand on.",
  },
  {
    index: "02",
    name: "Planning",
    description: "Programme, budget, and the order of work, agreed before drawings harden.",
  },
  {
    index: "03",
    name: "Architectural Design",
    description: "Drawings that fix the rooms, the structure, and the way light enters.",
  },
  {
    index: "04",
    name: "Construction",
    description: "The building made on site, trade by trade, checked against the drawings.",
  },
  {
    index: "05",
    name: "Inspection",
    description: "The work reviewed before it is closed up, and again before it is handed over.",
  },
  {
    index: "06",
    name: "Completion",
    description: "A finished building, ready to occupy, with the record of how it was made.",
  },
] as const satisfies readonly ProcessStep[];
