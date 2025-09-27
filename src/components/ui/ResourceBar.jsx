"use client";

import React, { memo } from "react";

const ResourceBar = memo(({ resources, productionRates }) => {
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
              {Math.floor(resources.energy).toLocaleString()}
            </span>
            <span className="text-xs text-green-400">
              (+{productionRates.energy}/min)
            </span>
          </div>

          {/* 金属 */}
          <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
            <span className="text-sm font-medium">金属</span>
            <span className="text-sm text-green-400">
              {Math.floor(resources.metal).toLocaleString()}
            </span>
            <span className="text-xs text-green-400">
              (+{productionRates.metal}/min)
            </span>
          </div>

          {/* 晶体 */}
          <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
            <span className="text-sm font-medium">晶体</span>
            <span className="text-sm text-green-400">
              {Math.floor(resources.crystal).toLocaleString()}
            </span>
            <span className="text-xs text-green-400">
              (+{productionRates.crystal}/min)
            </span>
          </div>

          {/* 暗物质 */}
          <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
            <span className="text-sm font-medium">暗物质</span>
            <span className="text-sm text-purple-400">
              {Math.floor(resources.darkMatter)}
            </span>
            {productionRates.darkMatter > 0 && (
              <span className="text-xs text-purple-400">
                (+{productionRates.darkMatter}/min)
              </span>
            )}
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
