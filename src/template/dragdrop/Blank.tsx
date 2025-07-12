import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DroppableBlankProps {
  blank: DroppableBlank;
  filledElement?: DraggableElement;
  isCorrect?: boolean;
  onDrop: (blankId: string, elementId: string) => void;
  onRemove: (blankId: string) => void;
  gameType: "match" | "fill-in-blanks" | "math-fill";
}

const DroppableBlankComponent: React.FC<DroppableBlankProps> = ({ 
  blank, 
  filledElement, 
  isCorrect, 
  onDrop, 
  onRemove,
  gameType
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const elementId = e.dataTransfer.getData('text/plain');
    onDrop(blank.id, elementId);
  };

  const handleRemove = () => {
    if (filledElement) {
      onRemove(blank.id);
    }
  };

  const renderContent = () => {
    if (gameType === "match") {
      // For match type, show the blank label (country) and the dropped element (capital)
      return (
        <div className="text-center">
          <div className="text-sm text-neutral-600 mb-2">{blank.label}</div>
          <div 
            className={`
              min-h-[40px] flex items-center justify-center px-3 py-2 rounded border-2 border-dashed
              ${filledElement 
                ? isCorrect 
                  ? 'bg-success-50 border-success-300 text-success-700' 
                  : 'bg-error-50 border-error-300 text-error-700'
                : isDragOver
                  ? 'bg-primary-50 border-primary-400'
                  : 'bg-neutral-50 border-neutral-300 hover:border-primary-300'
              }
            `}
          >
            {filledElement ? (
              <span className="font-medium">{filledElement.label}</span>
            ) : (
              <span className="text-neutral-400 text-sm">Drop capital</span>
            )}
          </div>
        </div>
      );
    } else if (gameType === "math-fill") {
      // For math type, show equation with prefix and answer slot
      return (
        <div className="flex items-center gap-2">
          {blank.displayPrefix && (
            <span className="text-neutral-700 font-medium">{blank.displayPrefix}</span>
          )}
          <div 
            className={`
              min-w-[80px] h-12 flex items-center justify-center px-3 rounded border-2 border-dashed
              ${filledElement 
                ? isCorrect 
                  ? 'bg-success-50 border-success-300 text-success-700' 
                  : 'bg-error-50 border-error-300 text-error-700'
                : isDragOver
                  ? 'bg-primary-50 border-primary-400'
                  : 'bg-neutral-50 border-neutral-300 hover:border-primary-300'
              }
            `}
          >
            {filledElement ? (
              <span className="font-bold text-lg">{filledElement.label}</span>
            ) : (
              <span className="text-neutral-400 text-sm">?</span>
            )}
          </div>
        </div>
      );
    } else {
      // For fill-in-blanks type, show position and dropped element
      return (
        <div className="text-center">
          <div className="text-sm text-neutral-600 mb-2">{blank.label}</div>
          <div 
            className={`
              min-h-[40px] flex items-center justify-center px-3 py-2 rounded border-2 border-dashed
              ${filledElement 
                ? isCorrect 
                  ? 'bg-success-50 border-success-300 text-success-700' 
                  : 'bg-error-50 border-error-300 text-error-700'
                : isDragOver
                  ? 'bg-primary-50 border-primary-400'
                  : 'bg-neutral-50 border-neutral-300 hover:border-primary-300'
              }
            `}
          >
            {filledElement ? (
              <span className="font-medium">{filledElement.label}</span>
            ) : (
              <span className="text-neutral-400 text-sm">Drop here</span>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleRemove}
      className="cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default DroppableBlankComponent;