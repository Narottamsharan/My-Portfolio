import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/src/data';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 lg:px-12 max-w-4xl mx-auto border-t border-border-subtle">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-medium tracking-tight mb-4">Common Questions</h2>
        <p className="text-text-secondary">Everything you need to know about the process.</p>
      </div>

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
              className={cn(
                "rounded-2xl border transition-colors duration-300 overflow-hidden",
                isOpen ? "bg-surface-1 border-border-subtle" : "bg-transparent border-border-subtle hover:border-border-subtle"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                  isOpen ? "bg-accent text-background" : "bg-surface-2 text-text-secondary"
                )}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
