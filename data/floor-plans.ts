export type FloorId = "ground" | "first" | "second" | "roof";

export type FloorRoom = {
  name: string;
  area: string;
};

export type FloorPlan = {
  id: FloorId;
  index: string;
  name: string;
  sheet: string;
  area: string;
  width: string;
  depth: string;
  floorToFloor: string;
  summary: string;
  rooms: readonly FloorRoom[];
};

export const floorPlanProject = {
  name: "Time Towers",
  location: "2nd Aino Mina, Kandahar",
  scale: "1:100",
} as const;

export const floorPlans = [
  {
    id: "ground",
    index: "00",
    name: "Ground floor",
    sheet: "A-101",
    area: "168 m²",
    width: "16.00 m",
    depth: "12.60 m",
    floorToFloor: "3.20 m",
    summary: "Entry, majlis, and a court open to the south.",
    rooms: [
      { name: "Majlis", area: "28 m²" },
      { name: "Living", area: "24 m²" },
      { name: "Kitchen", area: "16 m²" },
      { name: "Court", area: "62 m²" },
      { name: "Stair", area: "8 m²" },
    ],
  },
  {
    id: "first",
    index: "01",
    name: "First floor",
    sheet: "A-102",
    area: "142 m²",
    width: "16.00 m",
    depth: "12.60 m",
    floorToFloor: "3.00 m",
    summary: "Family rooms arranged along a single hall.",
    rooms: [
      { name: "Bedroom", area: "18 m²" },
      { name: "Bedroom", area: "16 m²" },
      { name: "Bedroom", area: "14 m²" },
      { name: "Hall", area: "22 m²" },
      { name: "Bath", area: "8 m²" },
    ],
  },
  {
    id: "second",
    index: "02",
    name: "Second floor",
    sheet: "A-103",
    area: "86 m²",
    width: "12.40 m",
    depth: "8.80 m",
    floorToFloor: "2.80 m",
    summary: "A set-back study and room above the court.",
    rooms: [
      { name: "Study", area: "22 m²" },
      { name: "Room", area: "16 m²" },
      { name: "Terrace", area: "28 m²" },
    ],
  },
  {
    id: "roof",
    index: "03",
    name: "Roof",
    sheet: "A-104",
    area: "120 m²",
    width: "16.00 m",
    depth: "12.60 m",
    floorToFloor: "1.10 m parapet",
    summary: "Open terrace, parapet, and the stair penthouse.",
    rooms: [
      { name: "Terrace", area: "98 m²" },
      { name: "Stair head", area: "8 m²" },
      { name: "Parapet", area: "1.10 m" },
    ],
  },
] as const satisfies readonly FloorPlan[];

export type FloorPlanRecord = (typeof floorPlans)[number];
