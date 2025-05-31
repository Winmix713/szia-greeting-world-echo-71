import React, { useState, useCallback, useEffect } from 'react';
import { CardSettings, DEFAULT_CARD_SETTINGS } from './types/card';
import { randomColor } from './utils/helpers';
import Header from './components/layout/Header';
import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Dockbar from './components/editor/Dockbar';
import CardPreview from './components/card/CardPreview';
import StatusBar from './components/layout/StatusBar';

const App: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardSettings>(DEFAULT_CARD_SETTINGS);
  const [history, setHistory] = useState<CardSettings[]>([DEFAULT_CARD_SETTINGS]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(3);

  const updateCard = useCallback((updates: Partial<CardSettings>, immediate = false) => {
    const newCard = { ...activeCard, ...updates };
    setActiveCard(newCard);

    if (immediate) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newCard);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [activeCard, history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
      setActiveCard(history[historyIndex - 1]);
    }
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
      setActiveCard(history[historyIndex + 1]);
    }
  }, [canRedo, historyIndex, history]);

  const generateRandomCard = useCallback(() => {
    const titles = ["Creative Card", "Modern Design", "Elegant Style", "Dynamic Card", "Innovative UI"];
    const descriptions = [
      "Beautiful and responsive design",
      "Crafted with precision and care", 
      "Designed for maximum impact",
      "Built for the future of web",
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    updateCard({
      title: randomTitle,
      description: randomDescription,
      bgGradientFrom: randomColor(),
      bgGradientTo: randomColor(),
    }, true);
  }, [updateCard]);

  const exportCard = useCallback(() => {
    const exportData = {
      card: activeCard,
      timestamp: new Date().toISOString(),
      version: "2.0.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `card-editor-pro-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Card exported successfully");
  }, [activeCard]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Custom CSS */}
      <style>{`
        .slider {
          background: #1f2937;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Header */}
      <Header exportCard={exportCard} />

      {/* Toolbar */}
      <Toolbar 
        card={activeCard} 
        updateCard={updateCard} 
        canUndo={canUndo} 
        canRedo={canRedo} 
        undo={undo} 
        redo={redo} 
        generateRandomCard={generateRandomCard} 
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          generateRandomCard={generateRandomCard} 
          updateCard={updateCard}
        />

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
              <CardPreview card={activeCard} zoomLevel={zoomLevel} />
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
          <StatusBar 
            currentCardIndex={currentCardIndex} 
            totalCards={totalCards} 
            zoomLevel={zoomLevel} 
            setZoomLevel={setZoomLevel} 
          />
        </main>
      </div>
    </div>
  );
};

export default App;