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
    id: "residences",
    index: "01",
    name: "Residences",
    description:
      "Homes at Time Towers in 2nd Aino Mina, on 26th Street in District 11, Kandahar.",
    image: {
      src: "/images/projects/01-court.jpg",
      alt: "A timber and glass house with a deep canopy, a black side wall, and a paved forecourt.",
      position: "center center",
    },
  },
  {
    id: "site-visits",
    index: "02",
    name: "Site visits",
    description:
      "The office is always open. Come to 26th Street and see the Time Towers residences in person.",
    image: {
      src: "/images/projects/03-block.jpg",
      alt: "A brick apartment building with dark cladding, glass balconies, and a band of warm interior light.",
      position: "center 35%",
    },
  },
  {
    id: "floor-plans",
    index: "03",
    name: "Floor plans",
    description:
      "Plans of the Time Towers residences: rooms, courts, and the way each floor is arranged.",
    image: {
      src: "/images/projects/01-exterior.jpg",
      alt: "A dusk view of a modern house with a dark metal upper floor, a warm timber wall, and a lit wooden door.",
      position: "center 72%",
    },
  },
  {
    id: "interiors",
    index: "04",
    name: "Interiors",
    description:
      "Rooms, daylight, and materials inside the residences, down to the way a table meets a window.",
    image: {
      src: "/images/projects/04-living.jpg",
      alt: "A living room with a grey sofa, a timber table, leather chairs, and tall windows onto trees.",
      position: "center 72%",
    },
  },
  {
    id: "viewings",
    index: "05",
    name: "Viewings",
    description:
      "A walk through a finished residence in Aino Mina, arranged by phone at +93 70 004 0086.",
    image: {
      src: "/images/projects/03-room.jpg",
      alt: "A pale living and dining room with large windows, a fireplace, and a view toward neighboring roofs.",
    },
  },
  {
    id: "handover",
    index: "06",
    name: "Handover",
    description:
      "From the first visit on 26th Street through to the day a Time Towers residence is ready to occupy.",
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
    description: "A visit to Time Towers on 26th Street, and a reading of the residence.",
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
