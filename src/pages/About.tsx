import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cog, Rocket, Users2 } from 'lucide-react';
import  Card  from '../components/ui/Card';

const About = () => {
  return (
    <div className="min-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          About Dynamic Learning
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Revolutionizing education through interactive, AI-powered learning experiences
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Card padding="lg">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Our Mission
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              We believe learning should be engaging, interactive, and accessible to everyone. 
              Our platform transforms traditional educational content into dynamic, hands-on 
              experiences that adapt to each learner's pace and style.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              Ask a Question
            </h3>
            <p className="text-neutral-600">
              Students input any educational question or topic they want to learn about.
            </p>
          </Card>

          <Card className="text-center">
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-success-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              AI Analysis
            </h3>
            <p className="text-neutral-600">
              Our AI analyzes the question and selects the best interactive template for learning.
            </p>
          </Card>

          <Card className="text-center">
            <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-warning-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              Interactive Learning
            </h3>
            <p className="text-neutral-600">
              Students engage with custom-generated interactive content and receive immediate feedback.
            </p>
          </Card>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">
          Key Features
        </h2>
        <div className="space-y-6">
          <Card>
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Cog className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  Template-Driven Architecture
                </h3>
                <p className="text-neutral-600">
                  Reusable interactive components that can be dynamically populated with 
                  AI-generated content for any subject or topic.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="bg-success-100 p-3 rounded-lg">
                <Rocket className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  Instant Content Generation
                </h3>
                <p className="text-neutral-600">
                  Transform any question into an interactive learning experience in seconds, 
                  without manual content creation.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="bg-warning-100 p-3 rounded-lg">
                <Users2 className="w-6 h-6 text-warning-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  Adaptive Learning
                </h3>
                <p className="text-neutral-600">
                  Content and difficulty adjust based on student performance and learning patterns 
                  for optimal educational outcomes.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Technology */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card padding="lg" className="bg-gradient-to-r from-neutral-50 to-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 text-center">
            Built with Modern Technology
          </h2>
          <p className="text-neutral-600 leading-relaxed text-center mb-6">
            This Phase 1 demo showcases our foundation built with React, TypeScript, and 
            advanced drag-and-drop interactions. Future phases will integrate AI-powered 
            content generation for unlimited educational possibilities.
          </p>
          <div className="text-center">
            <div className="inline-flex items-center gap-4 text-sm text-neutral-500">
              <span>React</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Framer Motion</span>
              <span>•</span>
              <span>DnD Kit</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;