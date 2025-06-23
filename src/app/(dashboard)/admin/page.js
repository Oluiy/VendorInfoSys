"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AddVendorForm } from "@/components/forms/AddVendorForm";
import { RegisterBusinessUnitForm } from "@/components/forms/RegisterBusinessUnitForm";
import {
  getVendors,
  getStandaloneBusinessUnits,
  getEmployeesWithSupervisors,
  getProductsWithDetails,
  getProductCountByUnit,
  getVendorCountByOfficer,
  getProductValueByUnit,
  getLatestVendorRegistration,
  getMultiUnitVendors,
  getBusinessUnitsWithoutProducts,
  getSbuTypes,
  getOfficersWithEmployees,
  getOfficersWithoutRegistrations,
  getRecentOnboardedEmployees,
} from "@/lib/api";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

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

const AdminDashboardPage = () => {
  const [vendors, setVendors] = useState([]);
  const [units, setUnits] = useState([]);
  const [managers, setManagers] = useState([]);
  const [products, setProducts] = useState([]);
  const [reports, setReports] = useState({
    productCount: [],
    vendorCount: [],
    productValue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState("");
  const [latestVendor, setLatestVendor] = useState(null);
  const [multiUnitVendors, setMultiUnitVendors] = useState([]);
  const [unitsNoProducts, setUnitsNoProducts] = useState([]);
  const [sbuTypes, setSbuTypes] = useState([]);
  const [officersWithEmployees, setOfficersWithEmployees] = useState([]);
  const [officersNoRegistrations, setOfficersNoRegistrations] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [otherLoading, setOtherLoading] = useState(true);
  const [otherError, setOtherError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      getVendors(),
      getStandaloneBusinessUnits(),
      getEmployeesWithSupervisors(),
      getProductsWithDetails(),
    ])
      .then(([vendorsData, unitsData, managersData, productsData]) => {
        setVendors(vendorsData);
        setUnits(unitsData);
        setManagers(managersData);
        setProducts(productsData);
      })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));

    setReportsLoading(true);
    setReportsError("");
    Promise.all([
      getProductCountByUnit(),
      getVendorCountByOfficer(),
      getProductValueByUnit(),
    ])
      .then(([productCount, vendorCount, productValue]) => {
        setReports({ productCount, vendorCount, productValue });
      })
      .catch(() => setReportsError("Failed to load reports."))
      .finally(() => setReportsLoading(false));

    setOtherLoading(true);
    setOtherError("");
    Promise.all([
      getLatestVendorRegistration(),
      getMultiUnitVendors(),
      getBusinessUnitsWithoutProducts(),
      getSbuTypes(),
      getOfficersWithEmployees(),
      getOfficersWithoutRegistrations(),
      getRecentOnboardedEmployees(),
    ])
      .then(
        ([
          latestVendorData,
          multiUnitVendorsData,
          unitsNoProductsData,
          sbuTypesData,
          officersWithEmployeesData,
          officersNoRegistrationsData,
          recentEmployeesData,
        ]) => {
          setLatestVendor(latestVendorData);
          setMultiUnitVendors(multiUnitVendorsData);
          setUnitsNoProducts(unitsNoProductsData);
          setSbuTypes(sbuTypesData);
          setOfficersWithEmployees(officersWithEmployeesData);
          setOfficersNoRegistrations(officersNoRegistrationsData);
          setRecentEmployees(recentEmployeesData);
        }
      )
      .catch(() => setOtherError("Failed to load extra data."))
      .finally(() => setOtherLoading(false));
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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your vendors, units, and products.
        </p>
      </motion.div>

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
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Vendors</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v.id}>
                      <td>{v.name || v.VendorName}</td>
                      <td>{v.email || v.VendorEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Business Units</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((u) => (
                    <tr key={u.id}>
                      <td>{u.BUnitName || u.name}</td>
                      <td>{u.Location || u.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Managers</h3>
              {managers.length === 0 ? (
                <div>No managers found.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Supervisor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers.map((m) => (
                      <tr key={m.id}>
                        <td>{m.name || m.ManagerName}</td>
                        <td>{m.supervisor || m.SupervisorName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Products</h3>
              {products.length === 0 ? (
                <div>No products found.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Unit</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name || p.ProductName}</td>
                        <td>{p.unit || p.BusinessUnitName}</td>
                        <td>{p.price || p.Price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold mt-8">Reports</h2>
          {reportsLoading ? (
            <div>Loading reports...</div>
          ) : reportsError ? (
            <div className="text-red-500">{reportsError}</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Product Count by Unit</h4>
                <ul className="text-sm">
                  {reports.productCount.map((r, i) => (
                    <li key={i}>
                      {r.unit || r.BusinessUnitName}:{" "}
                      {r.count || r.ProductCount}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Vendor Count by Officer</h4>
                <ul className="text-sm">
                  {reports.vendorCount.map((r, i) => (
                    <li key={i}>
                      {r.officer || r.OfficerName}: {r.count || r.VendorCount}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Product Value by Unit</h4>
                <ul className="text-sm">
                  {reports.productValue.map((r, i) => (
                    <li key={i}>
                      {r.unit || r.BusinessUnitName}: ${r.value || r.TotalValue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mt-8">Other Insights</h2>
          {otherLoading ? (
            <div>Loading...</div>
          ) : otherError ? (
            <div className="text-red-500">{otherError}</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Latest Vendor Registration</h4>
                {latestVendor ? (
                  <div>
                    {latestVendor.name || latestVendor.VendorName} (
                    {latestVendor.email || latestVendor.VendorEmail})
                  </div>
                ) : (
                  <div>No data.</div>
                )}
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Multi-Unit Vendors</h4>
                <ul className="text-sm">
                  {multiUnitVendors.map((v, i) => (
                    <li key={i}>{v.name || v.VendorName}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Units Without Products</h4>
                <ul className="text-sm">
                  {unitsNoProducts.map((u, i) => (
                    <li key={i}>{u.BUnitName || u.name}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">SBU Types</h4>
                <ul className="text-sm">
                  {sbuTypes.map((s, i) => (
                    <li key={i}>{s.type || s.TypeName}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Officers With Employees</h4>
                <ul className="text-sm">
                  {officersWithEmployees.map((o, i) => (
                    <li key={i}>{o.name || o.OfficerName}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">
                  Officers Without Registrations
                </h4>
                <ul className="text-sm">
                  {officersNoRegistrations.map((o, i) => (
                    <li key={i}>{o.name || o.OfficerName}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Recent Onboarded Employees</h4>
                <ul className="text-sm">
                  {recentEmployees.map((e, i) => (
                    <li key={i}>{e.name || e.EmployeeName}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AdminProtected() {
  return (
    <ProtectedRoute role="admin">
      <AdminDashboardPage />
    </ProtectedRoute>
  );
}
