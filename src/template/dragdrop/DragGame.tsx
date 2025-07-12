import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Trophy, Target } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import type {Game, DraggableElement, DroppableBlank, FilledBlank} from '../../types';
import DroppableBlankComponent from './Blank';
import DraggableElementComponent from './DraggableElement';

interface DragDropGameProps {
  game: Game;
  onComplete?: () => void;
}

const DragDropGame: React.FC<DragDropGameProps> = ({ game, onComplete }) => {
  const [filledBlanks, setFilledBlanks] = useState<FilledBlank[]>([]);
  const [availableElements, setAvailableElements] = useState<DraggableElement[]>(game.draggableElements);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const checkCompletion = useCallback(() => {
    const allBlanksCorrect = game.droppableBlanks.every(blank => {
      const filled = filledBlanks.find(f => f.blankId === blank.id);
      return filled && filled.isCorrect;
    });

    if (allBlanksCorrect && filledBlanks.length === game.droppableBlanks.length) {
      setIsCompleted(true);
      showToast("🎉 Excellent! You've completed the game!", 'success');
      onComplete?.();
    }
  }, [filledBlanks, game.droppableBlanks, showToast, onComplete]);

  useEffect(() => {
    checkCompletion();
  }, [checkCompletion]);

const handleDrop = useCallback((blankId: string, elementId: string) => {
      const blank = game.droppableBlanks.find(b => b.id === blankId);
  const element = game.draggableElements.find(e => e.id === elementId);

        if (!blank || !element) return;
  const isCorrect = blank.correctElementId === element.id;
  
  if (isCorrect) {
    // Only place item if correct
    setFilledBlanks(prev => [...prev, { blankId, elementId, isCorrect }]);
    setAvailableElements(prev => prev.filter(e => e.id !== elementId));
    showToast("Great job! That's correct! 🎯", 'success');
  } else {
    // Don't place item if incorrect - it stays in available options
    showToast("Not quite right. Try again! 🤔", 'error');
  }
}, [game, showToast]);

  const handleRemoveFromBlank = useCallback((blankId: string) => {
    const filledBlank = filledBlanks.find(f => f.blankId === blankId);
    if (!filledBlank) return;

    const element = game.draggableElements.find(e => e.id === filledBlank.elementId);
    if (!element) return;

    // Remove from filled blanks
    setFilledBlanks(prev => prev.filter(f => f.blankId !== blankId));
    
    // Add back to available elements
    setAvailableElements(prev => [...prev, element]);
  }, [filledBlanks, game.draggableElements]);

  const handleReset = useCallback(() => {
    setFilledBlanks([]);
    setAvailableElements(game.draggableElements);
    setIsCompleted(false);
    hideToast();
  }, [game.draggableElements, hideToast]);

  const getGameTypeLabel = (type: string) => {
    switch (type) {
      case "match": return "Matching";
      case "fill-in-blanks": return "Fill in Blanks";
      case "math-fill": return "Math";
      default: return type;
    }
  };

  const getGameLayout = () => {
    if (game.type === "math-fill") {
      return "space-y-4"; // Vertical layout for math equations
    } else if (game.type === "match") {
      return "grid grid-cols-2 md:grid-cols-3 gap-4"; // Grid layout for matching
    } else {
      return "grid grid-cols-2 md:grid-cols-4 gap-4"; // Grid layout for orbital positions
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{game.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {getGameTypeLabel(game.type)}
              </span>
              <Target className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">
                {filledBlanks.filter(f => f.isCorrect).length}/{game.droppableBlanks.length} correct
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isCompleted && <Trophy className="w-6 h-6 text-warning-600" />}
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
        
        <p className="text-neutral-600">{game.description}</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-3">
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6">
              {game.type === "match" ? "Match the pairs:" : 
               game.type === "math-fill" ? "Complete the equations:" : 
               "Place in order:"}
            </h3>
            <div className={getGameLayout()}>
              {game.droppableBlanks.map((blank) => {
                const filledBlank = filledBlanks.find(f => f.blankId === blank.id);
                const filledElement = filledBlank 
                  ? game.draggableElements.find(e => e.id === filledBlank.elementId)
                  : undefined;
                
                return (
                  <DroppableBlankComponent
                    key={blank.id}
                    blank={blank}
                    filledElement={filledElement}
                    isCorrect={filledBlank?.isCorrect}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFromBlank}
                    gameType={game.type}
                  />
                );
              })}
            </div>
          </Card>
        </div>

        {/* Available Elements */}
        <div className="lg:col-span-1">
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Available Options
            </h3>
            <div className="space-y-3">
              {availableElements.map((element) => (
                <DraggableElementComponent
                  key={element.id}
                  element={element}
                  isUsed={false}
                  onDragStart={() => {}}
                />
                
              ))}
            </div>
            
            {availableElements.length === 0 && !isCompleted && (
              <p className="text-neutral-500 text-sm">All items are in use</p>
            )}
            
            {isCompleted && (
              <div className="text-center mt-4 p-4 bg-success-50 rounded-lg">
                <Trophy className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-success-800 font-medium">Game Completed!</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DragDropGame;