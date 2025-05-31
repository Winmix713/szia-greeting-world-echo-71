import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Layers, Type, Settings, Sparkles, Box, X, ChevronUp, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import StylePanel from './StylePanel';
import GradientPanel from './GradientPanel';
import ShadowPanel from './ShadowPanel';
import TypographyPanel from './TypographyPanel';
import EffectsPanel from './EffectsPanel';
import PresetsPanel from './PresetsPanel';
import { CardSettings, ToolDefinition } from '../../types/card';
import { debounce } from '../../utils/helpers';

interface DockbarProps {
  activeCard: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const DOCK_TOOLS: ToolDefinition[] = [
  { id: "style", icon: Palette, label: "Style Controls" },
  { id: "gradient", icon: Layers, label: "Gradient Builder" },
  { id: "shadow", icon: Box, label: "Shadow & Depth" },
  { id: "text", icon: Type, label: "Typography" },
  { id: "effects", icon: Sparkles, label: "Advanced Effects" },
  { id: "presets", icon: Settings, label: "Smart Presets" },
];

const Dockbar: React.FC<DockbarProps> = ({ activeCard, updateCard: rawUpdateCard }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState("style");

  const debouncedUpdateCard = useMemo(() => debounce(rawUpdateCard, 300), [rawUpdateCard]);

  const updateCard = useCallback(
    (updates: Partial<CardSettings>, immediate = false) => {
      if (immediate) {
        rawUpdateCard(updates);
      } else {
        debouncedUpdateCard(updates);
      }
    },
    [rawUpdateCard, debouncedUpdateCard]
  );

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  const selectTool = useCallback((toolId: string) => {
    setActiveTool(toolId);
    if (!isExpanded && DOCK_TOOLS.find((t) => t.id === toolId)) {
      setIsExpanded(true);
    }
  }, [isExpanded]);

  const getColorForToolHeader = useCallback((toolId: string): string => {
    const colorMap: { [key: string]: string } = {
      style: "from-blue-500/70 to-purple-600/70", 
      gradient: "from-pink-500/70 to-orange-500/70",
      shadow: "from-green-500/70 to-teal-500/70", 
      text: "from-teal-500/70 to-cyan-500/70",
      effects: "from-pink-600/70 to-red-500/70", 
      presets: "from-purple-500/70 to-blue-600/70",
    };
    return colorMap[toolId] || "from-gray-500/70 to-gray-600/70";
  }, []);

  const currentToolData = useMemo(() => DOCK_TOOLS.find((t) => t.id === activeTool), [activeTool]);
  const ToolIcon = currentToolData?.icon;

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-end gap-2 p-3 rounded-3xl bg-gradient-to-b from-black/20 to-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      <div className="flex items-center gap-2">
        {DOCK_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              className={`flex items-center justify-center w-12 h-12 rounded-xl border-none cursor-pointer transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm text-white scale-105 shadow-md" 
                  : "bg-transparent text-white hover:bg-white/10"
              }`}
              onClick={() => selectTool(tool.id)}
              title={tool.label}
            >
              <tool.icon size={20} />
            </button>
          );
        })}
        <div className="w-px h-8 bg-white/10 mx-1"></div>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white transition-all duration-200 hover:bg-white/15 hover:scale-105"
          onClick={toggleExpanded}
          title={isExpanded ? "Collapse panel" : "Expand panel"}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && currentToolData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350, duration: 0.3 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 min-w-[480px] max-w-[90vw] max-h-[calc(100vh-200px)] overflow-y-auto bg-gradient-to-b from-black/25 to-white/8 backdrop-blur-3xl border border-white/10 rounded-2xl text-white shadow-2xl"
          >
            <div className={`bg-gradient-to-r ${getColorForToolHeader(activeTool)} p-5 sticky top-0 z-10`}>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {ToolIcon && <ToolIcon className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-white">{currentToolData.label}</h3>
                    <p className="text-white/70 text-xs">Customize your card</p>
                  </div>
                </div>
                <Button
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsExpanded(false)}
                  className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {activeTool === "style" && (
                <StylePanel card={activeCard} updateCard={updateCard} selectTool={selectTool} />
              )}
              
              {activeTool === "gradient" && (
                <GradientPanel card={activeCard} updateCard={updateCard} />
              )}
              
              {activeTool === "shadow" && (
                <ShadowPanel card={activeCard} updateCard={updateCard} />
              )}
              
              {activeTool === "text" && (
                <TypographyPanel card={activeCard} updateCard={updateCard} />
              )}
              
              {activeTool === "effects" && (
                <EffectsPanel card={activeCard} updateCard={updateCard} />
              )}
              
              {activeTool === "presets" && (
                <PresetsPanel card={activeCard} updateCard={updateCard} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dockbar;