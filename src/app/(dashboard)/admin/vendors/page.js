"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getVendors } from "@/lib/api";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(Array.isArray(data) ? data : []);
    } catch {
      setVendors([]);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/vendors/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to onboard vendor");
      setSuccess(
        `Vendor onboarded! Vendor ID: ${
          data.VendorID || data.id || "(unknown)"
        }`
      );
      setForm({ name: "", email: "", phone: "", password: "" });
      fetchVendors();
    } catch (err) {
      setError(err.message || "Failed to onboard vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Vendors</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-4 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? "Onboarding..." : "Onboard Vendor"}
          </Button>
        </form>
      </div>
      <div className="bg-card p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Current Vendors</h2>
        {vendors.length === 0 ? (
          <div className="text-muted-foreground">No vendors found.</div>
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
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Vendor ID
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      {vendor.VendorID || vendor.id || "-"}
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
