import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/src/data';
import { Project } from '@/src/types';
import { X, Play, Clock, Eye, ThumbsUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';

const ProjectModal = ({ project, onClose, onNext, onPrev }: { project: Project; onClose: () => void; onNext?: () => void; onPrev?: () => void }) => {
  useEffect(() => {
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const isShort = project.videoType === 'Short Form';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center p-0 sm:p-6 bg-background/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        className="relative w-full max-w-[1400px] h-[100vh] sm:h-[90vh] bg-surface-1 sm:rounded-[2rem] border border-border-subtle shadow-2xl flex flex-col overflow-hidden"
        style={{ width: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fixed at top of modal */}
        <div className="flex-none flex justify-between items-center p-6 md:p-10 border-b border-border-subtle bg-surface-1/95 backdrop-blur z-20">
          <div>
            <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-tight text-text-primary">{project.title}</h2>
            <div className="flex items-center gap-3 mt-3 text-sm font-mono text-text-secondary uppercase tracking-wider">
              <span>{project.category}</span>
              {project.client && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border-medium" />
                  <span>{project.client}</span>
                </>
              )}
              {project.uploadDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border-medium" />
                  <span>{new Date(project.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                </>
              )}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-12 h-12 shrink-0 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-border-medium transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth">
          <div className="p-6 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
            
            {/* Video Section */}
            <div className={cn(
              "w-full bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl mx-auto",
              isShort ? "aspect-[9/16] max-w-[400px]" : "aspect-video"
            )}>
              <iframe
                key={project.id}
                width="100%"
                height="100%"
                src={`${project.embedUrl}?autoplay=1&rel=0`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full object-cover"
                loading="lazy"
              ></iframe>
            </div>

            {/* Case Study Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
              {/* Left Column - Narrative */}
              <div className="md:col-span-2 flex flex-col gap-12">
                {project.overview && (
                  <section>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">Project Overview</h3>
                    <p className="text-xl md:text-2xl font-light text-text-primary leading-relaxed">
                      {project.overview}
                    </p>
                  </section>
                )}
                
                {project.challenge && (
                  <section>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">The Challenge</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.challenge}
                    </p>
                  </section>
                )}
                
                {project.strategy && (
                  <section>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">Creative Approach</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.strategy}
                    </p>
                  </section>
                )}
                
                {project.results && (
                  <section>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">Business Results</h3>
                    <p className="text-lg font-medium text-text-primary leading-relaxed mb-8">
                      {project.results}
                    </p>
                    {project.metrics && Object.keys(project.metrics).length > 0 && (
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="p-6 rounded-2xl bg-surface-2 border border-border-subtle">
                            <div className="text-4xl font-heading font-medium text-text-primary mb-2">{value}</div>
                            <div className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}
              </div>
              
              {/* Right Column - Metadata */}
              <div className="flex flex-col gap-10">
                <section>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">Details</h3>
                  <ul className="flex flex-col gap-4 text-base">
                    {project.duration && (
                      <li className="flex justify-between border-b border-border-subtle pb-4">
                        <span className="text-text-secondary">Duration</span>
                        <span className="font-medium">{project.duration}</span>
                      </li>
                    )}
                    {project.views && (
                      <li className="flex justify-between border-b border-border-subtle pb-4">
                        <span className="text-text-secondary">Views</span>
                        <span className="font-medium">{project.views}</span>
                      </li>
                    )}
                    {project.likes && (
                      <li className="flex justify-between border-b border-border-subtle pb-4">
                        <span className="text-text-secondary">Likes</span>
                        <span className="font-medium">{project.likes}</span>
                      </li>
                    )}
                    {project.style && (
                      <li className="flex justify-between border-b border-border-subtle pb-4">
                        <span className="text-text-secondary">Editing Style</span>
                        <span className="font-medium text-right max-w-[60%]">{project.style}</span>
                      </li>
                    )}
                  </ul>
                </section>
                
                {project.tools && project.tools.length > 0 && (
                  <section>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-6">Software Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map(tool => (
                        <span key={tool} className="px-4 py-2 rounded-full bg-surface-2 text-sm text-text-primary font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                
                <Button className="w-full mt-4 py-6" onClick={() => window.open(project.youtubeUrl, '_blank')}>
                  Watch on YouTube
                </Button>
              </div>
            </div>

            {/* Navigation Footer inside modal */}
            <div className="border-t border-border-subtle pt-12 pb-8 flex justify-between items-center">
              {onPrev ? (
                <button onClick={onPrev} className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors font-mono uppercase text-sm tracking-widest">
                  <ArrowLeft className="w-5 h-5" /> Previous
                </button>
              ) : <div></div>}
              
              {onNext ? (
                <button onClick={onNext} className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors font-mono uppercase text-sm tracking-widest">
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : <div></div>}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const isShort = project.videoType === 'Short Form';
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="group cursor-pointer flex flex-col gap-6 w-full mb-12"
      onClick={onClick}
    >
      <div className={cn(
        "relative rounded-[2rem] overflow-hidden bg-surface-2 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-accent/10",
        isShort ? "aspect-[9/16]" : "aspect-video"
      )}>
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            const fallbackThumbnail = project.thumbnail.replace('/maxresdefault.jpg', '/sddefault.jpg');

            if (event.currentTarget.src !== fallbackThumbnail) {
              event.currentTarget.src = fallbackThumbnail;
            }
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
            <Play className="w-6 h-6 ml-1 fill-current" />
          </div>
          <span className="mt-4 px-6 py-3 rounded-full border border-white/30 bg-white/10 text-xs font-mono text-white uppercase tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            View Case Study
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-2">
        <h3 className="text-2xl font-heading font-medium line-clamp-2 transition-colors leading-tight">{project.title}</h3>
        <p className="text-sm font-mono uppercase tracking-widest text-text-secondary flex flex-wrap items-center gap-3">
          {project.client && <span className="text-text-primary">{project.client}</span>}
          {project.client && <span className="w-1 h-1 rounded-full bg-border-medium"></span>}
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-border-medium"></span>
          <span>{project.duration}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Defined categories to show
  const allowedCategories = ['All', 'Short Form', 'Long Form', 'Commercial', 'Brand Content', 'Educational'];
  
  const categories = useMemo(() => {
    // Only show categories that have at least one project
    const available = new Set<string>();
    PROJECTS.forEach(p => {
      available.add(p.category);
      available.add(p.videoType);
    });
    
    return allowedCategories.filter(cat => cat === 'All' || available.has(cat));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    if (activeFilter === 'Short Form') return PROJECTS.filter(p => p.videoType === 'Short Form');
    if (activeFilter === 'Long Form') return PROJECTS.filter(p => p.videoType === 'Long Form');
    // Otherwise filter by explicitly matching the category field
    return PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const handleNext = useCallback(() => {
    if (selectedProjectIndex !== null && selectedProjectIndex < filteredProjects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  }, [selectedProjectIndex, filteredProjects]);

  const handlePrev = useCallback(() => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  }, [selectedProjectIndex]);

  return (
    <section id="work" className="py-32 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-8">Selected Work</h2>
          <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed">
            A curated showcase of cinematic, high-retention visual stories designed to maximize engagement and drive measurable outcomes.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300",
                activeFilter === cat 
                  ? "bg-text-primary text-background shadow-lg scale-105" 
                  : "bg-surface-1 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-medium hover:bg-surface-2"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="w-full">
        {/* Editorial Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProjectIndex(idx)} 
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProjectIndex !== null && (
          <ProjectModal 
            project={filteredProjects[selectedProjectIndex]} 
            onClose={() => setSelectedProjectIndex(null)}
            onNext={selectedProjectIndex < filteredProjects.length - 1 ? handleNext : undefined}
            onPrev={selectedProjectIndex > 0 ? handlePrev : undefined}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
