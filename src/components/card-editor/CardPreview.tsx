
import { CardData } from "@/types/card";
import { generateCardStyle } from "@/utils/cardStyles";

interface CardPreviewProps {
  activeCard: CardData;
  zoomLevel: string;
}

export default function CardPreview({ activeCard, zoomLevel }: CardPreviewProps) {
  const cardStyle = generateCardStyle(activeCard);

  return (
    <div 
      className="transition-all duration-500 ease-out cursor-pointer hover:scale-105 shadow-2xl"
      style={{
        ...cardStyle,
        transform: `${cardStyle.transform} scale(${parseFloat(zoomLevel)})`
      }}
    >
      <div>
        <h2 
          className="font-semibold mb-3" 
          style={{ 
            fontSize: `${activeCard.titleSize || 18}px`,
            fontWeight: activeCard.titleWeight || "600",
            textAlign: (activeCard.titleAlign || "left") as any
          }}
        >
          {activeCard.title}
        </h2>
        <p 
          className="opacity-90 leading-relaxed"
          style={{ 
            fontSize: `${activeCard.descriptionSize || 14}px`,
            fontWeight: activeCard.descriptionWeight || "400",
            textAlign: (activeCard.descriptionAlign || "left") as any
          }}
        >
          {activeCard.description}
        </p>
      </div>
    </div>
  );
}
