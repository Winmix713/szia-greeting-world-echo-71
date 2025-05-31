import { 
  Undo, 
  Redo, 
  Layout, 
  Palette, 
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Layers,
  Shuffle
} from "lucide-react";
import { CardData } from "../../types/card";

interface CardEditorToolbarProps {
  activeCard: CardData;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenPanel: (panel: string) => void;
  onUpdateCard: (updates: Partial<CardData>) => void;
  onGenerateRandom: () => void;
}

export default function CardEditorToolbar({
  activeCard,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenPanel,
  onUpdateCard,
  onGenerateRandom
}: CardEditorToolbarProps) {
  return (
    <div className="flex items-center justify-center px-3 py-1 border-b border-gray-700 bg-gray-900 flex-shrink-0 gap-1">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50" 
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button 
          onClick={onRedo}
          disabled={!canRedo}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50" 
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2"></div>

      {/* Layout and Insert */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={() => onOpenPanel('style')}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Layout Options"
        >
          <Layout className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onOpenPanel('style')}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Theme"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2"></div>

      {/* Font */}
      <div className="flex items-center gap-0.5">
        <button className="flex items-center min-w-15 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" title="Font">
          {activeCard.titleFont || 'Inter'}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
        <button className="flex items-center min-w-10 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" title="Font Size">
          {activeCard.titleSize || 18}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2"></div>

      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <button className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" title="Underline">
          <Underline className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2"></div>

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={() => onUpdateCard({ titleAlign: 'left', descriptionAlign: 'left' })}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onUpdateCard({ titleAlign: 'center', descriptionAlign: 'center' })}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onUpdateCard({ titleAlign: 'right', descriptionAlign: 'right' })}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2"></div>

      {/* Effects */}
      <div className="flex items-center gap-0.5">
        <button 
          onClick={() => onOpenPanel('effects')}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Effects"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button 
          onClick={onGenerateRandom}
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors" 
          title="Random Card"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
