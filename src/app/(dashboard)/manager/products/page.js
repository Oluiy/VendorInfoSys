 "use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllStandaloneBusinessUnits, getProductsWithDetails } from "@/lib/api";

export default function ManagerProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;
      setLoading(true);
      setError("");
      try {
        const allUnits = await getAllStandaloneBusinessUnits();
        const managerUnits = allUnits.filter(
          (u) => u.managerId === user.id || u.ManagerID === user.id
        );
        const unitIds = managerUnits.map((u) => u.id || u.BUnitID);
        const allProducts = await getProductsWithDetails();
        const filteredProducts = allProducts.filter((p) =>
          unitIds.includes(p.unitId || p.BUnitID)
        );
        setProducts(filteredProducts);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Products Offered by Your Business Units</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-muted-foreground">No products found for your business units.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Business Unit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
              {products.map((product, idx) => (
                <tr key={product.id || product.ProductID || idx}>
                  <td className="px-4 py-2 whitespace-nowrap">{product.ProductName || product.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.ProductType || product.type || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.ProductPrice !== undefined ? `$${product.ProductPrice}` : "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.BUnitName || product.businessUnitName || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
