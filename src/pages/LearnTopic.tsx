import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Target, Gamepad2, Zap, Brain, Trophy, BookOpen, Lightbulb } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface TopicData {
  Topic: string;
  Explanation: string;
  'Suggested Interactive Template': string;
}

interface LearnPageData {
  topicData: TopicData;
  originalQuery?: string;
  originalResponseData?: any;
}

const LearnTopic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [generatingGames, setGeneratingGames] = useState(false);

  // Get the topic data from navigation state
  const learnData = location.state as LearnPageData;

  // If no data, redirect back
  if (!learnData || !learnData.topicData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">No learning content found</h2>
          <p className="text-neutral-600 mb-6">Please go back and try again.</p>
          <Button onClick={() => navigate('/information')}>
            Return to Information
          </Button>
        </div>
      </div>
    );
  }

  const { topicData, originalQuery, originalResponseData } = learnData;

  const getTemplateInfo = (template: string) => {
    switch (template) {
      case "match_pairs":
        return { 
          label: "Matching Pairs", 
          color: "bg-primary-100 text-primary-800",
          icon: "🔗",
          description: "Connect related concepts together"
        };
      case "timeline_sort":
        return { 
          label: "Timeline Sorting", 
          color: "bg-success-100 text-success-800",
          icon: "📅",
          description: "Arrange events in chronological order"
        };
      case "designer_match":
        return { 
          label: "Designer Matching", 
          color: "bg-warning-100 text-warning-800",
          icon: "🎨",
          description: "Match designers to their creations"
        };
      case "cultural_match":
        return { 
          label: "Cultural Connections", 
          color: "bg-purple-100 text-purple-800",
          icon: "🌍",
          description: "Explore cultural relationships"
        };
      default:
        return { 
          label: "Interactive Learning", 
          color: "bg-neutral-100 text-neutral-800",
          icon: "🎯",
          description: "Hands-on learning experience"
        };
    }
  };

  const handleTestSkills = async () => {
    setGeneratingGames(true);
    
    try {
      // TODO: Replace this with your actual games API call
      // const response = await fetch('your-games-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     topic: topicData.Topic,
      //     template: topicData['Suggested Interactive Template'],
      //     originalQuery,
      //     originalResponseData
      //   }),
      // });
      // const generatedGames = await response.json();
      
      // Simulate API call for generating games
      const simulateGameGeneration = () => {
        return new Promise<any>((resolve) => {
          setTimeout(() => {
            // Generate mock games based on the topic and template
            const mockGames = [
              {
                id: "evolution-chairs-match",
                type: "match",
                title: "Match Chair Styles to Historical Periods",
                description: "Drag each chair style to its correct historical period.",
                draggableElements: [
                  { id: "windsor", label: "Windsor Chair" },
                  { id: "chippendale", label: "Chippendale" },
                  { id: "bauhaus", label: "Bauhaus Chair" },
                  { id: "eames", label: "Eames Lounge Chair" },
                  { id: "throne", label: "Medieval Throne" },
                  { id: "baroque", label: "Baroque Chair" },
                ],
                droppableBlanks: [
                  { id: "medieval", label: "Medieval Period (5th-15th century)", correctElementId: "throne" },
                  { id: "colonial", label: "Colonial Period (1600s-1700s)", correctElementId: "windsor" },
                  { id: "georgian", label: "Georgian Era (1714-1830)", correctElementId: "chippendale" },
                  { id: "baroque-period", label: "Baroque Period (17th century)", correctElementId: "baroque" },
                  { id: "modern", label: "Modern Era (1920s-1950s)", correctElementId: "bauhaus" },
                  { id: "contemporary", label: "Contemporary (1950s-present)", correctElementId: "eames" },
                ],
              },
              {
                id: "chair-materials-timeline",
                type: "fill-in-blanks",
                title: "Chair Materials Through Time",
                description: "Complete the timeline by placing materials in the correct periods.",
                draggableElements: [
                  { id: "wood", label: "Solid Wood" },
                  { id: "metal", label: "Steel & Metal" },
                  { id: "plastic", label: "Molded Plastic" },
                  { id: "upholstery", label: "Padded Upholstery" },
                  { id: "composite", label: "Composite Materials" },
                ],
                droppableBlanks: [
                  { id: "ancient", label: "Ancient Times", correctElementId: "wood" },
                  { id: "victorian", label: "Victorian Era", correctElementId: "upholstery" },
                  { id: "industrial", label: "Industrial Revolution", correctElementId: "metal" },
                  { id: "space-age", label: "Space Age Design", correctElementId: "plastic" },
                  { id: "modern-era", label: "Modern Era", correctElementId: "composite" },
                ],
              },
              {
                id: "design-principles-math",
                type: "math-fill",
                title: "Design Proportions & Measurements",
                description: "Complete the design calculations for optimal chair dimensions.",
                draggableElements: [
                  { id: "num-18", label: "18" },
                  { id: "num-32", label: "32" },
                  { id: "num-45", label: "45" },
                  { id: "num-90", label: "90" },
                  { id: "num-105", label: "105" },
                ],
                droppableBlanks: [
                  { id: "seat-height", label: "Standard seat height (inches)", displayPrefix: "Seat height: ", correctElementId: "num-18" },
                  { id: "table-height", label: "Standard table height (inches)", displayPrefix: "Table height: ", correctElementId: "num-32" },
                  { id: "back-angle", label: "Optimal backrest angle (degrees)", displayPrefix: "Backrest angle: ", correctElementId: "num-105" },
                  { id: "seat-depth", label: "Comfortable seat depth (cm)", displayPrefix: "Seat depth: ", correctElementId: "num-45" },
                  { id: "leg-angle", label: "Leg support angle (degrees)", displayPrefix: "Leg angle: ", correctElementId: "num-90" },
                ],
              }
            ];
            
            resolve(mockGames);
          }, 3000);
        });
      };

      const generatedGames = await simulateGameGeneration();
      
      // Navigate to drag page with the generated games
      navigate(`/${id}/learn/drag`, {
        state: {
          games: generatedGames,
          topic: topicData.Topic,
          originalQuery,
          returnPath: `/${id}/learn`
        }
      });
      
    } catch (error) {
      console.error('Error generating games:', error);
      // You can add error handling here
    } finally {
      setGeneratingGames(false);
    }
  };

  const templateInfo = getTemplateInfo(topicData['Suggested Interactive Template']);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/information')}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Pathways
          </Button>
        </motion.div>

        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl p-8 mb-6">
            <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              {topicData.Topic}
            </h1>
            {originalQuery && (
              <p className="text-lg text-neutral-600 italic">
                Learning content for: "{originalQuery}"
              </p>
            )}
          </div>
        </motion.div>

        {/* Explanation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white border-2 border-neutral-200" padding="lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-xl">
                <Lightbulb className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                  Understanding the Topic
                </h2>
                <p className="text-neutral-600 text-sm">
                  Let's explore this fascinating subject in detail
                </p>
              </div>
            </div>
            
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-700 leading-relaxed text-lg">
                {topicData.Explanation}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Interactive Template Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-success-50 to-success-100 border-success-200" padding="lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-success-200 p-3 rounded-xl">
                <Brain className="w-6 h-6 text-success-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-success-800 mb-1">
                  Recommended Learning Style
                </h3>
                <p className="text-success-600 text-sm">
                  Based on this topic, we've selected the best interactive format for you
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${templateInfo.color}`}>
                <span className="mr-2 text-lg">{templateInfo.icon}</span>
                {templateInfo.label}
              </span>
              <span className="text-success-700 text-sm">
                {templateInfo.description}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200" padding="lg">
            <Gamepad2 className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Ready to Test Your Skills?
            </h3>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Now that you understand the concepts, let's put your knowledge to the test! 
              I'll create interactive games specifically designed for this topic to help you practice and reinforce what you've learned.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline" 
                size="lg" 
                className="gap-3 text-lg px-8 py-4"
                onClick={handleTestSkills}
                disabled={generatingGames}
              >
                {generatingGames ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    Creating Your Games...
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Start Interactive Games
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => navigate('/information')}
                disabled={generatingGames}
              >
                <ArrowLeft className="w-5 h-5" />
                Choose Different Topic
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-neutral-500">
              💡 Games will be customized based on the content above
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Loading overlay when generating games */}
      {generatingGames && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <Card className="p-8 text-center max-w-md mx-4">
            <LoadingSpinner size="lg" color="primary" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Creating Your Interactive Games
            </h3>
            <p className="text-neutral-600">
              Generating custom learning activities based on "{topicData.Topic}"...
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default LearnTopic;