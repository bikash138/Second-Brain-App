'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Twitter, Linkedin, Mail, Github } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hello@secondbrain.com',
      color: 'hover:text-green-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      color: 'hover:text-gray-300'
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Integrations']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Tutorials', 'Blog', 'Community']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Privacy', 'Terms']
    }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-semibold">Second Brain</span>
            </motion.div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Your intelligent note-taking companion powered by AI semantic search.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-500 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Second Brain. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-500 hover:text-white transition-colors duration-200 text-sm"
            >
              Cookie Policy
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;