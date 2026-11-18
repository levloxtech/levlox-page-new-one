import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAdminContent } from '../context/AdminContentContext';

interface NavbarProps {
  onBookSlotClick: () => void;
  onProgramClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookSlotClick, onProgramClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentMember } = useTheme();
  const { setIsAdminModalOpen } = useAdminContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-theme-bg/90 backdrop-blur-xl border-b border-theme-border shadow-sm'
          : 'bg-theme-bg/75 backdrop-blur-md border-b border-theme-border/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: LevLox Purple Swoosh Logo - Click triggers Admin Access */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsAdminModalOpen(true);
          }}
          className="flex items-center gap-3 group focus:outline-none select-none text-left cursor-pointer"
          title="Click Levlox logo for Admin Access"
        >
          <img
            src="/levlox-purple-swoosh-logo.png"
            alt="LEVLOX"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/"
            className="text-sm font-semibold text-theme-textMuted hover:text-theme-typo transition-colors"
          >
            Levlox Tech
          </Link>

          <button
            onClick={() => {
              onProgramClick();
              scrollToSection('program');
            }}
            className="text-sm font-semibold text-theme-textMuted hover:text-theme-typo transition-colors"
          >
            Program
          </button>

          <button
            onClick={() => scrollToSection('curriculum')}
            className="text-sm font-semibold text-theme-textMuted hover:text-theme-typo transition-colors"
          >
            Curriculum
          </button>

          <button
            onClick={() => scrollToSection('projects')}
            className="text-sm font-semibold text-theme-textMuted hover:text-theme-typo transition-colors"
          >
            Industrial Projects
          </button>

          <button
            onClick={() => scrollToSection('next-workshop')}
            className="text-sm font-semibold text-theme-textMuted hover:text-theme-typo transition-colors"
          >
            Workshops
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              onBookSlotClick();
              scrollToSection('application-form');
            }}
            className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: currentMember.colors.dominant,
            }}
          >
            <span>Book Your Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => {
              onBookSlotClick();
              scrollToSection('application-form');
            }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full transition-all shadow-sm"
            style={{ backgroundColor: currentMember.colors.dominant }}
          >
            Book Slot
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-theme-typo hover:bg-theme-surface-muted transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-theme-surface border-b border-theme-border px-6 py-6 flex flex-col gap-4 animate-fade-in shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2.5 text-base font-semibold text-theme-typo hover:opacity-80 transition-opacity border-b border-theme-border/50 text-purple-600"
          >
            &larr; Levlox Tech Company Home
          </Link>
          <button
            onClick={() => {
              onProgramClick();
              scrollToSection('program');
            }}
            className="text-left py-2.5 text-base font-semibold text-theme-typo hover:opacity-80 transition-opacity border-b border-theme-border/50"
          >
            Program Structure
          </button>
          <button
            onClick={() => scrollToSection('curriculum')}
            className="text-left py-2.5 text-base font-semibold text-theme-typo hover:opacity-80 transition-opacity border-b border-theme-border/50"
          >
            26-Phase Curriculum
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-left py-2.5 text-base font-semibold text-theme-typo hover:opacity-80 transition-opacity border-b border-theme-border/50"
          >
            Industrial Projects & Portal
          </button>
          <button
            onClick={() => scrollToSection('challenge')}
            className="text-left py-2.5 text-base font-semibold text-theme-typo hover:opacity-80 transition-opacity border-b border-theme-border/50"
          >
            10-Min Chatbot Challenge
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsAdminModalOpen(true);
            }}
            className="text-left py-2.5 text-xs font-mono font-bold text-violet-600 hover:opacity-80 transition-opacity border-b border-theme-border/50 flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </button>
          <button
            onClick={() => {
              onBookSlotClick();
              scrollToSection('application-form');
            }}
            className="w-full mt-2 py-3 px-4 text-white rounded-full font-bold text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            style={{ backgroundColor: currentMember.colors.dominant }}
          >
            <span>Book Your Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
