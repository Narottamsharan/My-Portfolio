import { PERSONAL_INFO } from '@/src/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-20 px-6 lg:px-12 border-t border-border-subtle bg-surface-1 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="text-2xl font-heading font-medium text-text-primary">{PERSONAL_INFO.name}</h3>
          <p className="text-sm font-mono text-accent uppercase tracking-widest">Creative Video Editor</p>
          <p className="text-text-secondary leading-relaxed mt-2">
            Helping brands create high-retention videos through cinematic storytelling.
          </p>
        </div>

        <div className="flex flex-col md:items-end justify-between gap-12">
          <div className="flex items-center gap-8 md:text-right">
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`Visit ${PERSONAL_INFO.name}'s LinkedIn`}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href={PERSONAL_INFO.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`Visit ${PERSONAL_INFO.name}'s Instagram`}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
              Instagram
            </a>
          </div>
          
          <div className="text-sm text-text-secondary font-mono">
            © {currentYear} {PERSONAL_INFO.name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
