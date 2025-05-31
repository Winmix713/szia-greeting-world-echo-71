import React, { useMemo } from 'react';
import { CardSettings } from '../../types/card';
import { hexToRgb, generateShadowValue } from '../../utils/helpers';

interface CardPreviewProps {
  card: CardSettings;
  zoomLevel: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, zoomLevel }) => {
  const cardStyle = useMemo(() => {
    const bgFromRgb = hexToRgb(card.bgGradientFrom);
    const bgToRgb = card.bgGradientTo ? hexToRgb(card.bgGradientTo) : undefined;
    
    const shadow = generateShadowValue(
      card.shadowSettings?.x || 0,
      card.shadowSettings?.y || 30,
      card.shadowSettings?.blur || 50,
      card.shadowSettings?.spread || 0,
      card.shadowColor,
      card.shadowOpacity
    );

    const transform = `rotate(${card.rotation || 0}deg) scaleX(${card.scaleX || 1}) scaleY(${card.scaleY || 1})`;

    const background = card.bgGradientTo 
      ? `linear-gradient(${card.gradientAngle || 135}deg, rgba(${bgFromRgb.r}, ${bgFromRgb.g}, ${bgFromRgb.b}, ${(card.bgOpacityFrom || 70) / 100}), rgba(${bgToRgb.r}, ${bgToRgb.g}, ${bgToRgb.b}, ${(card.bgOpacityTo || 14) / 100}))`
      : `rgba(${bgFromRgb.r}, ${bgFromRgb.g}, ${bgFromRgb.b}, ${(card.cardOpacity || 100) / 100})`;

    return {
      width: card.cardWidth,
      height: card.cardHeight,
      background,
      borderRadius: card.cardBorderRadius.topLeft,
      boxShadow: shadow,
      padding: card.cardPadding,
      opacity: (card.cardOpacity || 100) / 100,
      color: "white",
      transform: `${transform} scale(${zoomLevel})`,
      filter: `blur(${card.blur || 0}px) brightness(${card.brightness || 100}%) contrast(${card.contrast || 100}%) saturate(${card.saturation || 100}%)`,
    };
  }, [card, zoomLevel]);

  return (
    <div 
      className="transition-all duration-700 ease-out cursor-pointer hover:scale-105 shadow-2xl relative group"
      style={{
        ...cardStyle,
        boxShadow: `${cardStyle.boxShadow}, 0 0 100px rgba(139, 92, 246, 0.1)`
      }}
    >
      {/* Hover Border Effect */}
      {card.enableHoverEffects && (
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
      )}
      
      <div className="relative z-10">
        <h2 
          className="font-semibold mb-3 drop-shadow-sm" 
          style={{ 
            fontSize: `${card.titleSize}px`,
            fontWeight: card.titleWeight,
            textAlign: card.titleAlign
          }}
        >
          {card.title}
        </h2>
        <p 
          className="opacity-90 leading-relaxed drop-shadow-sm"
          style={{ 
            fontSize: `${card.descriptionSize}px`,
            fontWeight: card.descriptionWeight,
            textAlign: card.descriptionAlign
          }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default CardPreview;