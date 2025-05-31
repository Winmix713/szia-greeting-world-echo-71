
import { useState, useCallback, useRef, useEffect } from "react";
import { 
  Palette, 
  Type, 
  Image, 
  Layout, 
  Layers,
  Settings,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Wand2
} from "lucide-react";
import { CardData } from "../types/card";

interface DockbarProps {
  activeCard: CardData;
  updateCard: (updates: Partial<CardData>) => void;
}

export default function Dockbar({ activeCard, updateCard }: DockbarProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: 'colors', icon: Palette, label: 'Colors', color: 'from-pink-500 to-purple-500' },
    { id: 'typography', icon: Type, label: 'Typography', color: 'from-blue-500 to-cyan-500' },
    { id: 'layout', icon: Layout, label: 'Layout', color: 'from-green-500 to-emerald-500' },
    { id: 'effects', icon: Layers, label: 'Effects', color: 'from-orange-500 to-red-500' },
    { id: 'images', icon: Image, label: 'Images', color: 'from-purple-500 to-pink-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'from-gray-500 to-slate-500' },
  ];

  const handleToolClick = useCallback((toolId: string) => {
    if (activePanel === toolId) {
      setActivePanel(null);
      setIsExpanded(false);
    } else {
      setActivePanel(toolId);
      setIsExpanded(true);
    }
  }, [activePanel]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setActivePanel(null);
      setIsExpanded(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const renderColorPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Background Colors
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { from: '#667eea', to: '#764ba2', name: 'Ocean' },
            { from: '#f093fb', to: '#f5576c', name: 'Sunset' },
            { from: '#4facfe', to: '#00f2fe', name: 'Sky' },
            { from: '#43e97b', to: '#38f9d7', name: 'Forest' },
            { from: '#fa709a', to: '#fee140', name: 'Warm' },
            { from: '#a8edea', to: '#fed6e3', name: 'Pastel' },
            { from: '#ff9a9e', to: '#fecfef', name: 'Rose' },
            { from: '#a8caba', to: '#5d4e75', name: 'Earth' },
          ].map((gradient) => (
            <button
              key={gradient.name}
              onClick={() => updateCard({
                bgGradientFrom: gradient.from,
                bgGradientTo: gradient.to
              })}
              className="group relative w-12 h-12 rounded-xl overflow-hidden hover:scale-110 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
              }}
              title={gradient.name}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                {gradient.name}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Custom Colors</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">From</label>
            <input
              type="color"
              value={activeCard.bgGradientFrom || '#667eea'}
              onChange={(e) => updateCard({ bgGradientFrom: e.target.value })}
              className="w-full h-10 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">To</label>
            <input
              type="color"
              value={activeCard.bgGradientTo || '#764ba2'}
              onChange={(e) => updateCard({ bgGradientTo: e.target.value })}
              className="w-full h-10 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypographyPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Title Settings
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Font Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={activeCard.titleSize || 18}
              onChange={(e) => updateCard({ titleSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.titleSize || 18}px</div>
          </div>
          
          <div>
            <label className="text-xs text-gray-400 block mb-1">Font Weight</label>
            <select
              value={activeCard.titleWeight || '600'}
              onChange={(e) => updateCard({ titleWeight: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Text Alignment</label>
            <div className="flex gap-1">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => updateCard({ titleAlign: align as any })}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeCard.titleAlign === align
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Description Settings</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Font Size</label>
            <input
              type="range"
              min="10"
              max="24"
              value={activeCard.descriptionSize || 14}
              onChange={(e) => updateCard({ descriptionSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.descriptionSize || 14}px</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <Layout className="w-4 h-4" />
          Card Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Width</label>
            <input
              type="number"
              value={activeCard.cardWidth || 320}
              onChange={(e) => updateCard({ cardWidth: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Height</label>
            <input
              type="number"
              value={activeCard.cardHeight || 200}
              onChange={(e) => updateCard({ cardHeight: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Border Radius</h4>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(activeCard.cardBorderRadius?.topLeft || '16')}
          onChange={(e) => updateCard({ 
            cardBorderRadius: {
              topLeft: e.target.value,
              topRight: e.target.value,
              bottomLeft: e.target.value,
              bottomRight: e.target.value,
              unit: 'px'
            }
          })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-xs text-gray-400 mt-1">{activeCard.cardBorderRadius?.topLeft || '16'}px</div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Padding</h4>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(activeCard.cardPadding || '24')}
          onChange={(e) => updateCard({ cardPadding: e.target.value })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-xs text-gray-400 mt-1">{activeCard.cardPadding || '24'}px</div>
      </div>
    </div>
  );

  const renderEffectsPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Visual Effects
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Blur</label>
            <input
              type="range"
              min="0"
              max="20"
              value={activeCard.blur || 0}
              onChange={(e) => updateCard({ blur: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.blur || 0}px</div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Brightness</label>
            <input
              type="range"
              min="50"
              max="150"
              value={activeCard.brightness || 100}
              onChange={(e) => updateCard({ brightness: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.brightness || 100}%</div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Contrast</label>
            <input
              type="range"
              min="50"
              max="150"
              value={activeCard.contrast || 100}
              onChange={(e) => updateCard({ contrast: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.contrast || 100}%</div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Saturation</label>
            <input
              type="range"
              min="0"
              max="200"
              value={activeCard.saturation || 100}
              onChange={(e) => updateCard({ saturation: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.saturation || 100}%</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Transform</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Rotation</label>
            <input
              type="range"
              min="-180"
              max="180"
              value={activeCard.rotation || 0}
              onChange={(e) => updateCard({ rotation: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-gray-400 mt-1">{activeCard.rotation || 0}°</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPanel = () => {
    switch (activePanel) {
      case 'colors':
        return renderColorPanel();
      case 'typography':
        return renderTypographyPanel();
      case 'layout':
        return renderLayoutPanel();
      case 'effects':
        return renderEffectsPanel();
      default:
        return null;
    }
  };

  return (
    <div ref={panelRef} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* Expanded Panel */}
      {isExpanded && activePanel && (
        <div className="mb-4 w-80 max-h-96 overflow-y-auto custom-scrollbar">
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-200 capitalize">
                {activePanel}
              </h2>
              <button
                onClick={() => {
                  setActivePanel(null);
                  setIsExpanded(false);
                }}
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            {renderPanel()}
          </div>
        </div>
      )}

      {/* Main Dockbar */}
      <div className="glass-effect rounded-2xl p-3">
        <div className="flex items-center gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activePanel === tool.id;
            
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className={`group relative w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                  isActive 
                    ? `bg-gradient-to-r ${tool.color} shadow-lg shadow-current/25` 
                    : 'bg-gray-800/50 hover:bg-gray-700/70'
                }`}
                title={tool.label}
              >
                <Icon className={`w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`} />
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="tooltip-content whitespace-nowrap">
                    {tool.label}
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-scale-in" />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-gray-600 mx-2" />

          {/* Magic Button */}
          <button
            onClick={() => {
              // Generate random card styles
              const colors = [
                { from: '#667eea', to: '#764ba2' },
                { from: '#f093fb', to: '#f5576c' },
                { from: '#4facfe', to: '#00f2fe' },
                { from: '#43e97b', to: '#38f9d7' },
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              updateCard(randomColor);
            }}
            className="group relative w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl"
            title="Generate Random Style"
          >
            <Wand2 className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white group-hover:rotate-12 transition-transform duration-200" />
            <Sparkles className="w-3 h-3 absolute top-1 right-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
