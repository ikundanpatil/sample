import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const Loader = ({ text = 'Autonomous Agent Analyzing...', size = 'md' }) => {
  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className={`relative ${containerSizes[size]} flex items-center justify-center`}>
        {/* Outer Rotating Orbit Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-700"
        />

        {/* Counter Rotating Orbit Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-zinc-800 border-t-white"
        />

        {/* Center Pulsing Circle */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-4 rounded-full bg-zinc-900 border border-zinc-700 shadow-lg flex items-center justify-center"
        >
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </motion.div>

        {/* Orbiting Satellite Node */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm translate-x-10" />
        </motion.div>
      </div>

      {text && (
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Sparkles className="w-4 h-4 text-white animate-bounce" />
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
