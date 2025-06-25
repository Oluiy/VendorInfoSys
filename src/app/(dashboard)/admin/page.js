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
  getProductCountByUnit,
  getManagers,
  getProducts,
} from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  const [productCount, setProductCount] = useState(0);
  const [productCountByUnit, setProductCountByUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [vendorForm, setVendorForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [managerForm, setManagerForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [vendorSuccess, setVendorSuccess] = useState("");
  const [managerSuccess, setManagerSuccess] = useState("");
  const [vendorLoading, setVendorLoading] = useState(false);
  const [managerLoading, setManagerLoading] = useState(false);
  const [vendorError, setVendorError] = useState("");
  const [managerError, setManagerError] = useState("");

  useEffect(() => {
    Promise.all([
      getVendors(),
      getManagers(),
      getStandaloneBusinessUnits(),
      getProducts(), // returns a number
      getProductCountByUnit(), // returns an array
    ])
      .then(
        ([
          vendorsData,
          managersData,
          unitsData,
          productCount,
          productCountData,
        ]) => {
          setVendors(vendorsData);
          setManagers(managersData);
          setUnits(unitsData);
          setProductCount(productCountData);
          const chartData = Array.isArray(productCount)
            ? productCount.map((item) => ({
                unit: item.BUnitName,
                count: item.ProductCount,
              }))
            : [];
          setProductCountByUnit(chartData);
        }
      )
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  // Prepare chart data for Products per Business Unit
  const chartData =
    Array.isArray(productCountByUnit) && productCountByUnit.length > 0
      ? productCountByUnit
      : units.map((unit) => ({ unit: unit.BUnitName || unit.name, count: 0 }));

  // Onboard Vendor
  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    setVendorLoading(true);
    setVendorError("");
    setVendorSuccess("");
    try {
      const res = await fetch("/api/vendors/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: vendorForm.name,
          email: vendorForm.email,
          phone: vendorForm.phone,
          password: vendorForm.password,
        }),
      });
      if (!res.ok) throw new Error("Failed to onboard vendor");
      setVendorSuccess("Vendor onboarded successfully!");
      setVendorForm({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      setVendorError("Failed to onboard vendor");
    } finally {
      setVendorLoading(false);
    }
  };

  // Onboard Manager
  const handleManagerSubmit = async (e) => {
    e.preventDefault();
    setManagerLoading(true);
    setManagerError("");
    setManagerSuccess("");
    try {
      const res = await fetch("/api/managers/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: managerForm.name,
          email: managerForm.email,
          phone: managerForm.phone,
          password: managerForm.password,
        }),
      });
      if (!res.ok) throw new Error("Failed to onboard manager");
      setManagerSuccess("Manager onboarded successfully!");
      setManagerForm({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      setManagerError("Failed to onboard manager");
    } finally {
      setManagerLoading(false);
    }
  };

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
            <div className="text-2xl font-bold">
              {Array.isArray(productCountByUnit)
                ? productCountByUnit.reduce((acc, u) => acc + (u.count || 0), 0)
                : 0}
            </div>
            <div className="text-muted-foreground">Products</div>
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
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </motion.div>
  );
}
