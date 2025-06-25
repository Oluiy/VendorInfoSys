import React from "react";

export default function ManagerLayout({ children }) {
  return (
    <div className="p-6">
      <main>{children}</main>
    </div>
  );
}
