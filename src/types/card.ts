
export interface CardBorderRadius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  unit: "px" | "%" | "em" | "rem";
}

export interface ShadowSettings {
  x: number;
  y: number;
  blur: number;
  spread: number;
}

export interface CardSettings {
  title?: string;
  description?: string;
  bgGradientFrom: string;
  bgGradientTo?: string;
  cardOpacity: number;
  cardBorderRadius: CardBorderRadius;
  enableHoverEffects: boolean;
  cardWidth: number;
  cardHeight: number;
  bgOpacityFrom: number;
  bgOpacityTo: number;
  gradientAngle: number;
  shadowSettings?: ShadowSettings;
  shadowColor: string;
  shadowOpacity: number;
  titleFont: string;
  titleWeight: string;
  titleSize: number;
  titleAlign: "left" | "center" | "right" | "justify";
  descriptionFont: string;
  descriptionWeight: string;
  descriptionSize: number;
  descriptionAlign: "left" | "center" | "right" | "justify";
  rotation: number;
  scaleX: number;
  scaleY: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  enableAnimations: boolean;
}

export type CardUpdateFunction = (updates: Partial<CardSettings>, immediate?: boolean) => void;
