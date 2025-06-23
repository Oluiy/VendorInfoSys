import React from "react";

// This page will fetch and display details for a specific vendor
// based on the ID from the URL.
const VendorDetailPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vendor Details</h1>
      <p>Showing details for vendor ID: {id}</p>
      {/* TODO: Fetch vendor data using the id and display profile, business units, and products */}
    </div>
  );
};

export default VendorDetailPage;
