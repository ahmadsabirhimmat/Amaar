import type { ComponentType } from "react";
import type { FloorId } from "@/data/floor-plans";
import { FirstFloorDrawing } from "@/components/floor-plans/FirstFloor";
import { GroundFloorDrawing } from "@/components/floor-plans/GroundFloor";
import { RoofDrawing } from "@/components/floor-plans/RoofPlan";
import { SecondFloorDrawing } from "@/components/floor-plans/SecondFloor";

/**
 * Replace any floor by pointing its id at a new component.
 * The component should render a <g> using the shared viewBox.
 */
export const floorDrawings: Record<FloorId, ComponentType> = {
  ground: GroundFloorDrawing,
  first: FirstFloorDrawing,
  second: SecondFloorDrawing,
  roof: RoofDrawing,
};
