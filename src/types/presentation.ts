
export interface Slide {
  id: number; // Database uses serial which is number
  presentationId: number;
  title: string;
  content: Record<string, any>;
  position: number;
  isVisible: boolean; // Non-nullable boolean
  createdAt: Date;
  updatedAt: Date;
}

export interface Presentation {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  slides: Slide[];
}

// Helper type for creating new slides (without id, timestamps)
export interface CreateSlideData {
  presentationId: number;
  title: string;
  content: Record<string, any>;
  position: number;
  isVisible?: boolean;
}

// Helper type for updating slides
export interface UpdateSlideData {
  title?: string;
  content?: Record<string, any>;
  position?: number;
  isVisible?: boolean;
}
