import { motion } from "framer-motion";
import { Globe2, Sparkles, MapPin } from "lucide-react";

const SearchPageFooterWidget = () => {
  return (
    <motion.div
      className="w-full  pb-10 pt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 backdrop-blur-md lg:mx-7 md:mx-4 mx-0">
        {/* خلفية ناعمة */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/50">
            <Globe2 size={14} />
            <span className="text-xs tracking-widest uppercase">
              Weather Scope
            </span>
          </div>

          <div className="flex items-center gap-1 text-white/30 text-xs">
            <Sparkles size={12} />
            live data stream
          </div>
        </div>

        {/* Center Content */}
        <div className="mt-6 text-center space-y-2">
          <h3 className="text-lg font-semibold text-white/80">
            Search completed
          </h3>

          <p className="text-sm text-white/40 leading-relaxed max-w-md mx-auto">
            You’re now at the end of the results feed. You can refine your
            query, explore another location, or refresh for updated weather
            insights.
          </p>
        </div>

        {/* Decorative “map pins” */}
        <div className="mt-6 flex items-center justify-center gap-6 text-white/20">
          <MapPin className="animate-pulse" size={16} />
          <div className="h-[1px] w-16 bg-white/10" />
          <MapPin className="animate-pulse" size={16} />
          <div className="h-[1px] w-16 bg-white/10" />
          <MapPin className="animate-pulse" size={16} />
        </div>

        {/* Bottom subtle indicator */}
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full w-1/2 bg-white/30"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPageFooterWidget;
