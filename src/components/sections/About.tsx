import { motion } from 'framer-motion';
import { EXPERIENCES, PERSONAL_INFO, CERTIFICATES } from '@/src/data';
import { Award, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-border-subtle">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32">
        
        {/* Left: Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative w-full lg:w-[40%] max-w-[500px] mx-auto lg:mx-0 shrink-0 rounded-[24px] overflow-hidden border border-white/5 group shadow-2xl"
        >
          <div className="aspect-[4/5] w-full">
            <img
              src={PERSONAL_INFO.profileImage}
              alt="Narottam Sharan - Creative Video Editor"
              loading="lazy"
              className="w-full h-full object-cover grayscale transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:brightness-110"
            />
          </div>
        </motion.div>

        {/* Right: Story */}
        <div className="flex flex-col gap-12 w-full lg:w-[60%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h2 className="text-4xl font-heading font-medium tracking-tight mb-8">The Story</h2>
            <div className="flex flex-col gap-6 max-w-[65ch]">
              <p className="text-lg leading-loose text-text-secondary">
                Hi, I'm {PERSONAL_INFO.name}. I'm a Creative Video Editor dedicated to crafting visual narratives that resonate.
              </p>
              <p className="text-lg leading-loose text-text-secondary">
                I don't just cut clips together. I approach editing as structural storytelling—focusing on pacing, visual hooks, and the emotional arc of every frame. My goal is to build high-retention, cinematic content that captivates audiences from the first second to the last.
              </p>
              <p className="text-lg leading-loose text-text-secondary">
                Whether it's a short-form reel designed for virality or a long-form documentary meant to educate, my philosophy remains the same: every cut must serve the story.
              </p>
              <p className="text-lg leading-loose text-text-primary/90">
                Beyond the timeline, I'm passionate about the intersection of technology and creativity, always looking for new ways to push the boundaries of modern content creation.
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
            className="p-8 rounded-[24px] bg-surface-1 border border-border-subtle max-w-[65ch]"
          >
            <h3 className="text-sm font-mono text-text-secondary uppercase mb-6 flex items-center gap-3 tracking-widest">
              <Award className="w-5 h-5 text-text-primary" /> Certifications
            </h3>
            <div className="flex flex-col gap-5">
              {CERTIFICATES.map((cert, index) => (
                <div key={cert.id} className={`flex justify-between items-center ${index !== CERTIFICATES.length - 1 ? 'border-b border-border-subtle pb-5' : ''}`}>
                  <span className="font-medium text-text-primary text-lg">{cert.title}</span>
                  <span className="text-xs font-mono text-text-secondary tracking-wider uppercase">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom: Experience Timeline */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-heading font-medium mb-12 flex items-center justify-center gap-3">
            <Briefcase className="w-6 h-6 text-accent" /> Professional Experience
          </h3>
          <div className="flex flex-col gap-12 relative">
            {/* Timeline Line */}
            <div className="absolute top-2 bottom-0 left-[11px] w-[2px] bg-border-medium rounded-full"></div>
            {EXPERIENCES.map((exp, idx) => (
              <div key={exp.id} className="relative pl-12">
                {/* Timeline Dot */}
                <div className="absolute top-2 left-0 w-6 h-6 rounded-full bg-surface-1 border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                  <h4 className="text-xl font-heading font-medium">{exp.role}</h4>
                  <span className="text-sm font-mono text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                    {exp.duration}
                  </span>
                </div>
                
                <div className="text-text-primary font-medium mb-4">{exp.company}</div>
                
                <p className="text-text-secondary leading-relaxed mb-6">
                  {exp.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-secondary">
                      <span className="text-accent mt-0.5">•</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
