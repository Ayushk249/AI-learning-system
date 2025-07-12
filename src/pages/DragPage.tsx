import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Trophy, Target } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DragDropGame from '../template/dragdrop/DragGame';
import type { Game } from '../types/index';
import games from "../drag"


const GameDemo: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());

  const handleGameComplete = (gameId: string) => {
    setCompletedGames(prev => new Set([...prev, gameId]));
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
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

  if (selectedGame) {
    return (
      <div className="w-full bg-neutral-50">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleBackToMenu}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Button>
          </div>
          
          <DragDropGame
            game={selectedGame}
            onComplete={() => handleGameComplete(selectedGame.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Interactive Learning Games
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Drag and drop elements to complete educational challenges. 
            Test your knowledge across different subjects and game types.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game, index) => {
            const gameTypeInfo = getGameTypeInfo(game.type);
            const isCompleted = completedGames.has(game.id);
            
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 group relative h-full">
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${gameTypeInfo.color}`}>
                        <span className="mr-1">{gameTypeInfo.icon}</span>
                        {gameTypeInfo.label}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {game.title}
                    </h3>
                    
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      {game.description}
                    </p>
                    
                    <div className="bg-neutral-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">
                          <Target className="w-4 h-4 inline mr-1" />
                          {game.droppableBlanks.length} challenges
                        </span>
                        <span className="text-neutral-600">
                          {game.draggableElements.length} options
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedGame(game)}
                    className="w-full gap-2 group-hover:gap-3 transition-all"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <Play className="w-4 h-4" />
                    {isCompleted ? 'Play Again' : 'Start Game'}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200" padding="lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-primary-800">
                  Your Progress
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-700">
                    {completedGames.size}
                  </div>
                  <div className="text-sm text-primary-600">Games Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-700">
                    {games.length}
                  </div>
                  <div className="text-sm text-primary-600">Total Games</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-700">
                    {Math.round((completedGames.size / games.length) * 100)}%
                  </div>
                  <div className="text-sm text-primary-600">Success Rate</div>
                </div>
              </div>
              
              <div className="w-full bg-primary-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(completedGames.size / games.length) * 100}%` 
                  }}
                />
              </div>
              
              {completedGames.size === games.length && (
                <div className="mt-4 text-primary-700 font-medium">
                  🎉 Congratulations! You've completed all games!
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GameDemo;