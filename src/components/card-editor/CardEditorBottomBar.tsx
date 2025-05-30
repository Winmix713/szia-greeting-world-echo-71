
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomOut, 
  ZoomIn, 
  Maximize 
} from "lucide-react";

interface CardEditorBottomBarProps {
  currentSlide: number;
  totalSlides: number;
  zoomLevel: string;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onZoomChange: (zoom: string) => void;
}

export default function CardEditorBottomBar({
  currentSlide,
  totalSlides,
  zoomLevel,
  onPrevSlide,
  onNextSlide,
  onZoomChange
}: CardEditorBottomBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous card"
          disabled={currentSlide === 0}
          onClick={onPrevSlide}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs text-gray-400 w-16 text-center">
          Card {totalSlides > 0 ? `${currentSlide + 1} / ${totalSlides}` : '1 / 1'}
        </span>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next card"
          disabled={currentSlide >= totalSlides - 1}
          onClick={onNextSlide}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Zoom out"
          onClick={() => onZoomChange((parseFloat(zoomLevel) - 0.25).toString())}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <select 
          className="bg-gray-800 border border-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs w-20 text-center"
          value={zoomLevel}
          onChange={(e) => onZoomChange(e.target.value)}
        >
          <option value="0.5">50%</option>
          <option value="0.75">75%</option>
          <option value="1.0">100%</option>
          <option value="1.5">150%</option>
          <option value="2.0">200%</option>
        </select>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Zoom in"
          onClick={() => onZoomChange((parseFloat(zoomLevel) + 0.25).toString())}
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
  );
}
