"use client";

import { governmentIntelligenceCareerPathConfig } from "../data/careerPathConfig";
import CareerPathGraphBase from "../../../components/CareerPathGraphBase";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function GovernmentIntelligenceCareerPathGraph({
  onResetReady,
  onFormatReady,
}: CareerPathGraphProps) {
  return (
    <CareerPathGraphBase
      graphId="gov"
      config={governmentIntelligenceCareerPathConfig}
      onResetReady={onResetReady}
      onFormatReady={onFormatReady}
    />
  );
}
