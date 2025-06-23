"use client";

import React from "react";
import { motion } from "framer-motion";
import { AddProductForm } from "@/components/forms/AddProductForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const VendorDashboardPage = () => {
  // Mock product data for the catalog
  const products = [
    { id: 1, name: "Eco-Friendly Water Bottle", price: 15.99, stock: 150 },
    { id: 2, name: "Recycled Paper Notebook", price: 9.99, stock: 300 },
    { id: 3, name: "Bamboo Toothbrush Set", price: 12.5, stock: 200 },
  ];

  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage your product catalog.</p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <AddProductForm />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Product Catalog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </p>
                  </div>
                  <p className="font-bold">${product.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VendorDashboardPage;
