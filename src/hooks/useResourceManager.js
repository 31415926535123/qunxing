"use client";

import { useState, useEffect, useRef } from "react";

// 默认值
const DEFAULT_ENERGY = 0;
const DEFAULT_ENERGY_PRODUCTION_RATE = 20;
const DEFAULT_ENERGY_STORAGE_CAP = 1000;

// 创建资源管理器组件 - 保持向后兼容
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

  // 更新能量生产率
  const updateEnergyProductionRate = (rate) => {
    setEnergyProductionRate(rate);
  };

  // 更新能量存储容量
  const updateEnergyStorageCap = (cap) => {
    setEnergyStorageCap(Math.max(0, cap));
  };

  // 检查是否足够能量
  const canAfford = (cost) => {
    return energy >= cost;
  };

  // 消耗能量
  const consumeEnergy = (amount) => {
    if (amount <= 0) return true;
    if (energy < amount) return false;

    setEnergy((prev) => Math.max(0, prev - amount));
    return true;
  };

  // 添加能量
  const addEnergy = (amount) => {
    if (amount <= 0) return true;

    setEnergy((prev) => Math.min(prev + amount, energyStorageCap));
    return true;
  };

  // 能量更新循环 - 每秒更新一次就够了
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000 / 60; // 转换为分钟
      lastUpdateTime.current = now;

      setEnergy((prev) => {
        const newAmount = prev + energyProductionRate * deltaTime;
        return Math.min(newAmount, energyStorageCap);
      });
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval);
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
