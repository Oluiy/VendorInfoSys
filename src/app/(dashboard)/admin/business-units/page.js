"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getAllStandaloneBusinessUnits } from "@/lib/api";

export default function BusinessUnitsPage() {
  const [units, setUnits] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchUnits = async () => {
    try {
      const data = await getAllStandaloneBusinessUnits();
      setUnits(Array.isArray(data) ? data : []);
    } catch {
      setUnits([]);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/business-units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ BUnitName: form.name, Location: form.location }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to register business unit");
      setSuccess(
        `Business Unit registered! ID: ${
          data.BUnitID || data.id || "(unknown)"
        }`
      );
      setForm({ name: "", location: "" });
      fetchUnits();
    } catch (err) {
      setError(err.message || "Failed to register business unit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Active Business Units</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-4 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Business Unit"}
          </Button>
        </form>
      </div>
      <div className="bg-card p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Current Business Units</h2>
        {units.length === 0 ? (
          <div className="text-muted-foreground">No business units found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Business Unit ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                {units.map((unit, idx) => (
                  <tr key={unit.id || unit.BUnitID || idx}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {unit.BUnitName || unit.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {unit.Location || unit.location}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {unit.BUnitID || unit.id || "-"}
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
