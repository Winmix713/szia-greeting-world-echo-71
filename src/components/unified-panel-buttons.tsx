import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Settings, 
  Layers, 
  Type,
  Sparkles,
  Box,
  Download, 
  Share, 
  Shuffle, 
  Undo, 
  Redo,
  Eye,
  Code,
  Image as ImageIcon
} from "lucide-react";

interface UnifiedPanelButtonsProps {
  onOpenPanel: (panel: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onRandomize: () => void;
  onExport: () => void;
  onShare: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function UnifiedPanelButtons({
  onOpenPanel,
  onUndo,
  onRedo,
  onRandomize,
  onExport,
  onShare,
  canUndo,
  canRedo,
}: UnifiedPanelButtonsProps) {
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const containerVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 z-30">
      {/* Panel Navigation Buttons - matching the attached image style */}
      <button
        onClick={() => onOpenPanel('style')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="Style Controls"
      >
        <Palette className="w-5 h-5 text-gray-300" />
      </button>

      <button
        onClick={() => onOpenPanel('gradient')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="Gradient Builder"
      >
        <Layers className="w-5 h-5 text-gray-300" />
      </button>

      <button
        onClick={() => onOpenPanel('shadow')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="3D Shadow"
      >
        <Box className="w-5 h-5 text-gray-300" />
      </button>

      <button
        onClick={() => onOpenPanel('typography')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="Typography"
      >
        <Type className="w-5 h-5 text-gray-300" />
      </button>

      <button
        onClick={() => onOpenPanel('effects')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="Advanced Effects"
      >
        <Sparkles className="w-5 h-5 text-gray-300" />
      </button>

      <button
        onClick={() => onOpenPanel('presets')}
        className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors"
        title="Smart Presets"
      >
        <Settings className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
}