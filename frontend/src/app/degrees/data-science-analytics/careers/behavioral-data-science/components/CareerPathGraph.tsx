"use client";

import { behavioralDataScienceCareerPathConfig } from "../data/careerPathConfig";
import CareerPathGraphBase from "../../../components/CareerPathGraphBase";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function BehavioralDataScienceCareerPathGraph({
  onResetReady,
  onFormatReady,
}: CareerPathGraphProps) {
  return (
    <CareerPathGraphBase
      graphId="behav"
      config={behavioralDataScienceCareerPathConfig}
      onResetReady={onResetReady}
      onFormatReady={onFormatReady}
    />
  );
}
