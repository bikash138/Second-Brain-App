import React from 'react';
import { Twitter, Linkedin, Mail, Github, Globe, Heart } from 'lucide-react';

export default function AboutSection() {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://x.com/Bikash__Shaw',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/bikash-shaw-5ab74727b/',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/10'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:vshaw138@gmail.com',
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-400/10'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/bikash138',
      color: 'hover:text-purple-400',
      bgColor: 'hover:bg-purple-400/10'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Passionate about creating tools that help people organize their digital lives.'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack developer with a love for clean code and beautiful interfaces.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Designing intuitive experiences that make complex tasks feel simple.'
    }
  ];

  return (
    <section className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're passionate about helping you capture, organize, and find your ideas effortlessly. 
            Our mission is to build the most intuitive note-taking experience that grows with you.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 mb-16 border border-gray-700">
          <div className="text-center">
            <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              In a world overflowing with information, we believe everyone deserves a personal space 
              to capture their thoughts, ideas, and inspirations. We're building more than just a 
              note-taking app – we're creating a digital sanctuary for your creativity and productivity.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">User-Centric</h4>
            <p className="text-gray-400">Every feature we build starts with understanding your needs and workflows.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Privacy First</h4>
            <p className="text-gray-400">Your notes are yours. We prioritize security and privacy in everything we do.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Twitter className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Innovation</h4>
            <p className="text-gray-400">We're constantly exploring new ways to make note-taking more powerful and intuitive.</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Get In Touch</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you. 
            Connect with us on social media or drop us a line.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 bg-gray-700 rounded-full transition-all duration-300 transform hover:scale-110 ${link.color} ${link.bgColor} group`}
                  aria-label={link.name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-gray-400">
            <p>
              <span className="font-medium text-white">Email:</span>{' '}
              <a href="mailto:contact@yourcompany.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                vshaw138@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium text-white">Address:</span> Hooghly, Kolkata, West Bengal
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-white">
                <span className="text-blue-400">;</span>-Notes
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
            </div>
            
            <p className="text-sm text-gray-400">
              © 2025 Notes App. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-400" />{' '}
              for productivity enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}