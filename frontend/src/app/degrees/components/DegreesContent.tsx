/**
 * DegreesContent Component
 * Main content area showing welcome message or selected degree content
 * Used on: Degrees page
 */
"use client";

import { useState, useRef, useEffect } from "react";
import PrerequisiteGraph from "../cs-cse/components/PrerequisiteGraph";
import GraphLegend from "../cs-cse/components/GraphLegend";
import CareerPathGraph from "../cs-cse/careers/swe/components/CareerPathGraph";
import CybersecurityCareerPathGraph from "../cs-cse/careers/cybersecurity/components/CareerPathGraph";
import MLAICareerPathGraph from "../cs-cse/careers/ml-ai/components/CareerPathGraph";
import DataScienceCareerPathGraph from "../cs-cse/careers/datascience/components/CareerPathGraph";
import SystemsInfraCareerPathGraph from "../cs-cse/careers/systems-infra/components/CareerPathGraph";
import EmbeddedSystemsCareerPathGraph from "../cs-cse/careers/embedded-systems/components/CareerPathGraph";
import COGSPrerequisiteGraph from "../cogs/components/PrerequisiteGraph";
import UXUICareerPathGraph from "../cogs/careers/ux-ui/components/CareerPathGraph";
import DataAnalystCareerPathGraph from "../cogs/careers/data-analyst/components/CareerPathGraph";
import MarketResearchCareerPathGraph from "../cogs/careers/market-research/components/CareerPathGraph";
import HumanResourcesCareerPathGraph from "../cogs/careers/human-resources/components/CareerPathGraph";
import EEPrerequisiteGraph from "../electrical-engineering/components/PrerequisiteGraph";
import EEGraphLegend from "../electrical-engineering/components/GraphLegend";
import MEPrerequisiteGraph from "../mechanical-engineering/components/PrerequisiteGraph";
import MEGraphLegend from "../mechanical-engineering/components/GraphLegend";
import PoliticalSciencePrerequisiteGraph from "../political-science/components/PrerequisiteGraph";
import PoliticalScienceGraphLegend from "../political-science/components/GraphLegend";
import PolicyResearchAnalystCareerPathGraph from "../political-science/careers/policy-research-analyst/components/CareerPathGraph";
import LegislativeAideGovernmentStaffCareerPathGraph from "../political-science/careers/legislative-aide-government-staff/components/CareerPathGraph";
import PublicAdministrationNonprofitProgramCoordinatorCareerPathGraph from "../political-science/careers/public-administration-nonprofit-program-coordinator/components/CareerPathGraph";
import MechanicalDesignCareerPathGraph from "../mechanical-engineering/careers/mechanical-design/components/CareerPathGraph";
import AerospaceDefenseCareerPathGraph from "../mechanical-engineering/careers/aerospace-defense/components/CareerPathGraph";
import EnergySustainabilityCareerPathGraph from "../mechanical-engineering/careers/energy-sustainability/components/CareerPathGraph";
import RoboticsAutomationCareerPathGraph from "../mechanical-engineering/careers/robotics-automation/components/CareerPathGraph";
import ManufacturingIndustrialCareerPathGraph from "../mechanical-engineering/careers/manufacturing-industrial/components/CareerPathGraph";
import AutomotiveEVCareerPathGraph from "../mechanical-engineering/careers/automotive-ev/components/CareerPathGraph";
import PowerSystemsCareerPathGraph from "../electrical-engineering/careers/power-systems/components/CareerPathGraph";
import EmbeddedSystemsEECareerPathGraph from "../electrical-engineering/careers/embedded-systems/components/CareerPathGraph";
import EVAutomotiveCareerPathGraph from "../electrical-engineering/careers/ev-automotive/components/CareerPathGraph";
import SignalsRFCareerPathGraph from "../electrical-engineering/careers/signals-rf/components/CareerPathGraph";
import ControlsAutomationCareerPathGraph from "../electrical-engineering/careers/controls-automation/components/CareerPathGraph";
import HardwareICDesignCareerPathGraph from "../electrical-engineering/careers/hardware-ic-design/components/CareerPathGraph";

interface DegreesContentProps {
  selectedDegree: string | null;
  selectedCareerPath: string | null;
}

export default function DegreesContent({ selectedDegree, selectedCareerPath }: DegreesContentProps) {
  const [useFormattedLayout, setUseFormattedLayout] = useState(false);
  
  // Use refs to store reset handlers - no state updates during render
  const resetPrerequisiteGraphRef = useRef<(() => void) | null>(null);
  const fullResetPrerequisiteGraphRef = useRef<(() => void) | null>(null);
  
  // Separate reset handler for career path graphs (SWE, etc.)
  const resetCareerPathGraphRef = useRef<(() => void) | null>(null);
  const formatCareerPathGraphRef = useRef<(() => void) | null>(null);
  
  // Cybersecurity graph handlers
  const resetCybersecurityGraphRef = useRef<(() => void) | null>(null);
  const formatCybersecurityGraphRef = useRef<(() => void) | null>(null);
  
  // ML-AI graph handlers
  const resetMLAIGraphRef = useRef<(() => void) | null>(null);
  const formatMLAIGraphRef = useRef<(() => void) | null>(null);
  
  // Data Science graph handlers
  const resetDataScienceGraphRef = useRef<(() => void) | null>(null);
  const formatDataScienceGraphRef = useRef<(() => void) | null>(null);
  
  // Systems / Infrastructure Engineering graph handlers
  const resetSystemsInfraGraphRef = useRef<(() => void) | null>(null);
  const formatSystemsInfraGraphRef = useRef<(() => void) | null>(null);
  
  // Embedded Systems Engineering graph handlers
  const resetEmbeddedSystemsGraphRef = useRef<(() => void) | null>(null);
  const formatEmbeddedSystemsGraphRef = useRef<(() => void) | null>(null);
  
  // UX/UI graph handlers
  const resetUXUIGraphRef = useRef<(() => void) | null>(null);
  const formatUXUIGraphRef = useRef<(() => void) | null>(null);
  
  // Data Analyst graph handlers
  const resetDataAnalystGraphRef = useRef<(() => void) | null>(null);
  const formatDataAnalystGraphRef = useRef<(() => void) | null>(null);
  
  // Market Research graph handlers
  const resetMarketResearchGraphRef = useRef<(() => void) | null>(null);
  const formatMarketResearchGraphRef = useRef<(() => void) | null>(null);
  
  // Human Resources graph handlers
  const resetHumanResourcesGraphRef = useRef<(() => void) | null>(null);
  const formatHumanResourcesGraphRef = useRef<(() => void) | null>(null);
  
  // Electrical Engineering graph handlers
  const resetEEGraphRef = useRef<(() => void) | null>(null);
  const fullResetEEGraphRef = useRef<(() => void) | null>(null);
  
  // Mechanical Engineering graph handlers
  const resetMEGraphRef = useRef<(() => void) | null>(null);
  const fullResetMEGraphRef = useRef<(() => void) | null>(null);
  const exportMEPositionsRef = useRef<(() => void) | null>(null);
  
  // Political Science graph handlers
  const resetPoliticalScienceGraphRef = useRef<(() => void) | null>(null);
  const fullResetPoliticalScienceGraphRef = useRef<(() => void) | null>(null);
  const exportPoliticalSciencePositionsRef = useRef<(() => void) | null>(null);
  
  // Policy / Research Analyst career path graph handlers
  const resetPolicyResearchAnalystGraphRef = useRef<(() => void) | null>(null);
  const formatPolicyResearchAnalystGraphRef = useRef<(() => void) | null>(null);
  
  // Legislative Aide / Government Staff career path graph handlers
  const resetLegislativeAideGovernmentStaffGraphRef = useRef<(() => void) | null>(null);
  const formatLegislativeAideGovernmentStaffGraphRef = useRef<(() => void) | null>(null);
  
  // Public Administration / Nonprofit Program Coordinator career path graph handlers
  const resetPublicAdministrationNonprofitProgramCoordinatorGraphRef = useRef<(() => void) | null>(null);
  const formatPublicAdministrationNonprofitProgramCoordinatorGraphRef = useRef<(() => void) | null>(null);
  
  // Mechanical Design career path graph handlers
  const resetMechanicalDesignGraphRef = useRef<(() => void) | null>(null);
  const formatMechanicalDesignGraphRef = useRef<(() => void) | null>(null);
  
  // Power Systems career path graph handlers
  const resetPowerSystemsGraphRef = useRef<(() => void) | null>(null);
  const formatPowerSystemsGraphRef = useRef<(() => void) | null>(null);
  
  // Embedded Systems EE career path graph handlers
  const resetEmbeddedSystemsEEGraphRef = useRef<(() => void) | null>(null);
  const formatEmbeddedSystemsEEGraphRef = useRef<(() => void) | null>(null);
  
  // EV Automotive career path graph handlers
  const resetEVAutomotiveGraphRef = useRef<(() => void) | null>(null);
  const formatEVAutomotiveGraphRef = useRef<(() => void) | null>(null);
  
  // Signals RF career path graph handlers
  const resetSignalsRFGraphRef = useRef<(() => void) | null>(null);
  const formatSignalsRFGraphRef = useRef<(() => void) | null>(null);
  
  // Controls Automation career path graph handlers
  const resetControlsAutomationGraphRef = useRef<(() => void) | null>(null);
  const formatControlsAutomationGraphRef = useRef<(() => void) | null>(null);
  
  // Hardware IC Design career path graph handlers
  const resetHardwareICDesignGraphRef = useRef<(() => void) | null>(null);
  const formatHardwareICDesignGraphRef = useRef<(() => void) | null>(null);
  
  // State to track when handlers are ready (updated in useEffect to avoid render-time updates)
  const [resetPrerequisiteReady, setResetPrerequisiteReady] = useState(false);
  const [fullResetPrerequisiteReady, setFullResetPrerequisiteReady] = useState(false);
  const [resetCareerPathReady, setResetCareerPathReady] = useState(false);
  const [formatCareerPathReady, setFormatCareerPathReady] = useState(false);
  const [resetCybersecurityReady, setResetCybersecurityReady] = useState(false);
  const [formatCybersecurityReady, setFormatCybersecurityReady] = useState(false);
  const [resetMLAIReady, setResetMLAIReady] = useState(false);
  const [formatMLAIReady, setFormatMLAIReady] = useState(false);
  const [resetDataScienceReady, setResetDataScienceReady] = useState(false);
  const [formatDataScienceReady, setFormatDataScienceReady] = useState(false);
  const [resetSystemsInfraReady, setResetSystemsInfraReady] = useState(false);
  const [formatSystemsInfraReady, setFormatSystemsInfraReady] = useState(false);
  const [resetEmbeddedSystemsReady, setResetEmbeddedSystemsReady] = useState(false);
  const [formatEmbeddedSystemsReady, setFormatEmbeddedSystemsReady] = useState(false);
  const [resetUXUIReady, setResetUXUIReady] = useState(false);
  const [formatUXUIReady, setFormatUXUIReady] = useState(false);
  const [resetDataAnalystReady, setResetDataAnalystReady] = useState(false);
  const [formatDataAnalystReady, setFormatDataAnalystReady] = useState(false);
  const [resetMarketResearchReady, setResetMarketResearchReady] = useState(false);
  const [formatMarketResearchReady, setFormatMarketResearchReady] = useState(false);
  const [resetHumanResourcesReady, setResetHumanResourcesReady] = useState(false);
  const [formatHumanResourcesReady, setFormatHumanResourcesReady] = useState(false);
  const [resetEEReady, setResetEEReady] = useState(false);
  const [fullResetEEReady, setFullResetEEReady] = useState(false);
  const [resetMEReady, setResetMEReady] = useState(false);
  const [fullResetMEReady, setFullResetMEReady] = useState(false);
  const [resetPoliticalScienceReady, setResetPoliticalScienceReady] = useState(false);
  const [fullResetPoliticalScienceReady, setFullResetPoliticalScienceReady] = useState(false);
  const [resetPolicyResearchAnalystReady, setResetPolicyResearchAnalystReady] = useState(false);
  const [formatPolicyResearchAnalystReady, setFormatPolicyResearchAnalystReady] = useState(false);
  const [resetLegislativeAideGovernmentStaffReady, setResetLegislativeAideGovernmentStaffReady] = useState(false);
  const [formatLegislativeAideGovernmentStaffReady, setFormatLegislativeAideGovernmentStaffReady] = useState(false);
  const [resetPublicAdministrationNonprofitProgramCoordinatorReady, setResetPublicAdministrationNonprofitProgramCoordinatorReady] = useState(false);
  const [formatPublicAdministrationNonprofitProgramCoordinatorReady, setFormatPublicAdministrationNonprofitProgramCoordinatorReady] = useState(false);
  const [resetMechanicalDesignReady, setResetMechanicalDesignReady] = useState(false);
  const [formatMechanicalDesignReady, setFormatMechanicalDesignReady] = useState(false);
  const [resetPowerSystemsReady, setResetPowerSystemsReady] = useState(false);
  const [formatPowerSystemsReady, setFormatPowerSystemsReady] = useState(false);
  const [resetEmbeddedSystemsEEReady, setResetEmbeddedSystemsEEReady] = useState(false);
  const [formatEmbeddedSystemsEEReady, setFormatEmbeddedSystemsEEReady] = useState(false);
  const [resetEVAutomotiveReady, setResetEVAutomotiveReady] = useState(false);
  const [formatEVAutomotiveReady, setFormatEVAutomotiveReady] = useState(false);
  const [resetSignalsRFReady, setResetSignalsRFReady] = useState(false);
  const [formatSignalsRFReady, setFormatSignalsRFReady] = useState(false);
  const [resetControlsAutomationReady, setResetControlsAutomationReady] = useState(false);
  const [formatControlsAutomationReady, setFormatControlsAutomationReady] = useState(false);
  const [resetHardwareICDesignReady, setResetHardwareICDesignReady] = useState(false);
  const [formatHardwareICDesignReady, setFormatHardwareICDesignReady] = useState(false);
  
  // Callbacks to register reset handlers from child components
  const handleResetPrerequisiteReady = useRef((handler: () => void) => {
    resetPrerequisiteGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setResetPrerequisiteReady(true);
    });
  });
  
  const handleFullResetPrerequisiteReady = useRef((handler: () => void) => {
    fullResetPrerequisiteGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setFullResetPrerequisiteReady(true);
    });
  });

  const handleResetCareerPathReady = useRef((handler: () => void) => {
    resetCareerPathGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setResetCareerPathReady(true);
    });
  });

  const handleFormatCareerPathReady = useRef((handler: () => void) => {
    formatCareerPathGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setFormatCareerPathReady(true);
    });
  });

  const handleResetCybersecurityReady = useRef((handler: () => void) => {
    resetCybersecurityGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetCybersecurityReady(true);
    });
  });

  const handleFormatCybersecurityReady = useRef((handler: () => void) => {
    formatCybersecurityGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatCybersecurityReady(true);
    });
  });

  const handleResetMLAIReady = useRef((handler: () => void) => {
    resetMLAIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetMLAIReady(true);
    });
  });

  const handleFormatMLAIReady = useRef((handler: () => void) => {
    formatMLAIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatMLAIReady(true);
    });
  });

  const handleResetDataScienceReady = useRef((handler: () => void) => {
    resetDataScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetDataScienceReady(true);
    });
  });

  const handleFormatDataScienceReady = useRef((handler: () => void) => {
    formatDataScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatDataScienceReady(true);
    });
  });

  const handleResetSystemsInfraReady = useRef((handler: () => void) => {
    resetSystemsInfraGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetSystemsInfraReady(true);
    });
  });

  const handleFormatSystemsInfraReady = useRef((handler: () => void) => {
    formatSystemsInfraGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatSystemsInfraReady(true);
    });
  });

  const handleResetEmbeddedSystemsReady = useRef((handler: () => void) => {
    resetEmbeddedSystemsGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetEmbeddedSystemsReady(true);
    });
  });

  const handleFormatEmbeddedSystemsReady = useRef((handler: () => void) => {
    formatEmbeddedSystemsGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatEmbeddedSystemsReady(true);
    });
  });

  const handleResetUXUIReady = useRef((handler: () => void) => {
    resetUXUIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetUXUIReady(true);
    });
  });

  const handleFormatUXUIReady = useRef((handler: () => void) => {
    formatUXUIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatUXUIReady(true);
    });
  });

  const handleResetDataAnalystReady = useRef((handler: () => void) => {
    resetDataAnalystGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetDataAnalystReady(true);
    });
  });

  const handleFormatDataAnalystReady = useRef((handler: () => void) => {
    formatDataAnalystGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatDataAnalystReady(true);
    });
  });

  const handleResetMarketResearchReady = useRef((handler: () => void) => {
    resetMarketResearchGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetMarketResearchReady(true);
    });
  });

  const handleFormatMarketResearchReady = useRef((handler: () => void) => {
    formatMarketResearchGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatMarketResearchReady(true);
    });
  });

  const handleResetHumanResourcesReady = useRef((handler: () => void) => {
    resetHumanResourcesGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetHumanResourcesReady(true);
    });
  });

  const handleFormatHumanResourcesReady = useRef((handler: () => void) => {
    formatHumanResourcesGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatHumanResourcesReady(true);
    });
  });

  const handleResetEEReady = useRef((handler: () => void) => {
    resetEEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetEEReady(true);
    });
  });

  const handleFullResetEEReady = useRef((handler: () => void) => {
    fullResetEEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFullResetEEReady(true);
    });
  });

  const handleResetMEReady = useRef((handler: () => void) => {
    resetMEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetMEReady(true);
    });
  });

  const handleFullResetMEReady = useRef((handler: () => void) => {
    fullResetMEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFullResetMEReady(true);
    });
  });

  const handleExportMEPositionsReady = useRef((handler: () => void) => {
    exportMEPositionsRef.current = handler;
  });

  const handleResetPoliticalScienceReady = useRef((handler: () => void) => {
    resetPoliticalScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetPoliticalScienceReady(true);
    });
  });

  const handleFullResetPoliticalScienceReady = useRef((handler: () => void) => {
    fullResetPoliticalScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFullResetPoliticalScienceReady(true);
    });
  });

  const handleExportPoliticalSciencePositionsReady = useRef((handler: () => void) => {
    exportPoliticalSciencePositionsRef.current = handler;
  });

  const handleResetPolicyResearchAnalystReady = useRef((handler: () => void) => {
    resetPolicyResearchAnalystGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetPolicyResearchAnalystReady(true);
    });
  });

  const handleFormatPolicyResearchAnalystReady = useRef((handler: () => void) => {
    formatPolicyResearchAnalystGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatPolicyResearchAnalystReady(true);
    });
  });

  const handleResetLegislativeAideGovernmentStaffReady = useRef((handler: () => void) => {
    resetLegislativeAideGovernmentStaffGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetLegislativeAideGovernmentStaffReady(true);
    });
  });

  const handleFormatLegislativeAideGovernmentStaffReady = useRef((handler: () => void) => {
    formatLegislativeAideGovernmentStaffGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatLegislativeAideGovernmentStaffReady(true);
    });
  });

  const handleResetPublicAdministrationNonprofitProgramCoordinatorReady = useRef((handler: () => void) => {
    resetPublicAdministrationNonprofitProgramCoordinatorGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetPublicAdministrationNonprofitProgramCoordinatorReady(true);
    });
  });

  const handleFormatPublicAdministrationNonprofitProgramCoordinatorReady = useRef((handler: () => void) => {
    formatPublicAdministrationNonprofitProgramCoordinatorGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatPublicAdministrationNonprofitProgramCoordinatorReady(true);
    });
  });
  
  const handleResetMechanicalDesignReady = useRef((handler: () => void) => {
    resetMechanicalDesignGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetMechanicalDesignReady(true);
    });
  });
  
  const handleFormatMechanicalDesignReady = useRef((handler: () => void) => {
    formatMechanicalDesignGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatMechanicalDesignReady(true);
    });
  });
  
  const handleResetPowerSystemsReady = useRef((handler: () => void) => {
    resetPowerSystemsGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetPowerSystemsReady(true);
    });
  });
  
  const handleFormatPowerSystemsReady = useRef((handler: () => void) => {
    formatPowerSystemsGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatPowerSystemsReady(true);
    });
  });
  
  const handleResetEmbeddedSystemsEEReady = useRef((handler: () => void) => {
    resetEmbeddedSystemsEEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetEmbeddedSystemsEEReady(true);
    });
  });
  
  const handleFormatEmbeddedSystemsEEReady = useRef((handler: () => void) => {
    formatEmbeddedSystemsEEGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatEmbeddedSystemsEEReady(true);
    });
  });
  
  const handleResetEVAutomotiveReady = useRef((handler: () => void) => {
    resetEVAutomotiveGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetEVAutomotiveReady(true);
    });
  });
  
  const handleFormatEVAutomotiveReady = useRef((handler: () => void) => {
    formatEVAutomotiveGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatEVAutomotiveReady(true);
    });
  });
  
  const handleResetSignalsRFReady = useRef((handler: () => void) => {
    resetSignalsRFGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetSignalsRFReady(true);
    });
  });
  
  const handleFormatSignalsRFReady = useRef((handler: () => void) => {
    formatSignalsRFGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatSignalsRFReady(true);
    });
  });
  
  const handleResetControlsAutomationReady = useRef((handler: () => void) => {
    resetControlsAutomationGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetControlsAutomationReady(true);
    });
  });
  
  const handleFormatControlsAutomationReady = useRef((handler: () => void) => {
    formatControlsAutomationGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatControlsAutomationReady(true);
    });
  });
  
  const handleResetHardwareICDesignReady = useRef((handler: () => void) => {
    resetHardwareICDesignGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetHardwareICDesignReady(true);
    });
  });
  
  const handleFormatHardwareICDesignReady = useRef((handler: () => void) => {
    formatHardwareICDesignGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatHardwareICDesignReady(true);
    });
  });

  // Reset readiness flags when switching between pages
  useEffect(() => {
    if (!selectedCareerPath && !selectedDegree) {
      setResetPrerequisiteReady(false);
      setFullResetPrerequisiteReady(false);
      setResetCareerPathReady(false);
      setFormatCareerPathReady(false);
      setResetCybersecurityReady(false);
      setFormatCybersecurityReady(false);
      setResetMLAIReady(false);
      setFormatMLAIReady(false);
      setResetDataScienceReady(false);
      setFormatDataScienceReady(false);
      setResetSystemsInfraReady(false);
      setFormatSystemsInfraReady(false);
      setResetEmbeddedSystemsReady(false);
      setFormatEmbeddedSystemsReady(false);
      setResetUXUIReady(false);
      setFormatUXUIReady(false);
      setResetDataAnalystReady(false);
      setFormatDataAnalystReady(false);
      setResetPoliticalScienceReady(false);
      setFullResetPoliticalScienceReady(false);
      setResetPolicyResearchAnalystReady(false);
      setFormatPolicyResearchAnalystReady(false);
      resetPrerequisiteGraphRef.current = null;
      fullResetPrerequisiteGraphRef.current = null;
      resetCareerPathGraphRef.current = null;
      formatCareerPathGraphRef.current = null;
      resetCybersecurityGraphRef.current = null;
      formatCybersecurityGraphRef.current = null;
      resetMLAIGraphRef.current = null;
      formatMLAIGraphRef.current = null;
      resetDataScienceGraphRef.current = null;
      formatDataScienceGraphRef.current = null;
      resetSystemsInfraGraphRef.current = null;
      formatSystemsInfraGraphRef.current = null;
      resetEmbeddedSystemsGraphRef.current = null;
      formatEmbeddedSystemsGraphRef.current = null;
      resetUXUIGraphRef.current = null;
      formatUXUIGraphRef.current = null;
      resetDataAnalystGraphRef.current = null;
      formatDataAnalystGraphRef.current = null;
      resetPoliticalScienceGraphRef.current = null;
      fullResetPoliticalScienceGraphRef.current = null;
      resetPolicyResearchAnalystGraphRef.current = null;
      formatPolicyResearchAnalystGraphRef.current = null;
    }
  }, [selectedCareerPath, selectedDegree]);

  if (!selectedDegree) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8">
              Welcome to the degree page
            </h2>
          </div>

          {/* How to Use This Page Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-6 text-center">
              How this page works
            </h3>
            <ul className="space-y-3 text-center max-w-2xl mx-auto">
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Choose a degree from the left panel
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • See recommended coursework, core skills, and career paths
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Learn what to do outside the classroom to stay competitive
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Get guidance earlier — not junior year
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Show career path content if selected
  if (selectedCareerPath) {
    const careerPathNames: Record<string, string> = {
      swe: "SWE (Generalist)",
      cybersecurity: "Cybersecurity",
      "ml-ai": "Machine Learning / AI",
      "data-science": "Data Science / Data Analytics",
      systems: "Systems / Infrastructure Engineering Pathway",
      embedded: "Embedded Systems Engineering",
      "ux-ui": "UX/UI Design & Research (Generalist)",
      "data-analyst": "Data Analyst (Generalist)",
      "market-research": "Market Research Analyst (Generalist)",
      "human-resources": "Human Resources Specialist (Generalist)",
      "policy-research-analyst": "Policy / Research Analyst",
      "legislative-aide-government-staff": "Legislative Aide / Government Staff",
      "public-administration-nonprofit-program-coordinator": "Public Administration / Nonprofit Program Coordinator",
      "mechanical-design": "Mechanical Design Engineer",
      "aerospace-defense": "Aerospace / Defense Engineer",
      "energy-sustainability": "Energy Systems / Power / Sustainability Engineer",
      "robotics-automation": "Robotics / Automation / Mechatronics Engineer",
      "manufacturing-industrial": "Manufacturing / Industrial Engineer",
      "automotive-ev": "Automotive / EV / Autonomous Engineer",
      resumes: "Resumes",
      alumni: "Alumni",
    };

    // Get description for SWE (Generalist)
    const careerDescriptions: Record<string, string> = {
      swe: "Software Engineers (Generalists) build and maintain software systems across multiple areas of the stack. This role emphasizes strong fundamentals in programming, data structures, and system design, along with hands-on experience building real applications. It's a flexible path suited for students who want broad technical exposure and strong career mobility across industries.",
      cybersecurity: "Cybersecurity professionals protect systems, networks, and data from threats and attacks. This career path focuses on understanding security principles, cryptography, network defense, system vulnerabilities, and secure coding practices. Roles include Security Engineer, SOC Analyst, Penetration Tester, and Security Architect.",
      "ml-ai": "Machine Learning and AI professionals design systems that learn from data to make predictions, automate decisions, and solve complex problems. This career path focuses on understanding algorithms, statistical modeling, data processing, neural networks, and optimization techniques. It also emphasizes ethical AI, model evaluation, and deploying intelligent systems at scale. Roles include Machine Learning Engineer, Data Scientist, AI Researcher, and Applied AI Engineer.",
      "data-science": "Data Scientists and Data Analysts transform raw data into actionable insights that drive business decisions. This career path combines programming (Python/R), statistics, mathematics, and domain expertise to clean, analyze, visualize, and model data. Core skills include SQL, statistical inference, machine learning, and data storytelling. Roles include Data Scientist, Data Analyst, Business Intelligence Engineer, and Analytics Engineer.",
      systems: "Systems and Infrastructure Engineering professionals design, build, and maintain the core software systems that power modern computing environments. This career path focuses on understanding how software operates at scale, including operating systems, computer networks, distributed systems, and cloud infrastructure. It emphasizes performance, reliability, scalability, and fault tolerance, as well as low-level system behavior and resource management. Students also gain exposure to security, concurrency, and system design principles used in real-world production environments. Roles include Systems Engineer, Infrastructure Engineer, Backend Engineer, Site Reliability Engineer (SRE), and Platform Engineer.",
      embedded: "Embedded Systems Engineering professionals design, build, and program computing systems that are integrated into larger mechanical or electronic systems. This career path focuses on understanding how software interacts with hardware, including microcontrollers, sensors, actuators, and real-time systems. It emphasizes low-level programming, hardware-software co-design, real-time constraints, and resource optimization. Students gain exposure to firmware development, IoT systems, robotics, and cyber-physical systems. Roles include Embedded Systems Engineer, Firmware Engineer, IoT Engineer, Robotics Engineer, and Hardware-Software Integration Engineer.",
      "ux-ui": "UX/UI Design & Research professionals create user-centered products and experiences that combine cognitive science, design thinking, and technical skills. This career path focuses on understanding human behavior, conducting user research, designing intuitive interfaces, and collaborating with engineering teams. Students learn user research methods, prototyping, interaction design, visual design, and usability testing. It emphasizes both the psychological principles behind good design and the practical skills needed to create and validate designs. Roles include UX Designer, UI Designer, UX Researcher, Product Designer, Interaction Designer, and Design Engineer.",
      "data-analyst": "Data Analysts transform raw data into actionable insights that drive business decisions. This career path combines statistics, programming (Python/R/SQL), and domain expertise to collect, clean, analyze, visualize, and model data. Students learn statistical inference, hypothesis testing, database systems, data visualization, and experimental design. The path emphasizes both technical analytical skills and business communication—translating complex findings into clear recommendations. Roles include Data Analyst, Business Intelligence Analyst, Analytics Engineer, Marketing Analyst, Product Analyst, and Junior Data Scientist.",
      "market-research": "Market Research Analysts bridge consumer psychology, economic theory, and data analytics to understand market dynamics and inform business strategy. This career path integrates behavioral economics, statistical modeling, and business analytics to predict consumer behavior, analyze competitive landscapes, and forecast market trends. Students learn consumer decision-making, marketing strategy, econometrics, and data visualization. The path emphasizes both quantitative analytical skills and strategic thinking—translating market data into actionable business recommendations. Roles include Market Research Analyst, Consumer Insights Analyst, Business Analyst, Strategic Consultant, Product Marketing Analyst, and Competitive Intelligence Analyst.",
      "human-resources": "Human Resources Specialists manage the employee lifecycle and shape organizational culture by combining psychology, sociology, economics, and data analytics. This career path integrates industrial-organizational psychology, labor economics, and people analytics to optimize talent acquisition, development, retention, and organizational effectiveness. Students learn workplace behavior, compensation strategy, DEI principles, leadership development, and HR technology. The path emphasizes both interpersonal skills and data-driven decision-making—translating employee insights into strategic HR initiatives. Roles include HR Generalist, Talent Acquisition Specialist, Compensation Analyst, HR Business Partner, People Analytics Specialist, and Organizational Development Consultant.",
      "policy-research-analyst": "Policy / Research Analysts conduct research, analyze data, and provide evidence-based recommendations to inform public policy decisions. This career path combines political science, statistics, economics, and research methods to evaluate policy effectiveness, assess program outcomes, and support evidence-based policymaking. Students learn quantitative analysis, research design, statistical modeling, and policy evaluation techniques. The path emphasizes both analytical rigor and clear communication—translating complex research findings into actionable policy recommendations. Roles include Policy Analyst, Research Analyst, Program Evaluator, Policy Researcher, and Data Analyst in government, think tanks, and nonprofit organizations.",
      "legislative-aide-government-staff": "Legislative Aides and Government Staff support elected officials and government agencies by managing constituent services, drafting legislation, conducting research, and coordinating policy implementation. This career path combines political science, public administration, and communication skills to navigate government processes, understand legislative procedures, and serve as a bridge between constituents and policymakers. Students learn about American political institutions, legislative processes, public policy analysis, and government operations. The path emphasizes both practical skills in government operations and strong communication abilities—translating complex policy issues into clear, actionable information. Roles include Legislative Aide, Congressional Staffer, Policy Assistant, Constituent Services Representative, and Government Program Coordinator.",
      "public-administration-nonprofit-program-coordinator": "Public Administration and Nonprofit Program Coordinators manage programs, coordinate services, and oversee operations in government agencies and nonprofit organizations. This career path combines management principles, public policy analysis, and organizational leadership to design, implement, and evaluate programs that serve communities. Students learn about organizational behavior, program management, grant writing, budgeting, and stakeholder engagement. The path emphasizes both strategic planning and operational execution—translating policy goals into effective programs that deliver measurable outcomes. Roles include Program Coordinator, Nonprofit Manager, Public Administrator, Grant Writer, Community Program Manager, and Service Coordinator.",
      "mechanical-design": "Mechanical Design Engineers create, analyze, and optimize mechanical systems and products. This career path focuses on CAD, FEA, materials selection, and design for manufacturability. Essential for roles in product design, automotive engineering, consumer products, and industrial equipment. Students learn structural analysis, thermal systems, manufacturing processes, and design optimization. The path emphasizes both creative problem-solving and technical rigor—translating design requirements into functional, manufacturable products.",
      "aerospace-defense": "Aerospace / Defense Engineers design and develop aircraft, spacecraft, missiles, and defense systems. This career path focuses on aerodynamics, propulsion, flight dynamics, structures, and control systems. Essential for roles in aerospace companies, defense contractors, and government agencies. Students learn advanced fluid mechanics, structural analysis, propulsion systems, and flight control. The path emphasizes both fundamental aerospace principles and advanced computational tools—translating complex physics into safe, high-performance flight vehicles and defense systems. Roles include Aerospace Engineer, Flight Systems Engineer, Propulsion Engineer, Structures Engineer, and Defense Systems Engineer.",
      "energy-sustainability": "Energy Systems / Power / Sustainability Engineers design and optimize energy conversion, storage, and distribution systems for a sustainable future. This career path focuses on thermodynamics, heat transfer, renewable energy, power electronics, and energy storage. Essential for roles in renewable energy companies, utilities, electric vehicle manufacturers, and sustainable technology firms. Students learn energy conversion principles, thermal system design, electrical machines, battery technologies, and grid integration. The path emphasizes both fundamental energy principles and emerging clean technologies—translating physics and engineering into efficient, sustainable energy solutions. Roles include Energy Engineer, Power Systems Engineer, Sustainability Engineer, Battery Engineer, and Renewable Energy Specialist.",
      "robotics-automation": "Robotics / Automation / Mechatronics Engineers design, build, and program intelligent machines and automated systems that integrate mechanical, electrical, and software engineering. This career path focuses on control systems, sensors and actuators, embedded systems, machine dynamics, and system integration. Essential for roles in robotics companies, industrial automation, autonomous vehicles, and advanced manufacturing. Students learn mechatronics design, control theory, microcontroller programming, robot kinematics, and sensor fusion. The path emphasizes both hardware-software integration and real-time systems—translating control algorithms into physical robotic systems and automation equipment. Roles include Robotics Engineer, Automation Engineer, Mechatronics Engineer, Controls Engineer, and Embedded Systems Engineer.",
      "manufacturing-industrial": "Manufacturing / Industrial Engineers optimize production processes, improve quality, and increase efficiency in manufacturing operations. This career path focuses on manufacturing processes, statistical quality control, economic analysis, process optimization, and production systems. Essential for roles in manufacturing companies, supply chain management, operations consulting, and industrial automation. Students learn manufacturing methods, quality assurance techniques, data analysis, cost optimization, and lean/Six Sigma methodologies. The path emphasizes both technical manufacturing knowledge and business acumen—translating engineering principles into efficient, cost-effective production systems. Roles include Manufacturing Engineer, Industrial Engineer, Process Engineer, Quality Engineer, Production Engineer, and Operations Analyst.",
      "automotive-ev": "Automotive / EV / Autonomous Engineers design and develop next-generation vehicles including electric vehicles, autonomous systems, and advanced automotive technologies. This career path focuses on vehicle dynamics, electric powertrains, power electronics, control systems, and autonomous driving technologies. Essential for roles at automotive OEMs, EV startups like Tesla/Rivian/Lucid, autonomous vehicle companies like Waymo/Cruise, and automotive suppliers. Students learn multi-body dynamics, electric motors and drives, battery systems, aerodynamics, mechatronics, and autonomous vehicle systems. The path emphasizes both mechanical and electrical engineering—translating cutting-edge technology into safe, efficient, and intelligent vehicles. Roles include Automotive Engineer, EV Powertrain Engineer, Autonomous Vehicle Engineer, Battery Systems Engineer, Vehicle Dynamics Engineer, and ADAS Engineer.",
    };

    // Handle special sections (Resumes, Alumni)
    if (selectedCareerPath === "resumes") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Resumes - {selectedDegree}
              </h2>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Explore resume examples, templates, and best practices for {selectedDegree} students.
              </p>
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
              <p className="text-lg text-muted-foreground text-center py-8">
                Resume resources and examples coming soon...
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerPath === "alumni") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Alumni - {selectedDegree}
              </h2>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Connect with {selectedDegree} alumni and learn about their career journeys and experiences.
              </p>
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
              <p className="text-lg text-muted-foreground text-center py-8">
                Alumni profiles and stories coming soon...
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Show SWE career path with graph
    if (selectedCareerPath === "swe") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Reset and Format buttons for career path graph - separate from CS/CSE reset */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatCareerPathReady && formatCareerPathGraphRef.current) {
                    formatCareerPathGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatCareerPathReady && formatCareerPathGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatCareerPathReady && formatCareerPathGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetCareerPathReady && resetCareerPathGraphRef.current) {
                    resetCareerPathGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetCareerPathReady && resetCareerPathGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetCareerPathReady && resetCareerPathGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <CareerPathGraph 
                onResetReady={handleResetCareerPathReady.current}
                onFormatReady={handleFormatCareerPathReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Cybersecurity career path with graph
    if (selectedCareerPath === "cybersecurity") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatCybersecurityReady && formatCybersecurityGraphRef.current) {
                    formatCybersecurityGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatCybersecurityReady && formatCybersecurityGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatCybersecurityReady && formatCybersecurityGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetCybersecurityReady && resetCybersecurityGraphRef.current) {
                    resetCybersecurityGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetCybersecurityReady && resetCybersecurityGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetCybersecurityReady && resetCybersecurityGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <CybersecurityCareerPathGraph 
                onResetReady={handleResetCybersecurityReady.current}
                onFormatReady={handleFormatCybersecurityReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show ML-AI career path with graph
    if (selectedCareerPath === "ml-ai") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatMLAIReady && formatMLAIGraphRef.current) {
                    formatMLAIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatMLAIReady && formatMLAIGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatMLAIReady && formatMLAIGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetMLAIReady && resetMLAIGraphRef.current) {
                    resetMLAIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetMLAIReady && resetMLAIGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetMLAIReady && resetMLAIGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <MLAICareerPathGraph 
                onResetReady={handleResetMLAIReady.current}
                onFormatReady={handleFormatMLAIReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Data Science career path with graph
    if (selectedCareerPath === "data-science") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatDataScienceReady && formatDataScienceGraphRef.current) {
                    formatDataScienceGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatDataScienceReady && formatDataScienceGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatDataScienceReady && formatDataScienceGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetDataScienceReady && resetDataScienceGraphRef.current) {
                    resetDataScienceGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetDataScienceReady && resetDataScienceGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetDataScienceReady && resetDataScienceGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <DataScienceCareerPathGraph 
                onResetReady={handleResetDataScienceReady.current}
                onFormatReady={handleFormatDataScienceReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Systems / Infrastructure Engineering career path with graph
    if (selectedCareerPath === "systems") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatSystemsInfraReady && formatSystemsInfraGraphRef.current) {
                    formatSystemsInfraGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatSystemsInfraReady && formatSystemsInfraGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatSystemsInfraReady && formatSystemsInfraGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetSystemsInfraReady && resetSystemsInfraGraphRef.current) {
                    resetSystemsInfraGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetSystemsInfraReady && resetSystemsInfraGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetSystemsInfraReady && resetSystemsInfraGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <SystemsInfraCareerPathGraph 
                onResetReady={handleResetSystemsInfraReady.current}
                onFormatReady={handleFormatSystemsInfraReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Embedded Systems Engineering career path with graph
    if (selectedCareerPath === "embedded") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatEmbeddedSystemsReady && formatEmbeddedSystemsGraphRef.current) {
                    formatEmbeddedSystemsGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatEmbeddedSystemsReady && formatEmbeddedSystemsGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatEmbeddedSystemsReady && formatEmbeddedSystemsGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetEmbeddedSystemsReady && resetEmbeddedSystemsGraphRef.current) {
                    resetEmbeddedSystemsGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetEmbeddedSystemsReady && resetEmbeddedSystemsGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetEmbeddedSystemsReady && resetEmbeddedSystemsGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <EmbeddedSystemsCareerPathGraph 
                onResetReady={handleResetEmbeddedSystemsReady.current}
                onFormatReady={handleFormatEmbeddedSystemsReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show UX/UI career path with graph
    if (selectedCareerPath === "ux-ui") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatUXUIReady && formatUXUIGraphRef.current) {
                    formatUXUIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatUXUIReady && formatUXUIGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatUXUIReady && formatUXUIGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetUXUIReady && resetUXUIGraphRef.current) {
                    resetUXUIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetUXUIReady && resetUXUIGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetUXUIReady && resetUXUIGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <UXUICareerPathGraph 
                onResetReady={handleResetUXUIReady.current}
                onFormatReady={handleFormatUXUIReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerPath === "data-analyst") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatDataAnalystReady && formatDataAnalystGraphRef.current) {
                    formatDataAnalystGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatDataAnalystReady && formatDataAnalystGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatDataAnalystReady && formatDataAnalystGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetDataAnalystReady && resetDataAnalystGraphRef.current) {
                    resetDataAnalystGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetDataAnalystReady && resetDataAnalystGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetDataAnalystReady && resetDataAnalystGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <DataAnalystCareerPathGraph 
                onResetReady={handleResetDataAnalystReady.current}
                onFormatReady={handleFormatDataAnalystReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerPath === "market-research") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatMarketResearchReady && formatMarketResearchGraphRef.current) {
                    formatMarketResearchGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatMarketResearchReady && formatMarketResearchGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatMarketResearchReady && formatMarketResearchGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetMarketResearchReady && resetMarketResearchGraphRef.current) {
                    resetMarketResearchGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetMarketResearchReady && resetMarketResearchGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetMarketResearchReady && resetMarketResearchGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <MarketResearchCareerPathGraph 
                onResetReady={handleResetMarketResearchReady.current}
                onFormatReady={handleFormatMarketResearchReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerPath === "human-resources") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                {careerPathNames[selectedCareerPath]} - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              {careerDescriptions[selectedCareerPath] && (
                <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                  {careerDescriptions[selectedCareerPath]}
                </p>
              )}
            </div>
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatHumanResourcesReady && formatHumanResourcesGraphRef.current) {
                    formatHumanResourcesGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatHumanResourcesReady && formatHumanResourcesGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatHumanResourcesReady && formatHumanResourcesGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetHumanResourcesReady && resetHumanResourcesGraphRef.current) {
                    resetHumanResourcesGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetHumanResourcesReady && resetHumanResourcesGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetHumanResourcesReady && resetHumanResourcesGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <HumanResourcesCareerPathGraph 
                onResetReady={handleResetHumanResourcesReady.current}
                onFormatReady={handleFormatHumanResourcesReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Mechanical Design Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "mechanical-design") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Mechanical Design Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Mechanical Design Engineers create, analyze, and optimize mechanical systems and products. Focus on CAD, FEA, materials selection, and design for manufacturability. Essential for roles in product design, automotive engineering, consumer products, and industrial equipment.
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-mechanical-design-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-mechanical-design-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <MechanicalDesignCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-mechanical-design-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-mechanical-design-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-mechanical-design-format style={{ display: 'none' }}></button>
              <button data-mechanical-design-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }

    // Show Aerospace / Defense Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "aerospace-defense") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Aerospace / Defense Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Aerospace / Defense Engineers design and develop aircraft, spacecraft, missiles, and defense systems. Focus on aerodynamics, propulsion, flight dynamics, structures, and control systems. Essential for roles in aerospace companies, defense contractors, and government agencies.
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-aerospace-defense-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-aerospace-defense-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <AerospaceDefenseCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-aerospace-defense-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-aerospace-defense-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-aerospace-defense-format style={{ display: 'none' }}></button>
              <button data-aerospace-defense-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }

    // Show Energy Systems / Power / Sustainability Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "energy-sustainability") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Energy Systems / Power / Sustainability Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Energy Systems / Power / Sustainability Engineers design and optimize energy conversion, storage, and distribution systems for a sustainable future. Focus on thermodynamics, heat transfer, renewable energy, power electronics, and energy storage. Essential for roles in renewable energy companies, utilities, and electric vehicle manufacturers.
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-energy-sustainability-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-energy-sustainability-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <EnergySustainabilityCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-energy-sustainability-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-energy-sustainability-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-energy-sustainability-format style={{ display: 'none' }}></button>
              <button data-energy-sustainability-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }

    // Show Robotics / Automation / Mechatronics Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "robotics-automation") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Robotics / Automation / Mechatronics Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Robotics / Automation / Mechatronics Engineers design, build, and program intelligent machines and automated systems. Focus on control systems, sensors and actuators, embedded systems, robot kinematics, and system integration. Essential for roles in robotics companies, industrial automation, autonomous vehicles, and advanced manufacturing.
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-robotics-automation-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-robotics-automation-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <RoboticsAutomationCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-robotics-automation-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-robotics-automation-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-robotics-automation-format style={{ display: 'none' }}></button>
              <button data-robotics-automation-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }

    // Show Manufacturing / Industrial Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "manufacturing-industrial") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Manufacturing / Industrial Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Manufacturing / Industrial Engineers optimize production processes, improve quality, and increase efficiency in manufacturing operations. Focus on manufacturing processes, quality control, economic analysis, and lean/Six Sigma methodologies. Essential for roles in manufacturing, supply chain management, and operations consulting.
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-manufacturing-industrial-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-manufacturing-industrial-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <ManufacturingIndustrialCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-manufacturing-industrial-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-manufacturing-industrial-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-manufacturing-industrial-format style={{ display: 'none' }}></button>
              <button data-manufacturing-industrial-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }

    // Show Automotive / EV / Autonomous Engineer career path for Mechanical Engineering
    if (selectedDegree === "Mechanical Engineering" && selectedCareerPath === "automotive-ev") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Automotive / EV / Autonomous Engineer - {selectedDegree}
              </h2>
              <p className="text-black mb-5">
                Career pathway information and recommended courses
              </p>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Automotive / EV / Autonomous Engineers design next-generation vehicles including electric powertrains, autonomous systems, and advanced automotive technologies. Focus on vehicle dynamics, electric motors and drives, power electronics, control systems, and autonomous driving. Essential for roles at automotive OEMs, EV startups (Tesla, Rivian, Lucid), and autonomous vehicle companies (Waymo, Cruise).
              </p>
            </div>
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  const formatBtn = document.querySelector('[data-automotive-ev-format]') as HTMLButtonElement;
                  if (formatBtn) formatBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                title="Format graph to prevent overlap"
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  const resetBtn = document.querySelector('[data-automotive-ev-reset]') as HTMLButtonElement;
                  if (resetBtn) resetBtn.click();
                }}
                className="text-sm transition-colors font-medium px-4 py-2 rounded-md border text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                title="Reset career path graph view"
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <AutomotiveEVCareerPathGraph 
                onResetReady={(resetFn) => {
                  const btn = document.querySelector('[data-automotive-ev-reset]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = resetFn;
                  }
                }}
                onFormatReady={(formatFn) => {
                  const btn = document.querySelector('[data-automotive-ev-format]') as HTMLButtonElement;
                  if (btn) {
                    btn.onclick = formatFn;
                  }
                }}
              />
              <button data-automotive-ev-format style={{ display: 'none' }}></button>
              <button data-automotive-ev-reset style={{ display: 'none' }}></button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Show degree overview if degree selected but no career path
  // Show prerequisite graph for CS/CSE
  if (selectedDegree === "CS/CSE") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              {selectedDegree}
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Computer Science / Computer Science & Engineering (CS/CSE) is the study of how computational systems are designed, built, and used to solve real-world problems. The major combines strong foundations in programming, algorithms, mathematics, and systems with engineering principles to understand both software and hardware. Students learn to think analytically, design efficient solutions, and apply computing to areas such as data, artificial intelligence, networks, and technology-driven innovation.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full CS/CSE academic foundation at UC Merced. Use the graph below to understand how core math, science, and CS courses connect, what depends on what, and how early choices affect later flexibility.
            </p>
          </div>
          <div className="mb-8">
            <GraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetClick={resetPrerequisiteReady ? resetPrerequisiteGraphRef.current || undefined : undefined}
              onFullResetClick={fullResetPrerequisiteReady ? fullResetPrerequisiteGraphRef.current || undefined : undefined}
            />
          </div>
          <div className="mb-10">
            <PrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetPrerequisiteReady.current}
              onFullResetReady={handleFullResetPrerequisiteReady.current}
            />
          </div>
          
          {/* CS/CSE Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              CS/CSE Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show COGS degree overview if selected
  if (selectedDegree === "COGS") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              Cognitive Science (COGS)
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Cognitive Science is an interdisciplinary field that studies the mind and intelligence, integrating perspectives from psychology, neuroscience, computer science, linguistics, and philosophy. Students explore how humans and machines process information, make decisions, and learn. The major prepares students for careers in research, human-computer interaction, AI, user experience design, and education.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full COGS academic foundation at UC Merced. Use the graph below to understand how cognitive science courses connect across psychology, neuroscience, and computation.
            </p>
          </div>
          <div className="mb-8">
            <GraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetClick={resetPrerequisiteReady ? resetPrerequisiteGraphRef.current || undefined : undefined}
              onFullResetClick={fullResetPrerequisiteReady ? fullResetPrerequisiteGraphRef.current || undefined : undefined}
            />
          </div>
          <div className="mb-10">
            <COGSPrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetPrerequisiteReady.current}
              onFullResetReady={handleFullResetPrerequisiteReady.current}
            />
          </div>
          
          {/* COGS Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              COGS Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Electrical Engineering degree overview if selected
  if (selectedDegree === "Electrical Engineering") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              Electrical Engineering
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Electrical Engineering is the study of how electrical and electronic systems are designed, analyzed, and applied to solve real-world problems. The major combines strong foundations in circuit theory, electromagnetics, signals and systems, and control theory with hands-on laboratory experience. Students learn to design power systems, communication networks, embedded systems, VLSI circuits, and electronic devices that power modern technology.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full Electrical Engineering academic foundation at UC Merced. Use the graph below to understand how core math, physics, chemistry, and EE courses connect, what depends on what, and how early choices affect later specialization options.
            </p>
          </div>
          <div className="mb-8">
            <EEGraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetPositions={resetEEReady ? resetEEGraphRef.current || undefined : undefined}
              onFullReset={fullResetEEReady ? fullResetEEGraphRef.current || undefined : undefined}
            />
          </div>
          <div className="mb-10">
            <EEPrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetEEReady.current}
              onFullResetReady={handleFullResetEEReady.current}
            />
          </div>
          
          {/* EE Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              Electrical Engineering Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      );
  }

  // Show Mechanical Engineering degree overview if selected
  if (selectedDegree === "Mechanical Engineering") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              Mechanical Engineering
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Mechanical Engineering is the study of how mechanical systems are designed, analyzed, and optimized to solve real-world problems. The major combines strong foundations in mathematics, physics, thermodynamics, mechanics, and materials science with hands-on design and manufacturing experience. Students learn to create innovative solutions for energy systems, robotics, aerospace, automotive, and manufacturing industries.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full Mechanical Engineering academic foundation at UC Merced. Use the graph below to understand how core math, physics, chemistry, and ME courses connect, organized by year with color-coded nodes (Year 1: Blue, Year 2: Green, Year 3: Amber, Year 4: Purple).
            </p>
          </div>
          <div className="mb-8">
            <MEGraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetClick={resetMEReady ? resetMEGraphRef.current || undefined : undefined}
              onFullResetClick={fullResetMEReady ? fullResetMEGraphRef.current || undefined : undefined}
              onExportPositionsClick={exportMEPositionsRef.current || undefined}
            />
          </div>
          <div className="mb-10">
            <MEPrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetMEReady.current}
              onFullResetReady={handleFullResetMEReady.current}
              onExportPositionsReady={handleExportMEPositionsReady.current}
            />
          </div>
          
          {/* ME Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              Mechanical Engineering Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Political Science degree overview if selected
  if (selectedDegree === "Political Science") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              Political Science
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Political Science is the study of government, political processes, political behavior, and public policy. The major combines strong foundations in political theory, comparative politics, international relations, and American politics with analytical and research skills. Students learn to think critically about power, governance, and political systems while developing skills in data analysis, research methods, and policy evaluation.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full Political Science academic foundation at UC Merced. Use the graph below to understand how core courses connect and what depends on what.
            </p>
          </div>
          <div className="mb-8">
            <PoliticalScienceGraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetClick={resetPoliticalScienceReady ? resetPoliticalScienceGraphRef.current || undefined : undefined}
              onFullResetClick={fullResetPoliticalScienceReady ? fullResetPoliticalScienceGraphRef.current || undefined : undefined}
              onExportPositionsClick={exportPoliticalSciencePositionsRef.current || undefined}
            />
          </div>
          <div className="mb-10">
            <PoliticalSciencePrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetPoliticalScienceReady.current}
              onFullResetReady={handleFullResetPoliticalScienceReady.current}
              onExportPositionsReady={handleExportPoliticalSciencePositionsReady.current}
            />
          </div>
          
          {/* Political Science Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              Political Science Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view for other degrees
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-2">
            {selectedDegree}
          </h2>
          <p className="text-muted-foreground">
            Select a career path from the sidebar to explore recommended courses and career guidance.
          </p>
        </div>
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
          <p className="text-xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-4">
            Choose a Career Path
          </p>
          <p className="text-sm text-muted-foreground">
            Expand {selectedDegree} in the sidebar and select a career path to get started
          </p>
        </div>
      </div>
    </div>
  );
}

