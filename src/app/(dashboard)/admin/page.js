"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AddVendorForm } from "@/components/forms/AddVendorForm";
import RegisterBusinessUnitForm from "@/components/forms/RegisterBusinessUnitForm";
import { Button } from "@/components/ui/button";

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

function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendors");
        setVendors(response.data);
      } catch (err) {
        setError("Failed to fetch vendors.");
        console.error(err);
      }
    };
    fetchVendors();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Vendors</h3>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Vendor ID</th>
              <th scope="col" className="py-3 px-6">Vendor Name</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr key={vendor.VendorID} className="bg-white border-b">
                  <td className="py-4 px-6">{vendor.VendorID}</td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{vendor.VendorName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 px-6 text-center">No vendors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const AdminDashboardPage = () => {
  const [view, setView] = useState(null);

  const renderView = () => {
    switch (view) {
      case "vendors":
        return <VendorsList />;
      // Add cases for 'managers', 'units', 'products' here
      default:
        return null;
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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your vendors, units, and products.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex space-x-4 mb-8"
      >
        <Button variant="outline" onClick={() => setView(view === "vendors" ? null : "vendors")}>
          {view === "vendors" ? "Hide Vendors" : "Vendors List..."}
        </Button>
        {/* Add other list buttons here */}
        <Button variant="outline" disabled>Managers List...</Button>
        <Button variant="outline" disabled>Business Units List...</Button>
        <Button variant="outline" disabled>Products List...</Button>
      </motion.div>

      {renderView()}

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
