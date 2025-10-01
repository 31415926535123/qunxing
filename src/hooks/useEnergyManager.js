"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 创建 Energy Context
const EnergyContext = createContext();

// 纯状态管理 hook - 只做一件事：管理能量状态
export const useEnergyManager = () => {
  // 纯状态管理，不涉及数据持久化
  const [energy, setEnergy] = useState(0);
  const [productionRate, setProductionRate] = useState(20);
  const [storageCap, setStorageCap] = useState(1000);

  // 能量自动增长
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + productionRate / 60, storageCap));
    }, 1000);

    return () => clearInterval(interval);
  }, [productionRate, storageCap]);

  return {
    energy,
    productionRate,
    storageCap,
    setEnergy,
    setProductionRate,
    setStorageCap,
    consume: (amount) => {
      if (energy >= amount) {
        setEnergy((prev) => prev - amount);
        return true;
      }
      return false;
    },
    add: (amount) => {
      setEnergy((prev) => Math.min(prev + amount, storageCap));
    },
    canAfford: (amount) => energy >= amount,
  };
};

// Energy Provider 组件
export const EnergyProvider = ({ children }) => {
  const energyData = useEnergyManager();

  return (
    <EnergyContext.Provider value={energyData}>
      {children}
    </EnergyContext.Provider>
  );
};

// 使用 Energy Context 的 hook
export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error("useEnergy must be used within an EnergyProvider");
  }
  return context;
};
