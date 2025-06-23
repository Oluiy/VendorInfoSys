"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AddProductForm } from "@/components/forms/AddProductForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsWithDetails } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

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
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError("");
    getProductsWithDetails()
      .then((allProducts) => {
        // Filter by vendor ID (assuming product.vendorId or product.VendorID)
        const vendorId = user.id || user.vendorId || user.VendorID;
        const filtered = allProducts.filter(
          (p) => p.vendorId === vendorId || p.VendorID === vendorId
        );
        setProducts(filtered);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, [user]);

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
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : products.length === 0 ? (
                <div>No products found.</div>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-2 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {product.name || product.ProductName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.stock ? `Stock: ${product.stock}` : null}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${product.price || product.Price}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function VendorProtected() {
  return (
    <ProtectedRoute role="vendor">
      <VendorDashboardPage />
    </ProtectedRoute>
  );
}
