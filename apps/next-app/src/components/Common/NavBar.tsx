'use client'
import React, { useState } from 'react';
import { Link, Element, scroller } from "react-scroll";
import { Menu, X, ChevronDown } from 'lucide-react';
import AllThoughtsSection from '../Dashboard/AllThoughtsSection';

interface NavbarProps {
  className?: string;
}

export default function NavBar({ className = '' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#", color: 'text-blue-400 hover:text-blue-300' },
    { label: 'Search', href: 'search', color: 'text-gray-300 hover:text-white' },
    { label: 'Favourites', href: 'favourites', color: 'text-gray-300 hover:text-white' },
    { label: 'Thoughts', href: 'thoughts', color: 'text-gray-300 hover:text-white' },
    { label: 'About Us', href: 'aboutus', color: 'text-gray-300 hover:text-white' },
  ];

  const aboutDropdownItems = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <nav className={`bg-black/30 backdrop-blur-md border-b border-gray-800 sticky top-4 z-50 rounded-full mx-5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">
                <span className="text-blue-400">;</span>-Pwned
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link key={index} to={item.href} smooth={true} duration={800}
                  className={`font-medium cursor-pointer transition-colors duration-200 ${item.color}`}
                >
                  {item.label}
                </Link>

                // <a
                //   key={index}
                //   href={item.href}
                //   className={`font-medium transition-colors duration-200 ${item.color}`}
                // >
                //   {item.label}
                // </a>
              ))}
              
              {/* About Dropdown */}
              {/* <div className="relative">
                <button
                  onClick={toggleAboutDropdown}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAboutDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                    {aboutDropdownItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
          </div>

          {/* Dashboard Button - Desktop */}
          <div className="hidden lg:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200">
              Dashboard
            </button>
          </div>

          {/* Mobile Menu */}
        </div>
      </div>

      
    </nav>
    
  );
}