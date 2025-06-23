import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
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

export const getVendors = async () => {
  console.log("Fetching vendors...");
  // return apiClient.get('/vendors');
  return Promise.resolve({ data: MOCK_VENDORS }); // mock
};

export const addVendor = async (vendorData) => {
  console.log("Adding vendor...", vendorData);
  // return apiClient.post('/vendors', vendorData);
  return Promise.resolve({ data: { id: Date.now(), ...vendorData } }); // mock
};

export const getProducts = async () => {
  console.log("Fetching products...");
  // return apiClient.get('/products');
  return Promise.resolve({ data: MOCK_PRODUCTS }); // mock
};

export const addProduct = async (productData) => {
  console.log("Adding product...", productData);
  // return apiClient.post('/products', productData);
  return Promise.resolve({ data: { id: Date.now(), ...productData } }); // mock
};

// ... add other API functions as needed for managers, business units, etc.

export default apiClient;
