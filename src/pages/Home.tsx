import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Lightbulb, Target, Zap, Users, BookOpen, Calculator, Globe } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    
    setIsLoading(true);
    console.log('User query stored:', userQuery);
    
    // TODO: Here you'll add your OpenAI API call later
    // For now, just simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // You can navigate to a results page or handle the response here
    }, 1000);
  };

  const handleExampleClick = (example: string) => {
    setUserQuery(example);
  };

  const exampleQueries = [
    "Teach me about the solar system",
    "Help me learn multiplication tables", 
    "Explain photosynthesis in simple terms",
    "Create a geography quiz about world capitals",
    "Show me how to solve algebraic equations",
    "Make a vocabulary game for Spanish words"
  ];

  return (
    <div className="min-w-7xl min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Input */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-6">
            Learn
            <span className="text-primary-600 block">Anything</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ask me what you'd like to learn, and I'll create an interactive educational experience just for you.
          </p>
          
          {/* Main Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="What would you like to learn today? (e.g., 'Teach me about the planets' or 'Create a math quiz')"
                    className="w-full p-4 pr-16 border-2 border-neutral-200 rounded-lg resize-none focus:border-primary-500 focus:outline-none transition-colors min-h-[120px] text-lg"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!userQuery.trim() || isLoading}
                    className="absolute bottom-3 right-3 gap-2"
                    size="sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-sm text-neutral-500 text-center">
                  Press Shift + Enter for a new line, or click Generate to create your learning experience
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Example Queries */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16 max-w-6xl mx-auto"
      >
        <h3 className="text-lg font-semibold text-neutral-700 text-center mb-6">
          Or try one of these examples:
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {exampleQueries.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
                  {index < 2 ? <Globe className="w-4 h-4 text-primary-600" /> :
                   index < 4 ? <BookOpen className="w-4 h-4 text-primary-600" /> :
                   <Calculator className="w-4 h-4 text-primary-600" />}
                </div>
                <span className="text-sm text-neutral-700 group-hover:text-primary-700 transition-colors">
                  {example}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
          Why AI-Powered Learning Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-large transition-shadow duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lightbulb className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Instant Learning
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Get personalized educational content generated instantly based on your learning goals.
            </p>
          </Card>

          <Card className="text-center hover:shadow-large transition-shadow duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Target className="w-8 h-8 text-success-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Interactive Format
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Learn through engaging drag-and-drop activities, quizzes, and hands-on exercises.
            </p>
          </Card>

          <Card className="text-center hover:shadow-large transition-shadow duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users className="w-8 h-8 text-warning-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Any Subject
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              From science and math to languages and history - learn anything you want to explore.
            </p>
          </Card>
        </div>
      </motion.div>

      {/* Demo Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            Already Have Games Ready?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Try our existing interactive demos while we work on AI-powered content generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="gap-2">
                Try Demo Games
                <Target className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center mt-12"
      >
        <p className="text-neutral-500 text-sm">
          Powered by AI • Create unlimited educational experiences
        </p>
      </motion.div>
    </div>
  );
};

export default Home;