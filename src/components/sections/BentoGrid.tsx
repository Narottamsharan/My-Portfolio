import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, CAPABILITIES, TOOLKIT } from '@/src/data';
import { Smartphone, MonitorPlay, Film, Sparkles, Zap, Clock, ShieldCheck, Target } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6 text-accent" />,
  MonitorPlay: <MonitorPlay className="w-6 h-6 text-accent" />,
  Film: <Film className="w-6 h-6 text-accent" />,
  Sparkles: <Sparkles className="w-6 h-6 text-accent" />
};

export default function BentoGrid() {
  return (
    <section id="expertise" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-6">Expertise & Workflow</h2>
        <p className="text-xl text-text-secondary max-w-2xl font-light">
          A systematic approach to producing high-end visual content that captures attention and drives results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
        
        {/* Services - Large Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 bg-surface-1 rounded-3xl p-8 md:p-12 border border-border-subtle overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <h3 className="text-2xl font-heading font-medium mb-8">What I Do</h3>
          
          <div className="grid sm:grid-cols-2 gap-8 relative z-10">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border-medium flex items-center justify-center">
                  {iconMap[service.icon]}
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">{service.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Work With Me - Vertical Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          className="md:col-span-1 md:row-span-2 bg-surface-1 rounded-3xl p-8 border border-border-subtle flex flex-col"
        >
          <h3 className="text-2xl font-heading font-medium mb-8">Why Work With Me</h3>
          
          <div className="flex flex-col gap-6 flex-grow">
            <div className="flex gap-4">
              <Target className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-sm mb-1">Story-First Strategy</h4>
                <p className="text-xs text-text-secondary leading-relaxed">Focusing on narrative structure to maximize retention and engagement.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-sm mb-1">Fast, Reliable Delivery</h4>
                <p className="text-xs text-text-secondary leading-relaxed">Professional timelines with consistent communication at every step.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-sm mb-1">High-Retention Editing</h4>
                <p className="text-xs text-text-secondary leading-relaxed">Pacing and visual hooks designed for modern attention spans.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-sm mb-1">Premium Quality</h4>
                <p className="text-xs text-text-secondary leading-relaxed">Cinematic color grading and immersive sound design.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities - Horizontal Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
          className="md:col-span-2 bg-surface-1 rounded-3xl p-8 border border-border-subtle"
        >
          <h3 className="text-xl font-heading font-medium mb-6">Capabilities</h3>
          <div className="flex flex-wrap gap-3">
            {CAPABILITIES.map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-full border border-border-medium bg-surface-2 text-sm text-text-primary hover:border-accent/50 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Toolkit - Square Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
          className="md:col-span-1 bg-accent/5 rounded-3xl p-8 border border-border-subtle flex flex-col justify-center"
        >
          <div className="text-xs font-mono text-text-secondary uppercase mb-4">Professional Toolkit</div>
          <div className="flex flex-wrap gap-2">
            {TOOLKIT.map((tool) => (
              <span key={tool} className="text-sm font-medium text-text-primary mr-2 mb-1">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
