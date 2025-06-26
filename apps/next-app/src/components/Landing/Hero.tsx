'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { SignInButton } from '@clerk/nextjs'
import { ArrowRight, Search, Tag, Brain, Zap } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Search",
      description: "Semantic search understands context and meaning, not just keywords"
    },
    {
      icon: Zap,
      title: "Instant Capture",
      description: "Quickly save thoughts, ideas, and content with smart auto-tagging"
    },
    {
      icon: Tag,
      title: "Smart Connections",
      description: "AI discovers hidden relationships between your notes and ideas"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.1),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Main Headline */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              >
                Think Smarter
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
              >
                with AI-Powered Notes
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
            >
              Your intelligent note-taking companion that understands context, finds connections, and helps you discover insights.
              <span className="block mt-2 text-lg text-gray-400">
                Semantic search meets effortless organization.
              </span>
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold border border-purple-500 hover:border-pink-500 transition-all duration-300 shadow-lg"
              >
                Get Started
              </motion.button>
            </SignInButton>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(147, 51, 234, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group border border-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center space-x-2"
            >
              <span>See How It Works</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid md:grid-cols-3 gap-8 pt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(147, 51, 234, 0.05)"
                }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="pt-8"
          >
            <p className="text-gray-500 text-sm">
              Trusted by researchers, writers, and knowledge workers worldwide
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        />

        {/* Content Type Icons */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 left-20 text-purple-400/30"
        >
          <Search className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 right-20 text-pink-400/30"
        >
          <Brain className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;