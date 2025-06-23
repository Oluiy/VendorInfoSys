"use client";

import React from "react";
import { motion } from "framer-motion";
import { AddVendorForm } from "@/components/forms/AddVendorForm";
import { RegisterBusinessUnitForm } from "@/components/forms/RegisterBusinessUnitForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const AdminDashboardPage = () => {
  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your vendors, units, and products.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid gap-12 md:grid-cols-2"
      >
        <AddVendorForm />
        <RegisterBusinessUnitForm />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Data Overview</h2>
          <p className="text-muted-foreground">
            A snapshot of your system's data.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Placeholders for data lists */}
          <div className="p-4 border rounded-lg">Vendors List...</div>
          <div className="p-4 border rounded-lg">Managers List...</div>
          <div className="p-4 border rounded-lg">Business Units List...</div>
          <div className="p-4 border rounded-lg">Products List...</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;
