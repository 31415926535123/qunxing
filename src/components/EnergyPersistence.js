"use client";

import { useEffect } from "react";
import { useEnergy } from "@/hooks/useEnergyManager";

// 纯持久化逻辑 - 只处理数据保存，不处理加载
export const EnergyPersistence = () => {
  const { energy, productionRate, storageCap } = useEnergy();

  useEffect(() => {
    // 保存状态到 localStorage
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
