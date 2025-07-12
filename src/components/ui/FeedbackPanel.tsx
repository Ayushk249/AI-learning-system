// src/components/ui/FeedbackPanel.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, RotateCcw, ArrowRight, X } from 'lucide-react';
import type { FeedbackPanelProps } from '../../types';
import Button from './Button';

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  type,
  title,
  message,
  score,
  maxScore,
  onClose,
  onRetry,
  onNext,
  showActions = true,
}) => {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      iconColor: 'text-success-600',
      titleColor: 'text-success-800',
      messageColor: 'text-success-700',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      iconColor: 'text-error-600',
      titleColor: 'text-error-800',
      messageColor: 'text-error-700',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      iconColor: 'text-warning-600',
      titleColor: 'text-warning-800',
      messageColor: 'text-warning-700',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconColor: 'text-primary-600',
      titleColor: 'text-primary-800',
      messageColor: 'text-primary-700',
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  // Calculate score percentage for display
  const scorePercentage = score && maxScore ? Math.round((score / maxScore) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 relative`}
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Main content */}
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <IconComponent className={`w-8 h-8 ${config.iconColor} flex-shrink-0`} />
        </motion.div>

        <div className="flex-1">
          {/* Title and Score */}
          <div className="flex items-center justify-between mb-2">
            {title && (
              <h3 className={`text-lg font-semibold ${config.titleColor}`}>
                {title}
              </h3>
            )}
            
            {scorePercentage !== null && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-lg font-bold ${config.titleColor}`}
              >
                {score}/{maxScore} ({scorePercentage}%)
              </motion.div>
            )}
          </div>

          {/* Message */}
          <p className={`${config.messageColor} mb-4 leading-relaxed`}>
            {message}
          </p>

          {/* Action buttons */}
          {showActions && (onRetry || onNext) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 flex-wrap"
            >
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
              
              {onNext && (
                <Button
                  variant={type === 'success' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={onNext}
                  className="gap-2"
                >
                  Next Challenge
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackPanel;