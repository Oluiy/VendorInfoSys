"use client";
import React, { useEffect, useState } from "react";
import { getProductsWithDetails } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsWithDetails();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="bg-card p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        {products.length === 0 ? (
          <div className="text-muted-foreground">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Business Unit(s)
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
                      {Array.isArray(product.businessUnits)
                        ? product.businessUnits
                            .map((bu) => bu.BUnitName || bu.name)
                            .join(", ")
                        : product.BUnitName || product.businessUnitName || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
