
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Layers, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight, 
  ZoomOut, 
  ZoomIn, 
  Maximize 
} from 'lucide-react';
import Dockbar from './components/dockbar';

interface CardSettings {
  title: string;
  description: string;
  bgGradientFrom: string;
  bgGradientTo?: string;
  cardOpacity?: number;
  cardBorderRadius?: number;
  enableHoverEffects?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  bgOpacityFrom?: number;
  bgOpacityTo?: number;
  gradientAngle?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  titleFont?: string;
  titleWeight?: string;
  titleSize?: number;
  titleAlign?: "left" | "center" | "right" | "justify";
  descriptionFont?: string;
  descriptionWeight?: string;
  descriptionSize?: number;
  descriptionAlign?: "left" | "center" | "right" | "justify";
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  enableAnimations?: boolean;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<CardSettings>({
    title: "Sample Card",
    description: "This is a sample card description",
    bgGradientFrom: "#667eea",
    bgGradientTo: "#764ba2",
    cardOpacity: 1,
    cardBorderRadius: 12,
    enableHoverEffects: true,
    cardWidth: 320,
    cardHeight: 200,
    bgOpacityFrom: 1,
    bgOpacityTo: 1,
    gradientAngle: 45,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
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
    enableAnimations: true
  });

  const totalCards = 3; // Example total

  const generateRandomCard = () => {
    const titles = ["Business Card", "Social Media", "Minimal Design", "Creative Layout", "Professional"];
    const descriptions = ["Professional design", "Vibrant and engaging", "Clean and simple", "Modern and creative", "Elegant and refined"];
    const gradients = [
      { from: "#667eea", to: "#764ba2" },
      { from: "#ff6b6b", to: "#feca57" },
      { from: "#4ecdc4", to: "#44a08d" },
      { from: "#a8edea", to: "#fed6e3" },
      { from: "#f093fb", to: "#f5576c" }
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    updateCard({
      title: randomTitle,
      description: randomDescription,
      bgGradientFrom: randomGradient.from,
      bgGradientTo: randomGradient.to
    }, true);
  };

  const updateCard = (updates: Partial<CardSettings>, replace: boolean = false) => {
    if (replace) {
      setActiveCard(prev => ({ ...prev, ...updates }));
    } else {
      setActiveCard(prev => ({ ...prev, ...updates }));
    }
  };

  const cardStyle = useMemo(() => {
    const style: React.CSSProperties = {
      width: `${(activeCard.cardWidth || 320) * zoomLevel}px`,
      height: `${(activeCard.cardHeight || 200) * zoomLevel}px`,
      background: activeCard.bgGradientTo 
        ? `linear-gradient(${activeCard.gradientAngle || 45}deg, ${activeCard.bgGradientFrom}, ${activeCard.bgGradientTo})`
        : activeCard.bgGradientFrom,
      borderRadius: `${activeCard.cardBorderRadius || 12}px`,
      padding: `${20 * zoomLevel}px`,
      color: 'white',
      boxShadow: `0 ${8 * zoomLevel}px ${32 * zoomLevel}px rgba(0, 0, 0, 0.1)`,
      opacity: activeCard.cardOpacity || 1,
      transform: `
        rotate(${activeCard.rotation || 0}deg) 
        scaleX(${activeCard.scaleX || 1}) 
        scaleY(${activeCard.scaleY || 1})
      `,
      filter: `
        blur(${activeCard.blur || 0}px) 
        brightness(${activeCard.brightness || 100}%) 
        contrast(${activeCard.contrast || 100}%) 
        saturate(${activeCard.saturation || 100}%)
      `,
      transition: activeCard.enableAnimations ? 'all 0.3s ease' : 'none'
    };
    return style;
  }, [activeCard, zoomLevel]);

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Card Designer</h1>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Beta</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
            title="Effects"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button 
            onClick={generateRandomCard} 
            className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
            title="Random Card"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 border-r border-gray-700 flex flex-col pt-3 flex-shrink-0">
          <div className="px-3 pb-3">
            <div className="relative mb-3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input 
                type="search" 
                className="w-full pl-8 pr-2 py-1.5 bg-gray-800 text-gray-200 border border-transparent rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-600"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={generateRandomCard}
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Card
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Business Card",
                  description: "Professional design",
                  bgGradientFrom: "#667eea",
                  bgGradientTo: "#764ba2"
                }, true)}
              >
                <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Business Card</p>
              </div>
              
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Social Media",
                  description: "Vibrant and engaging",
                  bgGradientFrom: "#ff6b6b",
                  bgGradientTo: "#feca57"
                }, true)}
              >
                <div className="w-full h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Social Media</p>
              </div>
              
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Minimal Design",
                  description: "Clean and simple",
                  bgGradientFrom: "#ffffff",
                  bgGradientTo: "#f8f9fa"
                }, true)}
              >
                <div className="w-full h-12 bg-gradient-to-r from-white to-gray-100 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Minimal</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
          {/* Preview Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Card Preview Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30 -z-10"
                style={{
                  background: `radial-gradient(circle, ${activeCard.bgGradientFrom}40, ${activeCard.bgGradientTo || activeCard.bgGradientFrom}20, transparent 70%)`,
                  transform: 'scale(1.5)'
                }}
              ></div>

              {/* Card Preview */}
              <div 
                className="transition-all duration-700 ease-out cursor-pointer hover:scale-105 shadow-2xl relative group"
                style={{
                  ...cardStyle,
                  boxShadow: `${cardStyle.boxShadow}, 0 0 100px rgba(139, 92, 246, 0.1)`
                }}
              >
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

                <div className="relative z-10">
                  <h2 
                    className="font-semibold mb-3 drop-shadow-sm" 
                    style={{ 
                      fontSize: `${(activeCard.titleSize || 18) * zoomLevel}px`,
                      fontWeight: activeCard.titleWeight || "600",
                      textAlign: (activeCard.titleAlign || "left") as any
                    }}
                  >
                    {activeCard.title}
                  </h2>
                  <p 
                    className="opacity-90 leading-relaxed drop-shadow-sm"
                    style={{ 
                      fontSize: `${(activeCard.descriptionSize || 14) * zoomLevel}px`,
                      fontWeight: activeCard.descriptionWeight || "400",
                      textAlign: (activeCard.descriptionAlign || "left") as any
                    }}
                  >
                    {activeCard.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300 font-medium">Live Preview</span>
              </div>
            </div>
          </div>

          {/* Dockbar */}
          <Dockbar activeCard={activeCard} updateCard={updateCard} />

          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <button 
                disabled={currentCardIndex <= 0}
                className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
                title="Previous card"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-gray-400 w-16 text-center">
                Card {currentCardIndex + 1} / {totalCards}
              </span>
              <button 
                disabled={currentCardIndex >= totalCards - 1}
                className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
                title="Next card"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setZoomLevel(Math.max(0.25, zoomLevel - 0.25))} 
                className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <select 
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="bg-gray-800 border border-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs w-20 text-center"
              >
                <option value="0.5">50%</option>
                <option value="0.75">75%</option>
                <option value="1.0">100%</option>
                <option value="1.5">150%</option>
                <option value="2.0">200%</option>
              </select>
              <button 
                onClick={() => setZoomLevel(Math.min(3.0, zoomLevel + 0.25))} 
                className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-gray-700 mx-1"></div>
              <button 
                className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
                title="Fullscreen"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
