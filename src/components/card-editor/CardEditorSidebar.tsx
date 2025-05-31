
import { Search, Plus, Star, Palette, Layout, Zap } from "lucide-react";
import { CardData } from "../../types/card";

interface CardEditorSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewCard: () => void;
  onUpdateCard: (updates: Partial<CardData>) => void;
}

export default function CardEditorSidebar({
  searchQuery,
  onSearchChange,
  onNewCard,
  onUpdateCard
}: CardEditorSidebarProps) {
  const templates = [
    {
      id: 'business',
      name: 'Business Card',
      description: 'Professional design',
      gradient: 'from-blue-600 to-purple-600',
      config: {
        title: "Business Card",
        description: "Professional design with elegant styling",
        bgGradientFrom: "#667eea",
        bgGradientTo: "#764ba2",
        titleSize: 20,
        titleWeight: "700"
      }
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Vibrant and engaging',
      gradient: 'from-pink-500 to-orange-500',
      config: {
        title: "Social Media Post",
        description: "Eye-catching design for social platforms",
        bgGradientFrom: "#ff6b6b",
        bgGradientTo: "#feca57",
        titleSize: 24,
        titleWeight: "800"
      }
    },
    {
      id: 'minimal',
      name: 'Minimal Design',
      description: 'Clean and simple',
      gradient: 'from-gray-400 to-gray-600',
      config: {
        title: "Minimal Card",
        description: "Clean design with focus on content",
        bgGradientFrom: "#f8f9fa",
        bgGradientTo: "#e9ecef",
        titleSize: 18,
        titleWeight: "600"
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic',
      gradient: 'from-purple-500 to-pink-500',
      config: {
        title: "Creative Design",
        description: "Artistic flair with bold colors",
        bgGradientFrom: "#667eea",
        bgGradientTo: "#f093fb",
        titleSize: 22,
        titleWeight: "700"
      }
    },
    {
      id: 'tech',
      name: 'Tech Style',
      description: 'Modern and sleek',
      gradient: 'from-cyan-500 to-blue-500',
      config: {
        title: "Tech Innovation",
        description: "Modern design for technology brands",
        bgGradientFrom: "#4facfe",
        bgGradientTo: "#00f2fe",
        titleSize: 19,
        titleWeight: "600"
      }
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Organic and fresh',
      gradient: 'from-green-500 to-emerald-500',
      config: {
        title: "Natural Beauty",
        description: "Fresh design inspired by nature",
        bgGradientFrom: "#43e97b",
        bgGradientTo: "#38f9d7",
        titleSize: 20,
        titleWeight: "600"
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: Layout },
    { id: 'popular', name: 'Popular', icon: Star },
    { id: 'recent', name: 'Recent', icon: Zap },
    { id: 'custom', name: 'Custom', icon: Palette }
  ];

  return (
    <aside className="w-72 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 flex flex-col flex-shrink-0 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
      
      <div className="relative z-10 p-4 border-b border-gray-700/50">
        <h2 className="sr-only">Cards panel</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input 
            type="search" 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 text-gray-200 border border-gray-700/50 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {/* New Card Button */}
        <button 
          onClick={onNewCard}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          Create New Card
        </button>
      </div>

      {/* Categories */}
      <div className="relative z-10 p-4 border-b border-gray-700/50">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800/50 hover:text-gray-100 rounded-lg transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Templates */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Templates</h3>
          <div className="space-y-3">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="group p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 cursor-pointer hover:bg-gray-800/50 hover:border-gray-600/50 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                onClick={() => onUpdateCard(template.config)}
              >
                {/* Preview */}
                <div className={`w-full h-20 bg-gradient-to-r ${template.gradient} rounded-lg mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="w-16 h-2 bg-white/30 rounded mb-1"></div>
                    <div className="w-12 h-1.5 bg-white/20 rounded"></div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                
                {/* Info */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-200 group-hover:text-blue-400 transition-colors duration-200">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                </div>
                
                {/* Hover Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Apply
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
