/**
 * Placeholder ground-floor plan for Time Towers.
 * Replace this group with the client SVG.
 * Put structural lines on data-plan-wall and labels on data-plan-detail.
 */
import { OverallDimensions, RoomLabel, ShellWalls } from "@/components/floor-plans/marks";

export function GroundFloorDrawing() {
  return (
    <g>
      <ShellWalls />
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path data-plan-wall d="M450 120 V370" />
        <path data-plan-wall d="M610 120 V370" />
        <path data-plan-wall d="M250 370 H430" />
        <path data-plan-wall d="M510 370 H770" />
        <path data-plan-wall d="M640 145 H745 V255 H640 Z" />
      </g>
      <g data-plan-detail fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M250 250 H320" />
        <path d="M320 250 A70 70 0 0 0 250 180" />
        <path d="M430 370 H510" strokeWidth="1" />
        <path d="M330 120 V108 M400 120 V108 M520 120 V108 M700 120 V108" />
        <path d="M655 165 H730 M655 185 H730 M655 205 H730 M655 225 H730" />
        <rect x="300" y="290" width="100" height="36" />
      </g>
      <RoomLabel x={350} y={250}>
        MAJLIS
      </RoomLabel>
      <RoomLabel x={530} y={250}>
        LIVING
      </RoomLabel>
      <RoomLabel x={690} y={310}>
        KITCHEN
      </RoomLabel>
      <RoomLabel x={510} y={470}>
        COURT
      </RoomLabel>
      <OverallDimensions />
    </g>
  );
}
