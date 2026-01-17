"use client";

import { quantitativeEconCareerPathConfig } from "../data/careerPathConfig";
import CareerPathGraphBase from "../../../components/CareerPathGraphBase";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function QuantitativeEconomicsCareerPathGraph({
  onResetReady,
  onFormatReady,
}: CareerPathGraphProps) {
  return (
    <CareerPathGraphBase
      graphId="qecon"
      config={quantitativeEconCareerPathConfig}
      onResetReady={onResetReady}
      onFormatReady={onFormatReady}
    />
  );
}
