
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { CardData } from '../types/card';

interface DockbarProps {
  activeCard?: Partial<CardData>;
  updateCard: (updates: Partial<CardData>) => void;
}

export default function Dockbar({ activeCard, updateCard }: DockbarProps) {
  const [isTitleBold, setIsTitleBold] = useState(activeCard?.titleWeight === "600");
  const [isDescriptionBold, setIsDescriptionBold] = useState(activeCard?.descriptionWeight === "600");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState<'from' | 'to' | null>(null);

  const handleTitleBoldClick = () => {
    const newWeight = isTitleBold ? "400" : "600";
    setIsTitleBold(!isTitleBold);
    updateCard({ titleWeight: newWeight });
  };

  const handleDescriptionBoldClick = () => {
    const newWeight = isDescriptionBold ? "400" : "600";
    setIsDescriptionBold(!isDescriptionBold);
    updateCard({ descriptionWeight: newWeight });
  };

  const handleGradientChange = (type: 'from' | 'to', color: string) => {
    if (type === 'from') {
      updateCard({ bgGradientFrom: color });
    } else {
      updateCard({ bgGradientTo: color });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Card Customization</h3>

      <div className="mb-4">
        <h4 className="text-md text-gray-300 mb-2">Title Options</h4>
        <button
          onClick={handleTitleBoldClick}
          className={`px-3 py-1 rounded-md ${isTitleBold ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-500 transition-colors duration-200`}
        >
          Toggle Title Bold
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-md text-gray-300 mb-2">Description Options</h4>
        <button
          onClick={handleDescriptionBoldClick}
          className={`px-3 py-1 rounded-md ${isDescriptionBold ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-500 transition-colors duration-200`}
        >
          Toggle Description Bold
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-md text-gray-300 mb-2">Gradient Colors</h4>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowColorPicker(true); setSelectedColorType('from'); }}
            className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-400 hover:to-blue-600 transition-colors duration-200"
          >
            Change From Color
          </button>
          <button
            onClick={() => { setShowColorPicker(true); setSelectedColorType('to'); }}
            className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600 transition-colors duration-200"
          >
            Change To Color
          </button>
        </div>
      </div>

      {showColorPicker && selectedColorType && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-700 p-4 rounded-md">
            <SketchPicker
              color={selectedColorType === 'from' ? activeCard?.bgGradientFrom || '#3b82f6' : activeCard?.bgGradientTo || '#8b5cf6'}
              onChangeComplete={(color) => {
                handleGradientChange(selectedColorType, color.hex);
              }}
            />
            <button
              onClick={() => setShowColorPicker(false)}
              className="mt-3 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors duration-200"
            >
              Close Color Picker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
