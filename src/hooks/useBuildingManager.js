"use client";

import { useState, useEffect, useCallback } from "react";
import { useEnergy } from "@/hooks/useEnergyManager";

// 从JSON文件导入建筑数据
import buildingsData from "@/data/buildings.json";

// 将JSON数据转换为扁平化格式以便于使用
const BUILDINGS_DATA = {};
Object.values(buildingsData.buildings).forEach((category) => {
  Object.values(category).forEach((building) => {
    BUILDINGS_DATA[building.id] = building;
  });
});

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

    // 默认建筑状态 - 初始化所有建筑为0级，除了基础建筑
    const defaultBuildings = {};
    Object.keys(BUILDINGS_DATA).forEach((buildingId) => {
      defaultBuildings[buildingId] = 0;
    });

    // 设置初始建筑
    defaultBuildings.solar_panel = 1;
    defaultBuildings.metal_mine = 1;

    return defaultBuildings;
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
