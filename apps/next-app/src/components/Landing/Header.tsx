'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X, Brain } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', hasDropdown: false }, 
    { name: 'How it Works', hasDropdown: false },
    { name: 'About Us', hasDropdown: false },
  ];

  const navItem = [
    { label: 'Features', href: 'search', color: 'text-gray-300 hover:text-white' },
    { label: 'How it Works', href: 'favourites', color: 'text-gray-300 hover:text-white' },
    { label: 'About Us', href: 'aboutus', color: 'text-gray-300 hover:text-white' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b 
       border-gray-800 sticky top-4 mx-5 rounded-2xl lg:rounded-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-semibold">Second Brain</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full border border-purple-500 hover:border-pink-500 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 mt-2 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center justify-between text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
              <div className="border-t border-gray-800 pt-4 space-y-3">
                <button className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Sign In
                </button>
                <button className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full border border-purple-500 hover:border-pink-500 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;