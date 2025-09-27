"use client";

import { useState, useEffect, useCallback } from "react";

// 创建资源管理器组件，专门处理资源更新逻辑
export const ResourceManager = ({ children }) => {
  const [resources, setResources] = useState({
    energy: 0,
    metal: 0,
    crystal: 0,
    darkMatter: 0,
  });

  const [productionRates, setProductionRates] = useState({
    energy: 20,
    metal: 0,
    crystal: 0,
    darkMatter: 0,
  });

  // 更新资源生产速率
  const updateProductionRate = useCallback((resource, rate) => {
    setProductionRates((prev) => ({
      ...prev,
      [resource]: rate,
    }));
  }, []);

  // 更新多种资源生产速率
  const updateProductionRates = useCallback((newRates) => {
    setProductionRates((prev) => ({
      ...prev,
      ...newRates,
    }));
  }, []);

  // 消耗资源
  const consumeResource = useCallback((resource, amount) => {
    setResources((prev) => ({
      ...prev,
      [resource]: Math.max(0, prev[resource] - amount),
    }));
  }, []);

  // 增加资源
  const addResource = useCallback((resource, amount) => {
    setResources((prev) => ({
      ...prev,
      [resource]: prev[resource] + amount,
    }));
  }, []);

  // 资源自动更新逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prev) => {
        const newResources = { ...prev };
        Object.keys(productionRates).forEach((resource) => {
          if (productionRates[resource] !== 0) {
            newResources[resource] =
              prev[resource] + productionRates[resource] / 60;
          }
        });
        return newResources;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [productionRates]);

  return children({
    resources,
    productionRates,
    updateProductionRate,
    updateProductionRates,
    consumeResource,
    addResource,
  });
};

// 创建自定义 Hook 来管理资源状态
export const useResourceManager = (
  initialProductionRates = {
    energy: 20,
    metal: 0,
    crystal: 0,
    darkMatter: 0,
  }
) => {
  const [resources, setResources] = useState({
    energy: 0,
    metal: 0,
    crystal: 0,
    darkMatter: 0,
  });

  const [productionRates, setProductionRates] = useState(
    initialProductionRates
  );

  // 更新资源生产速率
  const updateProductionRate = useCallback((resource, rate) => {
    setProductionRates((prev) => ({
      ...prev,
      [resource]: rate,
    }));
  }, []);

  // 更新多种资源生产速率
  const updateProductionRates = useCallback((newRates) => {
    setProductionRates((prev) => ({
      ...prev,
      ...newRates,
    }));
  }, []);

  // 消耗资源
  const consumeResource = useCallback((resource, amount) => {
    setResources((prev) => ({
      ...prev,
      [resource]: Math.max(0, prev[resource] - amount),
    }));
  }, []);

  // 增加资源
  const addResource = useCallback((resource, amount) => {
    setResources((prev) => ({
      ...prev,
      [resource]: prev[resource] + amount,
    }));
  }, []);

  // 资源自动更新逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prev) => {
        const newResources = { ...prev };
        Object.keys(productionRates).forEach((resource) => {
          if (productionRates[resource] !== 0) {
            newResources[resource] =
              prev[resource] + productionRates[resource] / 60;
          }
        });
        return newResources;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [productionRates]);

  return {
    resources,
    productionRates,
    updateProductionRate,
    updateProductionRates,
    consumeResource,
    addResource,
  };
};
