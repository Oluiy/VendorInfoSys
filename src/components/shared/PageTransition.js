"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* 
          This wrapper now only enables exit animations. 
          The pages themselves define their enter/exit transitions.
        */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
