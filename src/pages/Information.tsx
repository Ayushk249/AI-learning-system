import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain, Target, Lightbulb, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface ResponseData {
  subject_area: string;
  depth_level: string;
  question_type: string;
  curiosity_tree: string[];
}

const Information: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTopicLoading, setSelectedTopicLoading] = useState<string | null>(null);

  
  // Get the response data from navigation state
  const responseData = location.state?.responseData as ResponseData;
  const userQuery = location.state?.userQuery as string;

  // If no data, redirect back to home
  if (!responseData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">No data found</h2>
          <p className="text-neutral-600 mb-6">Please go back and try again.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleTopicClick = async (topic: string, index: number) => {
  setSelectedTopicLoading(`topic-${index}`)
  
  try {
    const response = await fetch('https://ai-learning-backend-3.onrender.com/explain_topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subtopic: topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const topicResponse = await response.json();
    console.log('✅ API Response:', topicResponse);
    const topicData = {
      Topic: topicResponse.topic,
      Explanation: topicResponse.explanation,
      'Suggested Interactive Template': topicResponse.template_type
    };
    
    const learningId = `learn-${Date.now()}`;
    
    navigate(`/${learningId}/learn`, {
      state: {
        topicData: topicData,
        originalQuery: userQuery,
        originalResponseData: responseData,
        activityContent: topicResponse.activity_content
      }
    });
    
  } catch (error) {
    console.error('Error fetching topic explanation:', error);
    setSelectedTopicLoading(null);
  } finally {
    setSelectedTopicLoading(null);
  }
};

  const getDepthLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'introductory':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'factual':
        return <BookOpen className="w-4 h-4" />;
      case 'analytical':
        return <Brain className="w-4 h-4" />;
      case 'creative':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Query Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200" padding="lg">
            <h1 className="text-2xl font-bold text-neutral-800 mb-3">
              Your Learning Request
            </h1>
            <p className="text-lg text-neutral-700 italic">
              "{userQuery}"
            </p>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">
            Learning Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Subject Area</h3>
              <p className="text-neutral-600 text-sm">{responseData.subject_area}</p>
            </Card>

            <Card className="text-center">
              <div className="bg-success-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                {getQuestionTypeIcon(responseData.question_type)}
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Question Type</h3>
              <p className="text-neutral-600 text-sm">{responseData.question_type}</p>
            </Card>

            <Card className="text-center">
              <div className="flex justify-center mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDepthLevelColor(responseData.depth_level)}`}>
                  {responseData.depth_level}
                </span>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Difficulty Level</h3>
              <p className="text-neutral-600 text-sm">Learning complexity assessed</p>
            </Card>
          </div>
        </motion.div>

        {/* Curiosity Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-neutral-800">
              Learning Pathways
            </h2>
          </div>
          <p className="text-neutral-600 mb-8 max-w-3xl">
            Based on your query, here are the key areas we can explore together. 
            Click on any topic to dive deeper into that specific area.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {responseData.curiosity_tree.map((topic, index) => {
              const isTopicLoading = selectedTopicLoading === `topic-${index}`;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => !isTopicLoading && handleTopicClick(topic, index)}
                >
                  <Card 
                    className={`hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary-300 ${
                      isTopicLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isTopicLoading 
                              ? 'bg-neutral-100' 
                              : 'bg-primary-100 group-hover:bg-primary-200'
                          }`}>
                            {isTopicLoading ? (
                              <LoadingSpinner size="sm" color="primary" />
                            ) : (
                              <span className="text-primary-600 font-bold text-lg">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold transition-colors leading-tight ${
                              isTopicLoading 
                                ? 'text-neutral-500' 
                                : 'text-neutral-800 group-hover:text-primary-700'
                            }`}>
                              {topic}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="ml-13">
                          <p className={`text-sm mb-4 ${
                            isTopicLoading ? 'text-neutral-400' : 'text-neutral-600'
                          }`}>
                            {isTopicLoading 
                              ? 'Preparing learning materials...' 
                              : 'Explore this learning pathway to deepen your understanding of the topic.'
                            }
                          </p>
                          
                          <div className={`flex items-center text-sm font-medium transition-colors ${
                            isTopicLoading 
                              ? 'text-neutral-400' 
                              : 'text-primary-600 group-hover:text-primary-700'
                          }`}>
                            <span>{isTopicLoading ? 'Loading...' : 'Start Learning'}</span>
                            {!isTopicLoading && (
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-neutral-50 to-neutral-100" padding="lg">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                Ready to Start Learning?
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                Choose a topic above to begin your interactive learning journey, 
                or go back to explore a different subject.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/')}
                  disabled={selectedTopicLoading !== null}
                >
                  Try Different Topic
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Information;