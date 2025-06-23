"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
        >
          Vendor Information System
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Streamline your vendor and product management with an intuitive,
          role-based system.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
