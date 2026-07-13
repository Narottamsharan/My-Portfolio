import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface MonogramProps {
  className?: string;
  animated?: boolean;
}

export function Monogram({ className, animated = false }: MonogramProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  if (animated) {
    return (
      <svg className={cn("w-full h-full", className)} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <motion.path variants={pathVariants} initial="hidden" animate="visible" d="M8 32V8L20 32V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
         <motion.path variants={pathVariants} initial="hidden" animate="visible" d="M32 8H24V20H32V32H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
      </svg>
    );
  }
  
  return (
    <svg className={cn("w-full h-full", className)} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32V8L20 32V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
      <path d="M32 8H24V20H32V32H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}
