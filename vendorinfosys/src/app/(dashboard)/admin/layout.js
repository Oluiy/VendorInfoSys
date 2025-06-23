import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* Admin specific sidebar or navbar can go here */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
