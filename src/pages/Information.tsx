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
  const [generatingContent, setGeneratingContent] = useState(false);
  
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
    setSelectedTopicLoading(`topic-${index}`);
    
    try {
      console.log('Selected topic:', topic);
      
      // TODO: Replace this with your actual API call
      // const response = await fetch('your-explanation-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ topic, originalData: responseData }),
      // });
      // const topicExplanation = await response.json();
      
      // Simulate API call for generating topic explanation
      const simulateExplanationGeneration = () => {
        return new Promise<any>((resolve) => {
          setTimeout(() => {
            // Generate mock explanations based on the topic
            const mockExplanations = {
              'Evolution of chair design over time': {
                Topic: 'Evolution of chair design over time',
                Explanation: 'The evolution of chair design over time is a fascinating story that reflects the intersection of technology, culture, and human needs. Imagine a timeline that stretches from ancient civilizations to modern times, with each era leaving its mark on chair design. In ancient Egypt, Greece, and Rome, chairs were simple, often with just a stool or a backless seat, reserved for the elite. As societies evolved, so did chair design. During the Middle Ages, chairs became more ornate, with intricate carvings and upholstery, signifying wealth and status. The Industrial Revolution brought mass production techniques, making chairs more accessible and affordable for the general population. This period also saw the introduction of new materials like steel and plastic, which further expanded design possibilities. In the 20th century, designers like Charles and Ray Eames and Eero Saarinen introduced innovative, modernist chair designs that emphasized comfort, functionality, and aesthetics. Today, chair design continues to evolve, incorporating sustainable materials, ergonomic principles, and technological advancements. This evolution is akin to a river, constantly flowing and changing, yet always reflecting the needs and values of the people who use them.',
                'Suggested Interactive Template': 'match_pairs'
              },
              'Historical periods and their influence on chair styles': {
                Topic: 'Historical periods and their influence on chair styles',
                Explanation: 'Throughout history, chair styles have been deeply influenced by the cultural, artistic, and technological movements of their time. Each historical period brought unique characteristics that defined furniture design. The Baroque period (17th century) emphasized grandeur and ornate decoration, resulting in chairs with elaborate carvings, gilded details, and rich fabrics. The Neoclassical era drew inspiration from ancient Greek and Roman designs, creating chairs with clean lines, symmetrical proportions, and classical motifs. The Industrial Revolution democratized chair production, leading to simpler, more functional designs that could be mass-produced. Art Nouveau introduced organic forms and flowing lines, while the Arts and Crafts movement emphasized handcraftsmanship and natural materials. The Modernist movement of the 20th century stripped away ornamentation in favor of form following function, creating iconic designs that remain popular today.',
                'Suggested Interactive Template': 'timeline_sort'
              },
              'Notable chair designers and their contributions': {
                Topic: 'Notable chair designers and their contributions',
                Explanation: 'The world of chair design has been shaped by visionary designers who revolutionized how we think about seating. Charles and Ray Eames pioneered the use of molded plywood and fiberglass, creating comfortable, affordable chairs that became design icons. Arne Jacobsen\'s Ant Chair and Egg Chair demonstrated the beauty of organic forms in furniture. Eero Saarinen\'s Tulip Chair eliminated the "slum of legs" under tables with its single pedestal base. Marcel Breuer\'s Wassily Chair was one of the first to use tubular steel, inspiring countless industrial designs. More recently, designers like Philippe Starck and Karim Rashid have brought playful, contemporary aesthetics to chair design, while sustainability-focused designers are exploring eco-friendly materials and production methods.',
                'Suggested Interactive Template': 'designer_match'
              },
              'Cultural significance of chairs in different societies': {
                Topic: 'Cultural significance of chairs in different societies',
                Explanation: 'Chairs carry deep cultural significance beyond their functional purpose, serving as symbols of power, status, and social hierarchy across different societies. In ancient Egypt, thrones represented divine authority, with elaborate designs reserved for pharaohs and deities. Medieval European societies used chairs to denote social rank - only the highest nobility were permitted to sit in the presence of superiors. In Asian cultures, traditional seating often involves floor cushions or low platforms, reflecting philosophical values of humility and connection to the earth. The concept of the "chairman" literally derives from the person who had the right to sit in the chair during meetings. Different cultures have developed unique seating solutions: Japanese zaisu chairs for floor sitting, African carved stools as symbols of chieftainship, and Scandinavian designs emphasizing equality and simplicity. Today, chair design continues to reflect cultural values, from ergonomic office chairs representing productivity culture to sustainable designs reflecting environmental consciousness.',
                'Suggested Interactive Template': 'cultural_match'
              },
              'default': {
                Topic: topic,
                Explanation: `This topic explores the fascinating aspects of ${topic.toLowerCase()}. Understanding this subject involves examining multiple perspectives, historical context, and practical applications. Through interactive learning, you'll discover key concepts, important relationships, and real-world implications. This comprehensive overview will provide you with a solid foundation to build upon, whether you're a beginner or looking to deepen your existing knowledge. The interactive elements will help reinforce learning through hands-on practice and immediate feedback.`,
                'Suggested Interactive Template': 'general_match'
              }
            };

            // Select appropriate explanation based on topic
            const selectedExplanation = mockExplanations[topic] || mockExplanations['default'];
            resolve(selectedExplanation);
          }, 2000);
        });
      };

      const topicExplanation = await simulateExplanationGeneration();
      
      // Generate unique ID for this learning session
      const learningId = `learn-${Date.now()}`;
      
      // Navigate to learn page with topic explanation
      console.log(learningId)
      navigate(`/${learningId}/learn`, {
        state: {
          topicData: topicExplanation,
          originalQuery: userQuery,
          originalResponseData: responseData
        }
      });
      
    } catch (error) {
      console.error('Error generating explanation:', error);
      // You can add error handling here (e.g., show a toast notification)
    } finally {
      setSelectedTopicLoading(null);
    }
  };

  const handleGenerateLearningContent = async () => {
    setGeneratingContent(true);
    
    try {
      // TODO: Generate comprehensive learning content for all topics
      console.log('Generating learning content for all topics');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to learning interface or show generated content
      // navigate('/learning-interface', { state: { responseData, userQuery } });
      
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGeneratingContent(false);
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
                  size="lg" 
                  className="gap-2"
                  onClick={handleGenerateLearningContent}
                  disabled={generatingContent || selectedTopicLoading !== null}
                >
                  {generatingContent ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      Generate Learning Content
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/')}
                  disabled={generatingContent || selectedTopicLoading !== null}
                >
                  Try Different Topic
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Loading overlay when generating content */}
      {generatingContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <Card className="p-8 text-center max-w-md mx-4">
            <LoadingSpinner size="lg" color="primary" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Creating Learning Materials
            </h3>
            <p className="text-neutral-600">
              Generating interactive content for all learning pathways...
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Information;