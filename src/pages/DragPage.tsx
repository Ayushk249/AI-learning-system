import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DragDropGame from '../template/dragdrop/DragGame';
import type { Game } from '../types/index';

interface DragPageData {
  games: Game[];
  topic: string;
  originalQuery?: string;
  returnPath?: string;
}

const DragPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());

  // Get passed data - NO FALLBACK, only use passed games
  const passedData = location.state as DragPageData;

  // If no games data passed, show error and redirect
  if (!passedData || !passedData.games || passedData.games.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">No games found</h2>
          <p className="text-neutral-600 mb-6">
            It seems you navigated here without game data. Please go back and select a topic first.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/')}>
              Return to Topics
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { games, topic, originalQuery} = passedData;
  const currentGame = games[currentGameIndex];

  const handleGameComplete = (gameId: string) => {
    setCompletedGames(prev => new Set([...prev, gameId]));
  };

  const handleNextGame = () => {
    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(prev => prev + 1);
    }
  };

  const handlePreviousGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(prev => prev - 1);
    }
  };

  const handleBackToLearn = () => {
    navigate('/');
  };

  const getGameTypeInfo = (type: string) => {
    switch (type) {
      case "match":
        return { 
          label: "Matching", 
          color: "bg-primary-100 text-primary-800",
          icon: "🔗"
        };
      case "fill-in-blanks":
        return { 
          label: "Fill Blanks", 
          color: "bg-success-100 text-success-800",
          icon: "📍"
        };
      case "math-fill":
        return { 
          label: "Math", 
          color: "bg-warning-100 text-warning-800",
          icon: "🧮"
        };
      default:
        return { 
          label: type, 
          color: "bg-neutral-100 text-neutral-800",
          icon: "🎯"
        };
    }
  };

  const gameTypeInfo = getGameTypeInfo(currentGame.type);
  const isCurrentGameCompleted = completedGames.has(currentGame.id);
 
  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header with Navigation and Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          {/* Top Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
            <Button
              variant="outline"
              onClick={handleBackToLearn}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topic Overview
            </Button>
            
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                All Topics
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompletedGames(new Set())}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </Button>
            </div>
          </div>

          {/* Topic and Progress Header */}
          <Card className="bg-gradient-to-r from-primary-100 to-primary-200 border-primary-200" padding="lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
                  {topic}
                </h1>
                {originalQuery && (
                  <p className="text-neutral-600 italic text-sm">
                    Generated from: "{originalQuery}"
                  </p>
                )}
              </div>
              
            </div>
          </Card>
        </motion.div>

        {/* Game Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-white border-2 border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Game Type Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${gameTypeInfo.color}`}>
                  <span className="mr-1">{gameTypeInfo.icon}</span>
                  {gameTypeInfo.label}
                </span>
                
                {/* Game Title and Status */}
                <div>
                  <h3 className="font-semibold text-neutral-800">
                    {currentGame.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Game {currentGameIndex + 1} of {games.length}
                    {isCurrentGameCompleted && (
                      <span className="ml-2 text-success-600">✓ Completed</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Game Navigation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousGame}
                  disabled={currentGameIndex === 0}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <span className="text-sm text-neutral-500 px-2">
                  {currentGameIndex + 1} / {games.length}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextGame}
                  disabled={currentGameIndex === games.length - 1}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Current Game */}
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DragDropGame
            game={currentGame}
            onComplete={() => handleGameComplete(currentGame.id)}
          />
        </motion.div>

        {/* Progress Summary at Bottom */}
        
      </div>
    </div>
  );
};

export default DragPage;