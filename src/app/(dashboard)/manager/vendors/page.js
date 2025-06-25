"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getStandaloneBusinessUnits,
  getVendorsForBusinessUnit,
} from "@/lib/api";

export default function ManagerVendorsPage() {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      if (!user) return;
      setLoading(true);
      setError("");
      try {
        const allUnits = await getStandaloneBusinessUnits();
        const managerUnits = allUnits.filter(
          (u) => u.managerId === user.id || u.ManagerID === user.id
        );
        const vendorsArrays = await Promise.all(
          managerUnits.map((unit) =>
            getVendorsForBusinessUnit(unit.id || unit.BUnitID)
          )
        );
        setVendors(vendorsArrays.flat());
      } catch {
        setError("Failed to load vendors.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [user]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">
        Vendors in Your Business Units
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : vendors.length === 0 ? (
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
  );
}
