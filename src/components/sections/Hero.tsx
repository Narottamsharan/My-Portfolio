import { motion } from 'framer-motion';
import { HERO_DATA, PERSONAL_INFO } from '@/src/data';
import { Button } from '@/src/components/ui/Button';
import { SoftAurora } from '@/src/components/ui/SoftAurora';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden bg-[#0A0A0A]"
    >
      {/* SoftAurora Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SoftAurora
          color1="#3B82F6"
          color2="#1D4ED8"
          speed={isMobile ? 0.12 : 0.18}
          scale={1.3}
          brightness={isMobile ? 0.25 : isTablet ? 0.3 : 0.35}
          noiseFrequency={2.0}
          noiseAmplitude={0.35}
          bandHeight={0.48}
          bandSpread={0.65}
          octaveDecay={0.35}
          layerOffset={0.18}
          colorSpeed={isMobile ? 0.12 : 0.18}
          enableMouseInteraction={!isMobile}
          mouseInfluence={isMobile ? 0 : 0.05}
        />
      </div>

      {/* Dark Overlay (very subtle) */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,.25), rgba(10,10,10,.55), rgba(10,10,10,.85))'
        }}
      />

      <motion.div 
        className="relative z-[2] text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center gap-2">
          <span className="text-base font-heading font-medium tracking-wide text-white/90">{PERSONAL_INFO.name}</span>
          <span className="text-xs font-mono text-white/60 uppercase tracking-widest flex items-center gap-3">
            Creative Video Editor <span className="w-1 h-1 rounded-full bg-[#3B82F6]"></span> Visual Storyteller
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tighter leading-[1.1] mb-8 text-white"
        >
          {HERO_DATA.headline}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {HERO_DATA.subheadline}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            View Selected Work
          </Button>
          <Button size="lg" variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Discuss a Project
          </Button>
        </motion.div>

        {/* Metrics Footer */}
        <motion.div 
          variants={itemVariants}
          className="w-full mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-between gap-8 text-left lg:text-center"
        >
          {HERO_DATA.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-heading font-medium tracking-tight text-white">{metric.value}</span>
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{metric.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
