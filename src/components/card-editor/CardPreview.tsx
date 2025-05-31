
import { CardData } from "../../types/card";
import { generateCardStyle } from "../../utils/cardStyles";

interface CardPreviewProps {
  activeCard: CardData;
  zoomLevel: string;
}

export default function CardPreview({ activeCard, zoomLevel }: CardPreviewProps) {
  const cardStyle = generateCardStyle(activeCard);

  return (
    <div className="relative flex items-center justify-center p-8">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Card Container */}
      <div className="relative">
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-lg blur-xl opacity-30 animate-pulse"
          style={{
            background: cardStyle.background,
            transform: `scale(1.1) ${cardStyle.transform} scale(${parseFloat(zoomLevel)})`
          }}
        />
        
        {/* Main Card */}
        <div 
          className="relative transition-all duration-500 ease-out cursor-pointer hover:scale-105 group"
          style={{
            ...cardStyle,
            transform: `${cardStyle.transform} scale(${parseFloat(zoomLevel)})`,
            boxShadow: `${cardStyle.boxShadow}, 0 0 0 1px rgba(255,255,255,0.1)`
          }}
        >
          {/* Content */}
          <div className="relative z-10">
            <h2 
              className="font-semibold mb-3 transition-all duration-300 group-hover:scale-105" 
              style={{ 
                fontSize: `${activeCard.titleSize || 18}px`,
                fontWeight: activeCard.titleWeight || "600",
                textAlign: (activeCard.titleAlign || "left") as any,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {activeCard.title}
            </h2>
            <p 
              className="opacity-90 leading-relaxed transition-all duration-300 group-hover:opacity-100"
              style={{ 
                fontSize: `${activeCard.descriptionSize || 14}px`,
                fontWeight: activeCard.descriptionWeight || "400",
                textAlign: (activeCard.descriptionAlign || "left") as any,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              {activeCard.description}
            </p>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent rounded-tr-lg rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Size Indicator */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className="text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur-sm">
            {cardStyle.width}×{cardStyle.height}px • {Math.round(parseFloat(zoomLevel) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
