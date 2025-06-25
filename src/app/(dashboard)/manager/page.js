"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getAllStandaloneBusinessUnits, getAllVendors, getProductsWithDetails } from "@/lib/api";
import { AddProductForm } from "@/components/forms/AddProductForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
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
    try {
      const allUnits = await getAllStandaloneBusinessUnits();
      const managerUnits = allUnits.filter(
        (u) => u.managerId === user.id || u.ManagerID === user.id
      );
      setUnits(allUnits);
      const vendorsArrays = await Promise.all(
        // managerUnits.map((unit) =>
        //   getAllVendors()
        // )
        getAllVendors()
      );
      setVendors(vendorsArrays.flat());
      const allProducts = await getProductsWithDetails();
      const unitIds = managerUnits.map((u) => u.id || u.BUnitID);
      const filteredProducts = allProducts.filter((p) =>
        unitIds.includes(p.unitId || p.BUnitID)
      );
      setProducts(filteredProducts);
    } catch {
      setError("Failed to load manager dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      {/* Vendor List Table */}
      <div className="bg-card rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Vendors in Your Business Units</h2>
        {vendors.length === 0 ? (
          <div className="text-muted-foreground">
            No vendors found for your business units.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                {vendors.map((vendor, idx) => (
                  <tr key={vendor.id || vendor.VendorID || idx}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {vendor.name || vendor.VendorName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {vendor.email || vendor.VendorEmail}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {vendor.phone || vendor.VendorPhone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Products List Table */}
      <div className="bg-card rounded-lg p-6 shadow mt-8">
        <h2 className="text-xl font-bold mb-4">
          Products Offered by Your Business Units
        </h2>
        {products.length === 0 ? (
          <div className="text-muted-foreground">
            No products found for your business units.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Business Unit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                {products.map((product, idx) => (
                  <tr key={product.id || product.ProductID || idx}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.ProductName || product.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.ProductType || product.type || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.ProductPrice !== undefined
                        ? `$${product.ProductPrice}`
                        : "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.BUnitName || product.businessUnitName || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <motion.div variants={itemVariants} className="lg:col-span-1">
        <AddProductForm units={units} onProductAdded={fetchData} />
      </motion.div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </motion.div>
  );
}