"use client";

import React, { memo } from "react";

const ResourceBar = memo(({ energy, energyProductionRate }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-2 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-bold text-blue-400"></h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {/* 能量 */}
          <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
            <span className="text-sm font-medium">能量</span>
            <span className="text-sm text-green-400">
              {Math.floor(energy).toLocaleString()}
            </span>
            <span className="text-xs text-green-400">
              (+{energyProductionRate}/min)
            </span>
          </div>

          {/* 菜单按钮 */}
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
            菜单
          </button>
        </div>
      </div>
    </div>
  );
});

ResourceBar.displayName = "ResourceBar";

export default ResourceBar;
