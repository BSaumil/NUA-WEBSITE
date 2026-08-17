import React from "react";

export default function RouteLoader() {
  return (
    <div
      data-testid="route-loader"
      className="min-h-screen flex items-center justify-center bg-nua-bg"
    >
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#f58c14] animate-spin" />
    </div>
  );
}
