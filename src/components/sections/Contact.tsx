import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/src/components/ui/Button';
import { PERSONAL_INFO } from '@/src/data';
import { sendContactEmail, sendAutoReply } from '@/src/lib/email';
import { CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'Short-form (Reels/TikToks)',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project_type || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await sendContactEmail(formData);
      await sendAutoReply(formData);
      
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        project_type: 'Short-form (Reels/TikToks)',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setErrorMsg('Unable to send your inquiry. Please try again in a few moments.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
      <div className="bg-surface-1 rounded-[2.5rem] border border-border-subtle p-8 md:p-16 lg:p-24 relative overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight mb-6 leading-tight"
            >
              Let's create videos that don't just look great—they capture attention.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
              className="text-xl text-text-secondary mb-12 max-w-md font-light"
            >
              Want similar or even better results for your brand? Let's work together to build trust and deliver measurable results.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
              className="flex flex-col gap-4 text-text-secondary"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-mono uppercase tracking-wider">Email</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg font-medium text-text-primary hover:text-accent transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
            className="flex flex-col gap-6 relative"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">Name *</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-surface-2 border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-surface-2 border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">Project Type *</label>
                <select 
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  required
                  className="bg-surface-2 border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                >
                  <option value="Short-form (Reels/TikToks)">Short-form (Reels/TikToks)</option>
                  <option value="Long-form (YouTube)">Long-form (YouTube)</option>
                  <option value="Commercial / Ad">Commercial / Ad</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">Budget</label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="bg-surface-2 border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                >
                  <option value="">Select a range</option>
                  <option value="< $1,000">&lt; $1,000</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                  <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Message *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="bg-surface-2 border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                placeholder="Tell me about your project goals..."
              ></textarea>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full mt-4 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </Button>
          </motion.form>

        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface-1 border border-border-subtle p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-blue-400" />
              
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-4 mt-2">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-medium tracking-tight text-text-primary">Inquiry Sent Successfully</h3>
                <div className="text-text-secondary leading-relaxed flex flex-col gap-4 mt-2">
                  <p>Thank you for reaching out.</p>
                  <p>I've received your inquiry.</p>
                  <p>I'll review everything and get back to you within 24 hours.</p>
                </div>
                <Button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full mt-6"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
