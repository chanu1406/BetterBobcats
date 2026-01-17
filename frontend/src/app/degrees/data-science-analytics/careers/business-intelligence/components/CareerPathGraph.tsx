"use client";

import { businessIntelligenceCareerPathConfig } from "../data/careerPathConfig";
import CareerPathGraphBase from "../../../components/CareerPathGraphBase";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function BusinessIntelligenceCareerPathGraph({
  onResetReady,
  onFormatReady,
}: CareerPathGraphProps) {
  return (
    <CareerPathGraphBase
      graphId="bi"
      config={businessIntelligenceCareerPathConfig}
      onResetReady={onResetReady}
      onFormatReady={onFormatReady}
    />
  );
}
