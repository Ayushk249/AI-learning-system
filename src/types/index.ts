// src/types/index.ts

// Base template interface that all interactive templates will implement
export interface BaseTemplate {
  id: string;
  title: string;
  instruction: string;
  onComplete: (score: number, answers: any) => void;
  onNext?: () => void;
}

// Drag Order Game specific types
export interface DragOrderGameProps extends BaseTemplate {
  items: string[];
  correctOrder: number[];
  feedback: {
    correct: string;
    incorrect: string;
    partial?: string;
  };
  allowPartialCredit?: boolean;
  maxAttempts?: number;
}

// Game state management
export interface GameState {
  currentScore: number;
  attempts: number;
  isComplete: boolean;
  isCorrect: boolean;
  timeStarted: number;
  timeCompleted?: number;
}

// Template types for future expansion
export type TemplateType = 
  | 'drag_order' 
  | 'match_pairs' 
  | 'fill_blanks' 
  | 'multiple_choice'
  | 'category_sort';

// Demo content structure
export interface DemoContent {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  template: TemplateType;
  data: DragOrderGameProps;
}

// App context state
export interface AppState {
  currentDemo: DemoContent | null;
  completedDemos: string[];
  userProgress: {
    totalScore: number;
    demosCompleted: number;
    averageScore: number;
  };
  preferences: {
    animations: boolean;
    soundEnabled: boolean;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}

// App context actions
export type AppAction = 
  | { type: 'SET_CURRENT_DEMO'; payload: DemoContent }
  | { type: 'COMPLETE_DEMO'; payload: { demoId: string; score: number } }
  | { type: 'RESET_PROGRESS' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppState['preferences']> };

// UI Component prop types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'soft' | 'medium' | 'large';
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'neutral';
  className?: string;
}

export interface FeedbackPanelProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  score?: number;
  maxScore?: number;
  onClose?: () => void;
  onRetry?: () => void;
  onNext?: () => void;
  showActions?: boolean;
}

// Drag and drop types
export interface DragItem {
  id: string;
  content: string;
  originalIndex: number;
  currentIndex: number;
}

export interface DropResult {
  draggedId: string;
  overId: string;
  draggedIndex: number;
  overIndex: number;
}


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

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'neutral';
  className?: string;
}