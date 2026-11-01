/**
 * Placeholder first-floor plan for Time Towers.
 * Replace this group with the client SVG.
 * Put structural lines on data-plan-wall and labels on data-plan-detail.
 */
import { OverallDimensions, RoomLabel } from "@/components/floor-plans/marks";

export function FirstFloorDrawing() {
  return (
    <g>
      <g fill="none" stroke="currentColor" strokeWidth="7">
        <path data-plan-wall d="M250 120 H770 V540 H250 Z" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path data-plan-wall d="M250 300 H470" />
        <path data-plan-wall d="M540 300 H770" />
        <path data-plan-wall d="M420 120 V300" />
        <path data-plan-wall d="M590 120 V300" />
        <path data-plan-wall d="M680 300 V540" />
        <path data-plan-wall d="M430 360 H560 V480 H430 Z" />
      </g>
      <g data-plan-detail fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M470 300 H540" strokeWidth="1" />
        <path d="M420 220 H408 M590 220 H602" />
        <path d="M448 380 H542 M448 400 H542 M448 420 H542 M448 440 H542" />
        <rect x="700" y="360" width="50" height="36" />
      </g>
      <RoomLabel x={335} y={220}>
        BEDROOM
      </RoomLabel>
      <RoomLabel x={505} y={220}>
        BEDROOM
      </RoomLabel>
      <RoomLabel x={680} y={220}>
        BEDROOM
      </RoomLabel>
      <RoomLabel x={560} y={520}>
        HALL
      </RoomLabel>
      <RoomLabel x={725} y={450}>
        BATH
      </RoomLabel>
      <OverallDimensions />
    </g>
  );
}
