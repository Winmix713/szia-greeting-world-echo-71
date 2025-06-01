
import React, { useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// LabeledSlider Component
interface LabeledSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export const LabeledSlider = React.memo(({
  label,
  value,
  onValueChange,
  min = 0,
  max,
  step = 1,
  unit = "",
  className = "",
}: LabeledSliderProps) => {
  const sliderId = useMemo(() => 
    `slider-${label.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`, 
    [label]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={sliderId} className="text-gray-400 text-sm">
          {label}
        </label>
        <span className="text-purple-400 font-medium text-sm min-w-[40px] text-right">
          {value}{unit}
        </span>
      </div>
      <Slider
        id={sliderId}
        value={[value]}
        onValueChange={([val]) => onValueChange(val)}
        min={min}
        max={max}
        step={step}
        className="my-1"
      />
    </div>
  );
});

LabeledSlider.displayName = "LabeledSlider";

// ColorInput Component
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorInput = React.memo(({ label, value, onChange, className = "" }: ColorInputProps) => {
  const inputId = useMemo(() => 
    `color-${label.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`, 
    [label]
  );

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={inputId} className="text-white font-medium text-sm block">
        {label}
      </label>
      <input
        id={inputId}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border-2 border-purple-500/50 cursor-pointer bg-transparent p-0.5"
      />
    </div>
  );
});

ColorInput.displayName = "ColorInput";

// SectionHeader Component
interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColorClass?: string;
}

export const SectionHeader = React.memo(({
  icon: Icon,
  title,
  iconColorClass = "text-purple-400",
}: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-3 pt-2 border-t border-white/10 first:border-t-0 first:pt-0">
    <Icon className={`w-4 h-4 ${iconColorClass}`} />
    <h4 className="text-white font-medium">{title}</h4>
  </div>
));

SectionHeader.displayName = "SectionHeader";
