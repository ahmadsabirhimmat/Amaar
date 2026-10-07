/**
 * Placeholder roof plan for Aino House.
 * Replace this group with the client SVG.
 * Put structural lines on data-plan-wall and labels on data-plan-detail.
 */
import { OverallDimensions, RoomLabel } from "@/components/floor-plans/marks";

export function RoofDrawing() {
  return (
    <g>
      <g fill="none" stroke="currentColor" strokeWidth="7">
        <path data-plan-wall d="M250 120 H770 V540 H250 Z" />
        <path data-plan-wall d="M268 138 H752 V522 H268 Z" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path data-plan-wall d="M640 145 H745 V255 H640 Z" />
      </g>
      <g data-plan-detail fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M655 165 H730 M655 185 H730 M655 205 H730" />
        <circle cx="320" cy="200" r="8" />
        <circle cx="700" cy="480" r="8" />
        <path d="M320 192 V208 M312 200 H328 M700 472 V488 M692 480 H708" />
      </g>
      <RoomLabel x={470} y={360}>
        TERRACE
      </RoomLabel>
      <RoomLabel x={692} y={290}>
        STAIR
      </RoomLabel>
      <OverallDimensions />
    </g>
  );
}
