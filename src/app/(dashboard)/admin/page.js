"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  getVendors,
  getStandaloneBusinessUnits,
  getProductsWithDetails,
  getProductCountByUnit,
  getManagers,
  getProducts,
} from "@/lib/api";

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

export default function AdminDashboardPage() {
  const [vendors, setVendors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [units, setUnits] = useState([]);
  // const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [productCountByUnit, setProductCountByUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


useEffect(() => {
  Promise.all([
    getVendors(),
    getManagers(),
    getStandaloneBusinessUnits(),
    getProducts(), // returns a number
    getProductCountByUnit(), // returns an array
  ]).then(([vendorsData, managersData, unitsData, productCount, productCountData]) => {
    setVendors(vendorsData);
    setManagers(managersData);
    setUnits(unitsData);
    setProductCount(productCountData);
    const chartData = Array.isArray(productCount)
      ? productCount.map(item => ({
          unit: item.BUnitName,
          count: item.ProductCount,
        }))
      : [];
    setProductCountByUnit(chartData);
  })  
  .catch(() => setError("Failed to load dashboard data."))
  .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{vendors}</div>
            <div className="text-muted-foreground">Vendors</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{managers}</div>
            <div className="text-muted-foreground">Managers</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{units}</div>
            <div className="text-muted-foreground">Business Units</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{productCount}</div>
            <div className="text-muted-foreground">Products</div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Products per Business Unit</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productCountByUnit} 
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unit" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </motion.div>
  );
}
