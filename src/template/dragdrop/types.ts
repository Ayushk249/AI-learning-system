export interface DraggableElement {
  id: string;
  label: string;
}

export interface DroppableBlank {
  id: string;
  label: string;
  correctElementId: string;
  displayPrefix?: string; // For math equations
}

export interface Game {
  id: string;
  type: "match" | "fill-in-blanks" | "math-fill";
  title: string;
  description: string;
  draggableElements: DraggableElement[];
  droppableBlanks: DroppableBlank[];
}

export interface FilledBlank {
  blankId: string;
  elementId: string;
  isCorrect: boolean;
}