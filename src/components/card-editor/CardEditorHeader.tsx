
import { ArrowLeft, Save, Share, Play, Download, MoreVertical, Sparkles } from "lucide-react";

interface CardEditorHeaderProps {
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function CardEditorHeader({ onSave, onShare, onExport }: CardEditorHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-sm text-sm flex-shrink-0 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 pointer-events-none" />
      
      <div className="flex items-center gap-4 relative z-10">
        <button 
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 hover:scale-105 transition-all duration-200 group"
          title="Back"
          aria-label="Back to presentation list"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
        </button>
        
        <div className="flex items-center gap-3">
          {/* App Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          
          <div>
            <h1 className="text-sm font-semibold text-gray-100 cursor-pointer hover:text-blue-400 transition-colors duration-200">
              Card Editor Pro
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">All changes saved</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10">
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 hover:scale-105 transition-all duration-200 group"
        >
          <Save className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
          Save
        </button>
        
        <button 
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 hover:scale-105 transition-all duration-200 group"
        >
          <Share className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
          Share
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group">
          <Play className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform duration-200" />
          Present
        </button>
        
        <div className="w-px h-5 bg-gray-600 mx-1"></div>
        
        <button 
          onClick={onExport}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 hover:scale-105 transition-all duration-200 group"
          title="Download"
        >
          <Download className="w-3.5 h-3.5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
        </button>
        
        <button 
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 hover:scale-105 transition-all duration-200 group"
          title="More options"
        >
          <MoreVertical className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </header>
  );
}
