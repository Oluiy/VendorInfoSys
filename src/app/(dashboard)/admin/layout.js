import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="p-6">
      {/* Admin specific sidebar or navbar can go here */}
      <main>{children}</main>
    </div>
  );
}
