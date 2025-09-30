"use client";

import { useBuildingManager } from "@/hooks/useBuildingManager";

export default function BuildingView() {
  const {
    buildings,
    buildingQueue,
    buildBuilding,
    getBuildingStatus,
    getEnergyEfficiency,
    BUILDINGS_DATA,
  } = useBuildingManager();

  const energyEfficiency = getEnergyEfficiency();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">建筑管理</h2>

      {/* 能量生产效率显示 */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">能量生产效率</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">总产量:</span>
            <span className="ml-2 text-green-400">
              +{energyEfficiency.totalProduction}/min
            </span>
          </div>
          <div>
            <span className="text-gray-400">总消耗:</span>
            <span className="ml-2 text-red-400">
              -{energyEfficiency.totalConsumption}/min
            </span>
          </div>
          <div>
            <span className="text-gray-400">净产量:</span>
            <span
              className={`ml-2 ${
                energyEfficiency.netProduction >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {energyEfficiency.netProduction >= 0 ? "+" : ""}
              {energyEfficiency.netProduction}/min
            </span>
          </div>
          <div>
            <span className="text-gray-400">效率:</span>
            <span
              className={`ml-2 ${
                energyEfficiency.efficiency >= 80
                  ? "text-green-400"
                  : energyEfficiency.efficiency >= 50
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {energyEfficiency.efficiency.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* 建造队列 */}
      {buildingQueue.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">建造队列</h3>
          <div className="space-y-2">
            {buildingQueue.map((item, index) => {
              const progress = Math.min(
                100,
                ((Date.now() - item.startTime) / item.duration) * 100
              );
              const remainingTime = Math.max(
                0,
                Math.ceil(
                  (item.duration - (Date.now() - item.startTime)) / 1000
                )
              );

              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm">
                      {BUILDINGS_DATA[item.id].name} Lv.{item.level}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 ml-4">
                    {remainingTime}s
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 建筑列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(BUILDINGS_DATA).map(([buildingId, buildingData]) => {
          const status = getBuildingStatus(buildingId);

          return (
            <div key={buildingId} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{buildingData.name}</h3>
                  <p className="text-sm text-gray-400">
                    {buildingData.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    等级 {status.level}/{status.maxLevel}
                  </div>
                  {status.production.energy && (
                    <div className="text-xs text-green-400">
                      能量 +{status.production.energy}/min
                    </div>
                  )}
                  {status.consumption.energy && (
                    <div className="text-xs text-red-400">
                      消耗 -{status.consumption.energy}/min
                    </div>
                  )}
                </div>
              </div>

              {status.canUpgrade && (
                <div className="mt-3">
                  <div className="text-sm text-gray-400 mb-2">
                    升级成本:
                    {Object.entries(status.cost).map(([resource, amount]) => (
                      <span key={resource} className="ml-2">
                        {resource}: {amount}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => buildBuilding(buildingId)}
                    disabled={!status.canAfford || status.isBuilding}
                    className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
                      status.isBuilding
                        ? "bg-gray-600 cursor-not-allowed"
                        : status.canAfford
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-red-600 cursor-not-allowed"
                    }`}
                  >
                    {status.isBuilding
                      ? "建造中..."
                      : status.canAfford
                      ? "建造/升级"
                      : "资源不足"}
                  </button>
                </div>
              )}

              {!status.canUpgrade && (
                <div className="text-sm text-yellow-400 mt-2">
                  已达到最高等级
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
