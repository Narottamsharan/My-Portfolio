import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '@/src/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'About', href: '#about' },
  ];

  const initials = PERSONAL_INFO.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 flex items-center justify-center transition-all duration-500 py-6 px-6 lg:px-12 pointer-events-none',
        )}
      >
        <div 
          className={cn(
            'flex items-center justify-between w-full max-w-7xl rounded-full transition-all duration-500 pointer-events-auto px-6 py-4',
            scrolled ? 'bg-surface-1/80 backdrop-blur-xl border border-border-subtle shadow-sm' : 'bg-transparent'
          )}
        >
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-border-subtle group-hover:border-border-medium transition-colors">
              <img 
                src={PERSONAL_INFO.profileImage} 
                alt="Narottam Sharan - Creative Video Editor" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-heading font-medium tracking-tight text-text-primary leading-none">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] md:text-xs font-mono text-text-secondary mt-1">
                Creative Video Editor
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="text-sm font-medium px-5 py-2.5 rounded-full bg-accent text-white hover:bg-blue-600 transition-colors shadow-sm">
              Let's Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-text-primary pointer-events-auto"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              className="absolute top-10 right-10 text-text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-heading font-medium tracking-tight hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 text-xl px-8 py-4 rounded-full bg-accent text-white hover:bg-blue-600 transition-colors shadow-sm font-medium"
              >
                Let's Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
