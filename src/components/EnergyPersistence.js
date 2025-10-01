"use client";

import { useEffect } from "react";
import { useEnergy } from "@/hooks/useEnergyManager";

// 纯持久化逻辑 - 处理数据加载和保存
export const EnergyPersistence = () => {
  const {
    energy,
    productionRate,
    storageCap,
    setEnergy,
    setProductionRate,
    setStorageCap,
  } = useEnergy();

  // 初始化时加载保存的状态
  useEffect(() => {
    const loadState = () => {
      try {
        const saved = localStorage.getItem("energyState");
        if (saved) {
          const { energy, productionRate, storageCap } = JSON.parse(saved);

          if (
            typeof energy === "number" &&
            typeof productionRate === "number" &&
            typeof storageCap === "number"
          ) {
            setEnergy(energy);
            setProductionRate(productionRate);
            setStorageCap(storageCap);
          }
        }
      } catch (error) {
        console.warn("Failed to load energy state:", error);
      }
    };

    loadState();
  }, [setEnergy, setProductionRate, setStorageCap]);

  // 保存状态到 localStorage
  useEffect(() => {
    const saveState = () => {
      try {
        localStorage.setItem(
          "energyState",
          JSON.stringify({
            energy,
            productionRate,
            storageCap,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.warn("Failed to save energy state:", error);
      }
    };

    // 页面卸载时保存
    const handleBeforeUnload = () => saveState();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveState(); // 最后保存一次
    };
  }, [energy, productionRate, storageCap]);

  // 这个组件不渲染任何内容
  return null;
};
