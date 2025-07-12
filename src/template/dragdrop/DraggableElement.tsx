import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import type { DraggableElement } from '../../types';

interface DraggableElementProps {
  element: DraggableElement;
  isUsed: boolean;
  onDragStart: (elementId: string) => void;
}

const DraggableElementComponent: React.FC<DraggableElementProps> = ({ 
  element, 
  isUsed, 
  onDragStart 
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', element.id);
    onDragStart(element.id);
  };

  return (
    <motion.div
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-grab active:cursor-grabbing
        transition-all duration-200
        ${isUsed 
          ? 'bg-neutral-100 border-neutral-200 text-black cursor-not-allowed opacity-50' 
          : 'bg-white border-primary-200 text-slate-600 hover:border-primary-300 hover:shadow-md'
        }
      `}
      whileHover={!isUsed ? { scale: 1.02 } : {}}
      whileTap={!isUsed ? { scale: 0.98 } : {}}
    >
      <div
        draggable={!isUsed}
        onDragStart={handleDragStart}
        className="flex items-center gap-2 w-full"
      >
        <GripVertical className="w-4 h-4" />
        <span className="font-medium">{element?.label}</span>
      </div>
    </motion.div>
  );
};

export default DraggableElementComponent;