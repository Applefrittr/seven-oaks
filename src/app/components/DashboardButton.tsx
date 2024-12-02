import React from "react";

export default function DashboardButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white`}>
      {children}
    </button>
  );
}
