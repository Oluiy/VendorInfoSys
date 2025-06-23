import React from "react";

const VendorLayout = ({ children }) => {
  return (
    <div>
      {/* Vendor specific sidebar or navbar can go here */}
      <main>{children}</main>
    </div>
  );
};

export default VendorLayout;
