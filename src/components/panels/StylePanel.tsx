
import React from "react";
import { Palette, Layers, Box, Sparkles, Circle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LabeledSlider, ColorInput, SectionHeader } from "../ui-helpers";
import { CardSettings } from "../../types/card";

interface StylePanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
  selectTool: (toolId: string) => void;
}

export default function StylePanel({ card, updateCard, selectTool }: StylePanelProps) {
  const getUniformBorderRadius = (): number => card.cardBorderRadius.topLeft;

  const updateUniformBorderRadius = (value: number) => {
    const numValue = Math.max(0, value);
    updateCard({
      cardBorderRadius: {
        topLeft: numValue,
        topRight: numValue,
        bottomLeft: numValue,
        bottomRight: numValue,
        unit: card.cardBorderRadius.unit,
      },
    });
  };

  return (
    <div className="space-y-5">
      <SectionHeader icon={Palette} title="Background" />
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={!card.bgGradientTo ? "secondary" : "outline"}
          onClick={() => updateCard({ bgGradientTo: undefined }, true)}
          className="p-3 h-auto bg-purple-600/20 border-purple-500/50 text-white hover:bg-purple-600/30 flex flex-col items-center text-center"
        >
          <Circle className="w-5 h-5 mb-1.5 text-purple-400" />
          <span className="text-xs font-medium">Solid Color</span>
          <span className="text-gray-400 text-[10px]">Single color</span>
        </Button>
        <Button
          variant={card.bgGradientTo ? "secondary" : "outline"}
          onClick={() => {
            selectTool("gradient");
            updateCard({ bgGradientTo: card.bgGradientTo || "#8b5cf6" }, true);
          }}
          className="p-3 h-auto bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-700/80 flex flex-col items-center text-center"
        >
          <Square className="w-5 h-5 mb-1.5 text-gray-400" />
          <span className="text-xs font-medium">Gradient</span>
          <span className="text-gray-400 text-[10px]">Color blend</span>
        </Button>
      </div>
      
      <div className="flex items-start gap-3">
        <ColorInput
          label="Color"
          value={card.bgGradientFrom}
          onChange={(val) => updateCard({ bgGradientFrom: val }, true)}
          className="w-16"
        />
        <LabeledSlider
          label="Opacity"
          value={card.cardOpacity}
          onValueChange={(val) => updateCard({ cardOpacity: val })}
          max={100}
          unit="%"
          className="flex-1"
        />
      </div>
      
      <SectionHeader icon={Layers} title="Appearance" />
      <LabeledSlider
        label="Border Radius"
        value={getUniformBorderRadius()}
        onValueChange={updateUniformBorderRadius}
        max={60}
        unit={card.cardBorderRadius.unit}
      />
      
      <div className="bg-gray-800/50 p-3.5 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-white font-medium text-sm">Glassmorphism</div>
              <div className="text-gray-400 text-xs">Frosted glass effect</div>
            </div>
          </div>
          <Switch
            checked={card.enableHoverEffects}
            onCheckedChange={(checked) => updateCard({ enableHoverEffects: checked }, true)}
          />
        </div>
      </div>
      
      <SectionHeader icon={Box} title="Dimensions" />
      <div className="grid grid-cols-2 gap-3">
        <LabeledSlider
          label="Width"
          value={card.cardWidth}
          onValueChange={(val) => updateCard({ cardWidth: Math.max(50, val) })}
          min={150}
          max={800}
          unit="px"
        />
        <LabeledSlider
          label="Height"
          value={card.cardHeight}
          onValueChange={(val) => updateCard({ cardHeight: Math.max(50, val) })}
          min={100}
          max={600}
          unit="px"
        />
      </div>
    </div>
  );
}
