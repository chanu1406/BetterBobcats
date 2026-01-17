"use client";

import { publicHealthCareerPathConfig } from "../data/careerPathConfig";
import CareerPathGraphBase from "../../../components/CareerPathGraphBase";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function PublicHealthCareerPathGraph({
  onResetReady,
  onFormatReady,
}: CareerPathGraphProps) {
  return (
    <CareerPathGraphBase
      graphId="health"
      config={publicHealthCareerPathConfig}
      onResetReady={onResetReady}
      onFormatReady={onFormatReady}
    />
  );
}
