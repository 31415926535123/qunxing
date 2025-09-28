"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// 资源类型定义
export const RESOURCE_TYPES = {
  ENERGY: "energy",
  METAL: "metal",
  CRYSTAL: "crystal",
  DARK_MATTER: "darkMatter",
  ALLOY: "alloy",
  RESEARCH_POINTS: "researchPoints",
};

// 默认值
const DEFAULT_RESOURCES = {
  energy: 0,
  metal: 0,
  crystal: 0,
  darkMatter: 0,
  alloy: 0,
  researchPoints: 0,
};

const DEFAULT_PRODUCTION_RATES = {
  energy: 20,
  metal: 0,
  crystal: 0,
  darkMatter: 0,
  alloy: 0,
  researchPoints: 0,
};

const DEFAULT_STORAGE_CAPS = {
  energy: 1000,
  metal: 1000,
  crystal: 1000,
  darkMatter: 100,
  alloy: 500,
  researchPoints: 1000,
};

// 创建资源管理器组件
export const ResourceManager = ({ children }) => {
  const context = useResourceManager(
    DEFAULT_PRODUCTION_RATES,
    DEFAULT_STORAGE_CAPS
  );

  return children(context);
};

// 简化的资源管理器Hook
export const useResourceManager = (
  initialProductionRates = DEFAULT_PRODUCTION_RATES,
  initialStorageCaps = DEFAULT_STORAGE_CAPS
) => {
  const [resources, setResources] = useState(DEFAULT_RESOURCES);
  const [productionRates, setProductionRates] = useState({
    ...DEFAULT_PRODUCTION_RATES,
    ...initialProductionRates,
  });
  const [storageCaps, setStorageCaps] = useState({
    ...DEFAULT_STORAGE_CAPS,
    ...initialStorageCaps,
  });

  const lastUpdateTime = useRef(Date.now());
  const animationFrameRef = useRef(0);

  // 简化的更新方法
  const updateProductionRate = useCallback((resource, rate) => {
    setProductionRates((prev) => ({ ...prev, [resource]: rate }));
  }, []);

  const updateProductionRates = useCallback((newRates) => {
    setProductionRates((prev) => ({ ...prev, ...newRates }));
  }, []);

  const updateStorageCap = useCallback((resource, cap) => {
    setStorageCaps((prev) => ({ ...prev, [resource]: Math.max(0, cap) }));
  }, []);

  const canAfford = useCallback(
    (cost) => {
      return Object.entries(cost).every(([resource, amount]) => {
        if (!amount) return true;
        return resources[resource] >= amount;
      });
    },
    [resources]
  );

  const consumeResource = useCallback(
    (resource, amount) => {
      if (amount <= 0) return true;
      if (resources[resource] < amount) return false;

      setResources((prev) => ({
        ...prev,
        [resource]: Math.max(0, prev[resource] - amount),
      }));
      return true;
    },
    [resources]
  );

  const addResource = useCallback(
    (resource, amount) => {
      if (amount <= 0) return true;

      setResources((prev) => ({
        ...prev,
        [resource]: Math.min(prev[resource] + amount, storageCaps[resource]),
      }));
      return true;
    },
    [storageCaps]
  );

  // 优化的资源更新循环
  useEffect(() => {
    const updateResources = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000 / 60; // 直接转换为分钟
      lastUpdateTime.current = now;

      setResources((prev) => {
        const newResources = { ...prev };

        // 只更新有生产的资源
        Object.entries(productionRates).forEach(([resource, rate]) => {
          if (rate) {
            const resourceType = resource;
            const newAmount = prev[resourceType] + rate * deltaTime;
            newResources[resourceType] = Math.min(
              newAmount,
              storageCaps[resourceType]
            );
          }
        });

        return newResources;
      });

      animationFrameRef.current = requestAnimationFrame(updateResources);
    };

    animationFrameRef.current = requestAnimationFrame(updateResources);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [productionRates, storageCaps]);

  return {
    resources,
    productionRates,
    storageCaps,
    updateProductionRate,
    updateProductionRates,
    consumeResource,
    addResource,
    updateStorageCap,
    canAfford,
  };
};
