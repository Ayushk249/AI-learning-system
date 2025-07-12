import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Zap, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import  { demoContent } from '../demo';
import { div } from 'framer-motion/client';


const Home = () => {
  return (
    <div className="min-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-6">
            Interactive Learning
            <span className="text-primary-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform any question into an engaging, interactive learning experience. 
            Our dynamic system creates personalized educational games that make learning fun and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="gap-2">
                Try Interactive Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
          Why Interactive Learning Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-large transition-shadow duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Target className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Engaging & Fun
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Transform boring facts into interactive games that students actually want to play and learn from.
            </p>
          </Card>

          <Card className="text-center hover:shadow-large transition-shadow duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Zap className="w-8 h-8 text-success-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              Instant Feedback
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Get immediate results and explanations to reinforce learning and build confidence.
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
              Adaptive Learning
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Content adjusts to your pace and understanding level for optimal learning outcomes.
            </p>
          </Card>
        </div>
      </motion.div>

      {/* Demo Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-neutral-600">
            Try our interactive demos and experience the difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoContent.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="hover:shadow-large transition-all duration-300 group cursor-pointer">
                <Link to="/demo" state={{ selectedDemo: demo.id }}>
                  <div className="mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      demo.difficulty === 'beginner' ? 'bg-success-100 text-success-800' :
                      demo.difficulty === 'intermediate' ? 'bg-warning-100 text-warning-800' :
                      'bg-error-100 text-error-800'
                    }`}>
                      {demo.subject} • {demo.difficulty}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                    Try it out
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all" />
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200" padding="lg">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            Ready to Transform Learning?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Join the interactive learning revolution. Start with our demos and see how 
            engaging education can be.
          </p>
          <Link to="/demo">
            <Button size="lg" className="gap-2">
              Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
};



export default Home;
