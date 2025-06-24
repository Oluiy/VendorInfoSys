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
import { useAuth } from "@/context/AuthContext";
import {
  getProductsWithDetails,
  getStandaloneBusinessUnits,
  getVendorsForBusinessUnit,
} from "@/lib/api";
import { AddProductForm } from "@/components/forms/AddProductForm";

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

export default function ManagerDashboardPage() {
  const { user } = useAuth();
  const [units, setUnits] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    // Fetch manager's business units, vendors, and products
    getStandaloneBusinessUnits()
      .then((allUnits) => {
        // Filter units managed by this manager
        const managerUnits = allUnits.filter(
          (u) => u.managerId === user.id || u.ManagerID === user.id
        );
        setUnits(managerUnits);
        // Fetch vendors for each unit
        return Promise.all(
          managerUnits.map((unit) =>
            getVendorsForBusinessUnit(unit.id || unit.BUnitID)
          )
        );
      })
      .then((vendorsArrays) => {
        setVendors(vendorsArrays.flat());
        return getProductsWithDetails();
      })
      .then((allProducts) => {
        // Filter products offered in manager's units
        const unitIds = units.map((u) => u.id || u.BUnitID);
        const filteredProducts = allProducts.filter((p) =>
          unitIds.includes(p.unitId || p.BUnitID)
        );
        setProducts(filteredProducts);
      })
      .catch(() => setError("Failed to load manager dashboard data."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Chart data: products per unit
  const chartData = units.map((unit) => ({
    unit: unit.BUnitName || unit.name,
    count: products.filter(
      (p) => (p.unitId || p.BUnitID) === (unit.id || unit.BUnitID)
    ).length,
  }));

  return (
    <motion.div
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{units.length}</div>
            <div className="text-muted-foreground">Your Business Units</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{vendors.length}</div>
            <div className="text-muted-foreground">Vendors</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-muted-foreground">Products Offered</div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Products per Business Unit</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <AddProductForm units={units} onProductAdded={fetchData} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
          {/* ... (product catalog card) ... */}
        </motion.div>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </motion.div>
  );
}
