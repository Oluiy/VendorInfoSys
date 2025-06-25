import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // Set your API base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock data functions for now
// Replace with actual API calls

const MOCK_VENDORS = [
  {
    id: 1,
    name: "EcoInnovate Solutions",
    email: "contact@ecoinnovate.com",
    contactPerson: "Alice Green",
  },
  {
    id: 2,
    name: "QuantumLeap Tech",
    email: "info@quantumleap.tech",
    contactPerson: "Bob Vance",
  },
  {
    id: 3,
    name: "Stellar Goods Co.",
    email: "support@stellargoods.com",
    contactPerson: "Charlie Day",
  },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    description: "A reusable bottle made from recycled materials.",
    price: 15.99,
    category: "Lifestyle",
  },
  {
    id: 2,
    name: "Quantum AI Assistant",
    description: "A next-gen AI to boost your productivity.",
    price: 99.99,
    category: "Technology",
  },
  {
    id: 3,
    name: "StellarGlow Night Lamp",
    description: "A beautiful lamp that projects the night sky.",
    price: 45.5,
    category: "Home Goods",
  },
  {
    id: 4,
    name: "Recycled Paper Notebook",
    description: "A 200-page notebook for all your ideas.",
    price: 9.99,
    category: "Stationery",
  },
];

// ------------------- AUTHENTICATION -------------------
export const login = async ({ role, id, password }) => {
  // role: 'admin' or 'vendor', id: adminID or vendorID
  const body =
    role === "admin" ? { ADMID: id, password } : { MGRID: id, password };
  const res = await apiClient.post("/api/login", body);
  return res.data;
};

export const registerAdmin = async ({
  OfficerName,
  OfficerEmailAddress,
  OfficerPhoneNo,
  OfficerPassword,
}) => {
  const res = await apiClient.post("/api/register-admin", {
    OfficerName,
    OfficerEmailAddress,
    OfficerPhoneNo,
    OfficerPassword,
  });
  return res.data;
};

// ------------------- BUSINESS UNITS -------------------
export const createBusinessUnit = async ({ BUnitName, Location }) => {
  const res = await apiClient.post("/api/business-units", {
    BUnitName,
    Location,
  });
  return res.data;
};

export const getStandaloneBusinessUnits = async () => {
  const res = await apiClient.get("/api/business-units");
  return res.data;
};

export const getSbuTypes = async () => {
  const res = await apiClient.get("/api/business-units/sbu-types");
  return res.data;
};

export const getBusinessUnitsWithoutProducts = async () => {
  const res = await apiClient.get("/api/business-units/without-products");
  return res.data;
};

export const getVendorsForBusinessUnit = async (id) => {
  const res = await apiClient.get(`/api/business-units/${id}/vendors`);
  return res.data;
};

// ------------------- PRODUCTS -------------------
export const getProductsWithDetails = async () => {
  const res = await apiClient.get("/api/products/with-details");
  return res.data;
};

export const searchProducts = async (type, price) => {
  const params = {};
  if (type) params.type = type;
  if (price) params.price = price;
  const res = await apiClient.get("/api/products/search", { params });
  return res.data;
};

// ------------------- VENDORS -------------------
export const getVendors = async () => {
  const res = await apiClient.get("/api/vendors");
  return res.data;
};

export const getLatestVendorRegistration = async () => {
  const res = await apiClient.get("/api/vendors/registrations/latest");
  return res.data;
};

export const getMultiUnitVendors = async () => {
  const res = await apiClient.get("/api/vendors/multi-unit");
  return res.data;
};

export const getManagers = async () => {
  const res = await apiClient.get("/api/managers");
  return res.data;
};

// ------------------- EMPLOYEES & OFFICERS -------------------
export const getEmployeesWithSupervisors = async () => {
  const res = await apiClient.get("/api/employees/with-supervisors");
  return res.data;
};

export const getRecentOnboardedEmployees = async () => {
  const res = await apiClient.get("/api/employees/recent-onboards");
  return res.data;
};

export const getOfficersWithEmployees = async () => {
  const res = await apiClient.get("/api/officers/with-employees");
  return res.data;
};

export const getOfficersWithoutRegistrations = async () => {
  const res = await apiClient.get("/api/officers/without-registrations");
  return res.data;
};

// ------------------- REPORTS -------------------
export const getProductCountByUnit = async () => {
  const res = await apiClient.get("/api/reports/product-count-by-unit");
  return res.data;
};

export const getProduct = async () => {
  const res = await apiClient.get("/api/reports/product-count-by-unit");
  return res.data;
};

export const getVendorCountByOfficer = async () => {
  const res = await apiClient.get("/api/reports/vendor-count-by-officer");
  return res.data;
};

export const getProductValueByUnit = async () => {
  const res = await apiClient.get("/api/reports/product-value-by-unit");
  return res.data;
};

export const addVendor = async (vendorData) => {
  console.log("Adding vendor...", vendorData);
  // return apiClient.post('/vendors', vendorData);
  return Promise.resolve({ data: { id: Date.now(), ...vendorData } }); // mock
};

export const addProduct = async (productData) => {
  console.log("Adding product...", productData);
  // return apiClient.post('/products', productData);
  return Promise.resolve({ data: { id: Date.now(), ...productData } }); // mock
};

// ... add other API functions as needed for managers, business units, etc.

export default apiClient;
