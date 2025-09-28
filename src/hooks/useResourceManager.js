"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// 默认值
const DEFAULT_ENERGY = 0;
const DEFAULT_ENERGY_PRODUCTION_RATE = 20;
const DEFAULT_ENERGY_STORAGE_CAP = 1000;

// 创建资源管理器组件
export const ResourceManager = ({ children }) => {
  const context = useResourceManager();

  return children(context);
};

// 简化的资源管理器Hook - 只管理能量
export const useResourceManager = () => {
  const [energy, setEnergy] = useState(DEFAULT_ENERGY);
  const [energyProductionRate, setEnergyProductionRate] = useState(
    DEFAULT_ENERGY_PRODUCTION_RATE
  );
  const [energyStorageCap, setEnergyStorageCap] = useState(
    DEFAULT_ENERGY_STORAGE_CAP
  );

  const lastUpdateTime = useRef(Date.now());
  const animationFrameRef = useRef(0);

  // 更新能量生产率
  const updateEnergyProductionRate = useCallback((rate) => {
    setEnergyProductionRate(rate);
  }, []);

  // 更新能量存储容量
  const updateEnergyStorageCap = useCallback((cap) => {
    setEnergyStorageCap(Math.max(0, cap));
  }, []);

  // 检查是否足够能量
  const canAfford = useCallback(
    (cost) => {
      return energy >= cost;
    },
    [energy]
  );

  // 消耗能量
  const consumeEnergy = useCallback(
    (amount) => {
      if (amount <= 0) return true;
      if (energy < amount) return false;

      setEnergy((prev) => Math.max(0, prev - amount));
      return true;
    },
    [energy]
  );

  // 添加能量
  const addEnergy = useCallback(
    (amount) => {
      if (amount <= 0) return true;

      setEnergy((prev) => Math.min(prev + amount, energyStorageCap));
      return true;
    },
    [energyStorageCap]
  );

  // 能量更新循环
  useEffect(() => {
    const updateEnergy = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000 / 60; // 转换为分钟
      lastUpdateTime.current = now;

      setEnergy((prev) => {
        const newAmount = prev + energyProductionRate * deltaTime;
        return Math.min(newAmount, energyStorageCap);
      });

      animationFrameRef.current = requestAnimationFrame(updateEnergy);
    };

    animationFrameRef.current = requestAnimationFrame(updateEnergy);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [energyProductionRate, energyStorageCap]);

  return {
    energy,
    energyProductionRate,
    energyStorageCap,
    updateEnergyProductionRate,
    updateEnergyStorageCap,
    consumeEnergy,
    addEnergy,
    canAfford,
  };
};
