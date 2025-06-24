'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from "react-scroll";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');


  const navItems = [
    { label: 'Search', href: 'search', color: 'text-gray-300 hover:text-white' },
    { label: 'Favourites', href: 'favourites', color: 'text-gray-300 hover:text-white' },
    { label: 'Thoughts', href: 'thoughts', color: 'text-gray-300 hover:text-white' },
    { label: 'About Us', href: 'aboutus', color: 'text-gray-300 hover:text-white' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-4 z-50 mx-5 rounded-2xl lg:rounded-full">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold">
                <span className="text-green-400">;</span>--Pwned
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  smooth={true}
                  duration={800}
                  spy={true}
                  className={`font-medium cursor-pointer transition-colors duration-200 ${activeSection === item.href ? 'text-blue-400 ' : ''}`}
                  onSetActive={() => setActiveSection(item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Dashboard Button */}
            <div className="flex-shrink-0">
              <button className="border border-pink-400 text-pink-400 font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:bg-red-500/80 cursor-pointer hover:text-black">
                Logout
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex-shrink-0">
              <div className="text-xl font-bold">
                <span className="text-green-400">;</span>--Pwned
              </div>
            </div>

            {/* Mobile Dashboard and Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white p-2 cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Mobile Menu Panel */}
            <div className="bg-gray-900 border-t  border-slate-700 rounded-2xl absolute top-16 left-4 right-4 z-20">
              <div className="px-4 pt-4 pb-6 space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    smooth={true}
                    duration={800}
                    spy={true}
                    className={`block border-slate-700 py-2 border-b font-medium cursor-pointer transition-colors duration-200 ${activeSection === item.href ? 'text-blue-400 ' : ''}`}
                    onSetActive={() => setActiveSection(item.href)}
                    onClick={() => setIsMobileMenuOpen(false)} // close menu on link click
                  >
                    {item.label}
                  </Link>
                ))}
                <button className="min-w-full border border-pink-400 text-pink-400 font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:bg-red-500/80 cursor-pointer hover:text-black">
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;