
import { CardSettings } from "../types/card";

export const DEBOUNCE_DELAY = 300;

export const DEFAULT_CARD_SETTINGS: CardSettings = {
  bgGradientFrom: "#3b82f6",
  bgGradientTo: "#8b5cf6",
  cardOpacity: 100,
  cardBorderRadius: {
    topLeft: 12,
    topRight: 12,
    bottomLeft: 12,
    bottomRight: 12,
    unit: "px",
  },
  enableHoverEffects: false,
  cardWidth: 300,
  cardHeight: 200,
  bgOpacityFrom: 100,
  bgOpacityTo: 100,
  gradientAngle: 135,
  shadowSettings: { x: 0, y: 10, blur: 20, spread: 0 },
  shadowColor: "#000000",
  shadowOpacity: 0.25,
  titleFont: "Inter",
  titleWeight: "600",
  titleSize: 18,
  titleAlign: "left",
  descriptionFont: "Inter",
  descriptionWeight: "400",
  descriptionSize: 14,
  descriptionAlign: "left",
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  enableAnimations: false,
};

export const DOCK_TOOLS = [
  { id: "style", icon: "Palette", label: "Style Controls" },
  { id: "gradient", icon: "Layers", label: "Gradient Builder" },
  { id: "shadow", icon: "Box", label: "Shadow & Depth" },
  { id: "text", icon: "Type", label: "Typography" },
  { id: "effects", icon: "Sparkles", label: "Advanced Effects" },
  { id: "presets", icon: "Settings", label: "Smart Presets" },
] as const;
