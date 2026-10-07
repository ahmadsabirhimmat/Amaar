/**
 * Shared drawing marks for the placeholder sheets.
 * A replacement SVG can ignore these and draw its own title block.
 */

export const PLAN_VIEWBOX = "0 0 980 680";

type PointLabel = {
  x: number;
  y: number;
  children: string;
};

export function RoomLabel({ x, y, children }: PointLabel) {
  return (
    <text
      data-plan-detail
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="18"
      fill="currentColor"
      stroke="none"
      letterSpacing="0.16em"
    >
      {children}
    </text>
  );
}

export function PlanDimension({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
}) {
  const vertical = x1 === x2;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g data-plan-detail>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
      <line
        x1={vertical ? x1 - 6 : x1}
        y1={vertical ? y1 : y1 - 6}
        x2={vertical ? x1 + 6 : x1}
        y2={vertical ? y1 : y1 + 6}
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1={vertical ? x2 - 6 : x2}
        y1={vertical ? y2 : y2 - 6}
        x2={vertical ? x2 + 6 : x2}
        y2={vertical ? y2 : y2 + 6}
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x={vertical ? midX - 14 : midX}
        y={vertical ? midY : midY - 12}
        textAnchor="middle"
        fontSize="16"
        fill="currentColor"
        stroke="none"
        transform={vertical ? `rotate(-90 ${midX - 14} ${midY})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

export function NorthArrow() {
  return (
    <g data-plan-detail transform="translate(900 150)">
      <circle cx="0" cy="28" r="26" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M0 8 L7 40 L0 32 L-7 40 Z" fill="currentColor" stroke="none" />
      <text x="0" y="68" textAnchor="middle" fontSize="14" fill="currentColor" stroke="none">
        N
      </text>
    </g>
  );
}

/** Outer walls shared by the ground and first floor placeholders. */
export function ShellWalls() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="miter">
      <path data-plan-wall d="M250 120 H770" />
      <path data-plan-wall d="M770 120 V540" />
      <path data-plan-wall d="M770 540 H250" />
      <path data-plan-wall d="M250 540 V250" />
      <path data-plan-wall d="M250 180 V120" />
    </g>
  );
}

export function OverallDimensions() {
  return (
    <g>
      <PlanDimension x1={250} y1={78} x2={770} y2={78} label="16.00" />
      <PlanDimension x1={148} y1={120} x2={148} y2={540} label="12.60" />
    </g>
  );
}
