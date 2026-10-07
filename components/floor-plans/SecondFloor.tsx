/**
 * Placeholder second-floor plan for Aino House.
 * Replace this group with the client SVG.
 * Put structural lines on data-plan-wall and labels on data-plan-detail.
 */
import { PlanDimension, RoomLabel } from "@/components/floor-plans/marks";

export function SecondFloorDrawing() {
  return (
    <g>
      <g fill="none" stroke="currentColor" strokeWidth="7">
        <path data-plan-wall d="M310 180 H700" />
        <path data-plan-wall d="M700 180 V470" />
        <path data-plan-wall d="M700 470 H310" />
        <path data-plan-wall d="M310 470 V180" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path data-plan-wall d="M500 180 V470" />
        <path data-plan-wall d="M560 210 H660 V300 H560 Z" />
      </g>
      <g data-plan-detail fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M250 120 H770 V540 H250 Z" strokeDasharray="5 7" />
        <path d="M575 230 H645 M575 250 H645 M575 270 H645" />
      </g>
      <RoomLabel x={405} y={330}>
        STUDY
      </RoomLabel>
      <RoomLabel x={600} y={390}>
        ROOM
      </RoomLabel>
      <RoomLabel x={500} y={520}>
        TERRACE
      </RoomLabel>
      <PlanDimension x1={310} y1={150} x2={700} y2={150} label="12.40" />
      <PlanDimension x1={276} y1={180} x2={276} y2={470} label="8.80" />
    </g>
  );
}
