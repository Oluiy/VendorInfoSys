import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="p-6">
      <main>{children}</main>
    </div>
  );
}
