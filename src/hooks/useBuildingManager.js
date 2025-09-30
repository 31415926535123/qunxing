"use client";

import { useState, useEffect, useCallback } from "react";
import { useEnergy } from "@/hooks/useEnergyManager";

// 建筑数据
const BUILDINGS_DATA = {
  solar_panel: {
    id: "solar_panel",
    name: "太阳能板",
    description: "基础能源生产设施",
    category: "energy_production",
    base_cost: { metal: 100, crystal: 50 },
    base_production: { energy: 10 },
    base_consumption: {},
    build_time: 30,
    max_level: 10,
    upgrade_multiplier: 1.5,
    production_multiplier: 1.3,
    requires: [],
    effects: { energy_production: 10 },
  },
  fusion_reactor: {
    id: "fusion_reactor",
    name: "聚变反应堆",
    description: "高效能源生产设施",
    category: "energy_production",
    base_cost: { metal: 500, crystal: 200, energy: 100 },
    base_production: { energy: 50 },
    base_consumption: {},
    build_time: 120,
    max_level: 5,
    upgrade_multiplier: 2.0,
    production_multiplier: 1.5,
    requires: [{ type: "technology", id: "magnetic_confinement_fusion" }],
    effects: { energy_production: 50 },
  },
  metal_mine: {
    id: "metal_mine",
    name: "金属矿场",
    description: "开采金属资源的基础设施",
    category: "resource_production",
    base_cost: { metal: 60, energy: 20 },
    base_production: { metal: 20 },
    base_consumption: { energy: 5 },
    build_time: 20,
    max_level: 15,
    upgrade_multiplier: 1.4,
    production_multiplier: 1.25,
    requires: [],
    effects: { metal_production: 20 },
  },
  crystal_mine: {
    id: "crystal_mine",
    name: "晶体矿场",
    description: "开采晶体资源的基础设施",
    category: "resource_production",
    base_cost: { metal: 120, crystal: 30, energy: 30 },
    base_production: { crystal: 10 },
    base_consumption: { energy: 8 },
    build_time: 40,
    max_level: 12,
    upgrade_multiplier: 1.5,
    production_multiplier: 1.3,
    requires: [{ type: "technology", id: "basic_planetology" }],
    effects: { crystal_production: 10 },
  },
};

// 计算建筑升级成本
const calculateUpgradeCost = (buildingId, currentLevel) => {
  const building = BUILDINGS_DATA[buildingId];
  if (!building) return {};

  const cost = {};
  Object.entries(building.base_cost).forEach(([resource, baseCost]) => {
    cost[resource] = Math.floor(
      baseCost * Math.pow(building.upgrade_multiplier, currentLevel)
    );
  });

  return cost;
};

// 计算建筑生产效率
const calculateBuildingProduction = (buildingId, level) => {
  const building = BUILDINGS_DATA[buildingId];
  if (!building || level <= 0) return { production: {}, consumption: {} };

  const production = {};
  const consumption = {};

  // 计算生产量
  Object.entries(building.base_production).forEach(
    ([resource, baseProduction]) => {
      production[resource] = Math.floor(
        baseProduction * Math.pow(building.production_multiplier, level - 1)
      );
    }
  );

  // 计算消耗量
  Object.entries(building.base_consumption).forEach(
    ([resource, baseConsumption]) => {
      consumption[resource] = Math.floor(
        baseConsumption * Math.pow(building.production_multiplier, level - 1)
      );
    }
  );

  return { production, consumption };
};

// 计算能量生产效率
const calculateEnergyEfficiency = (buildings) => {
  let totalEnergyProduction = 0;
  let totalEnergyConsumption = 0;

  Object.entries(buildings).forEach(([buildingId, level]) => {
    if (level > 0) {
      const { production, consumption } = calculateBuildingProduction(
        buildingId,
        level
      );
      totalEnergyProduction += production.energy || 0;
      totalEnergyConsumption += consumption.energy || 0;
    }
  });

  const netEnergyProduction = totalEnergyProduction - totalEnergyConsumption;
  const efficiency =
    totalEnergyProduction > 0
      ? (netEnergyProduction / totalEnergyProduction) * 100
      : 0;

  return {
    totalProduction: totalEnergyProduction,
    totalConsumption: totalEnergyConsumption,
    netProduction: netEnergyProduction,
    efficiency: Math.max(0, Math.min(100, efficiency)),
  };
};

export const useBuildingManager = () => {
  const { energy, productionRate, setProductionRate } = useEnergy();
  const [buildings, setBuildings] = useState(() => {
    // 从localStorage加载建筑状态
    try {
      const saved = localStorage.getItem("buildings");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn("Failed to load buildings:", error);
    }

    // 默认建筑状态
    return {
      solar_panel: 1,
      metal_mine: 1,
      crystal_mine: 0,
      fusion_reactor: 0,
    };
  });

  const [buildingQueue, setBuildingQueue] = useState([]);

  // 保存建筑状态到localStorage
  useEffect(() => {
    localStorage.setItem("buildings", JSON.stringify(buildings));
  }, [buildings]);

  // 计算能量生产效率并更新能量生产率
  useEffect(() => {
    const energyEfficiency = calculateEnergyEfficiency(buildings);
    setProductionRate(energyEfficiency.netProduction);
  }, [buildings, setProductionRate]);

  // 建造建筑
  const buildBuilding = useCallback(
    (buildingId) => {
      const building = BUILDINGS_DATA[buildingId];
      if (!building) return false;

      const currentLevel = buildings[buildingId] || 0;
      if (currentLevel >= building.max_level) return false;

      const cost = calculateUpgradeCost(buildingId, currentLevel);

      // 检查是否有足够资源（这里简化处理，只检查能量）
      if (energy < (cost.energy || 0)) return false;

      // 添加到建造队列
      const buildItem = {
        id: buildingId,
        level: currentLevel + 1,
        startTime: Date.now(),
        duration: building.build_time * 1000,
        cost,
      };

      setBuildingQueue((prev) => [...prev, buildItem]);
      return true;
    },
    [buildings, energy]
  );

  // 处理建造队列
  useEffect(() => {
    if (buildingQueue.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const completedItems = buildingQueue.filter(
        (item) => now >= item.startTime + item.duration
      );

      if (completedItems.length > 0) {
        // 完成建造
        setBuildings((prev) => {
          const newBuildings = { ...prev };
          completedItems.forEach((item) => {
            newBuildings[item.id] = item.level;
          });
          return newBuildings;
        });

        // 从队列中移除已完成项目
        setBuildingQueue((prev) =>
          prev.filter((item) => !completedItems.includes(item))
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [buildingQueue]);

  // 获取建筑状态
  const getBuildingStatus = useCallback(
    (buildingId) => {
      const level = buildings[buildingId] || 0;
      const building = BUILDINGS_DATA[buildingId];

      if (!building) return null;

      const cost = calculateUpgradeCost(buildingId, level);
      const { production, consumption } = calculateBuildingProduction(
        buildingId,
        level
      );
      const canUpgrade = level < building.max_level;
      const canAfford = energy >= (cost.energy || 0);

      // 检查是否有正在建造的项目
      const isBuilding = buildingQueue.some((item) => item.id === buildingId);

      return {
        level,
        maxLevel: building.max_level,
        cost,
        production,
        consumption,
        canUpgrade,
        canAfford,
        isBuilding,
        building: BUILDINGS_DATA[buildingId],
      };
    },
    [buildings, energy, buildingQueue]
  );

  // 获取能量生产效率
  const getEnergyEfficiency = useCallback(() => {
    return calculateEnergyEfficiency(buildings);
  }, [buildings]);

  return {
    buildings,
    buildingQueue,
    buildBuilding,
    getBuildingStatus,
    getEnergyEfficiency,
    BUILDINGS_DATA,
  };
};
