"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ResourceBar from "@/components/ui/ResourceBar";
import { ResourceManager } from "@/hooks/useResourceManager";

export default function Home() {
  const [currentView, setCurrentView] = useState("");
  // 界面切换函数
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  // 创建3D星空场景组件
  const BackView = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
      // 如果已经存在场景，先清理
      if (sceneRef.current || rendererRef.current) {
        return;
      }

      let scene, camera, controls, renderer;

      // 初始化场景
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000011);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 存储引用
      sceneRef.current = scene;
      rendererRef.current = renderer;

      if (containerRef.current) {
        // 清除容器内可能存在的旧canvas
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);
      }

      // 轨道控制器
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // 创建星空背景
      function createStarField() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.7,
          transparent: true,
        });
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
          const x = (Math.random() - 0.5) * 2000;
          const y = (Math.random() - 0.5) * 2000;
          const z = (Math.random() - 0.5) * 2000;
          starVertices.push(x, y, z);
        }
        starGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(starVertices, 3)
        );
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
      }

      // 添加光照
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);
      const pointLight = new THREE.PointLight(0xff6600, 0.8, 100);
      pointLight.position.set(-10, 10, -10);
      scene.add(pointLight);

      // 设置相机位置
      camera.position.set(0, 0, 15);
      camera.lookAt(0, 0, 0);

      // 动画循环
      function animate() {
        animationIdRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      // 窗口大小调整
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("resize", onWindowResize);
      createStarField();
      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);

        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }

        if (rendererRef.current) {
          rendererRef.current.dispose();
          if (rendererRef.current.domElement && containerRef.current) {
            containerRef.current.removeChild(rendererRef.current.domElement);
          }
          rendererRef.current = null;
        }

        if (sceneRef.current) {
          // 清理场景中的对象
          while (sceneRef.current.children.length > 0) {
            sceneRef.current.remove(sceneRef.current.children[0]);
          }
          sceneRef.current = null;
        }

        if (controls) {
          controls.dispose();
        }
      };
    }, []);

    return (
      <div id="container" ref={containerRef}>
        <div id="info">
          <h3>3D星空场景</h3>
          <p>使用鼠标拖拽旋转视角</p>
          <p>滚轮缩放</p>
        </div>
        <style jsx>{`
          #info {
            position: absolute;
            top: 10px;
            left: 10px;
            color: white;
            z-index: 100;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
          }
          #container canvas {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #000;
            font-family: Arial, sans-serif;
          }
        `}</style>
      </div>
    );
  };

  // 创建建筑界面
  const createBuildingView = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">行星视图</h2>

        {/* 行星网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {/* 建筑槽位 */}
          <div className="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-3 text-center hover:border-gray-500 transition-colors cursor-pointer">
            <div className="text-gray-400 text-sm">空槽位</div>
          </div>
          <div className="building-slot bg-gray-700 border border-gray-600 rounded-lg p-3 text-center">
            <div className="text-sm font-medium">金属矿场</div>
            <div className="text-xs text-gray-400">Lv.3</div>
          </div>
          <div className="building-slot bg-gray-700 border border-gray-600 rounded-lg p-3 text-center">
            <div className="text-sm font-medium">晶体矿场</div>
            <div className="text-xs text-gray-400">Lv.2</div>
          </div>
          <div className="building-slot bg-gray-700 border border-gray-600 rounded-lg p-3 text-center">
            <div className="text-sm font-medium">聚变电厂</div>
            <div className="text-xs text-gray-400">Lv.1</div>
          </div>
          <div className="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-3 text-center hover:border-gray-500 transition-colors cursor-pointer">
            <div className="text-gray-400 text-sm">空槽位</div>
          </div>
          <div className="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-3 text-center hover:border-gray-500 transition-colors cursor-pointer">
            <div className="text-gray-400 text-sm">空槽位</div>
          </div>
        </div>

        {/* 建造列表 */}
        <h3 className="text-lg font-semibold mb-3 text-gray-300">可建造建筑</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="flex-1">
              <div className="font-medium">研究实验室</div>
              <div className="text-xs text-gray-400">生产科研点数</div>
              <div className="text-xs text-yellow-400 mt-1">
                金属: 500 | 晶体: 200
              </div>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="flex-1">
              <div className="font-medium">合金冶炼厂</div>
              <div className="text-xs text-gray-400">生产合金</div>
              <div className="text-xs text-yellow-400 mt-1">
                金属: 800 | 能量: 300
              </div>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="flex-1">
              <div className="font-medium">仓储仓库</div>
              <div className="text-xs text-gray-400">提升资源容量</div>
              <div className="text-xs text-yellow-400 mt-1">
                金属: 300 | 晶体: 150
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 创建科技界面
  const createTechView = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">科技树</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 物理学分支 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-3">物理学</h3>
            <div className="space-y-2">
              <div className="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
                <div className="font-medium">基础行星学</div>
                <div className="text-xs text-gray-200">已研究</div>
              </div>
              <div className="tech-node bg-blue-600 border border-blue-500 rounded p-2 text-sm">
                <div className="font-medium">磁约束聚变</div>
                <div className="text-xs text-gray-200">研究中...</div>
              </div>
              <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                <div className="font-medium">量子计算</div>
                <div className="text-xs text-gray-400">未解锁</div>
              </div>
            </div>
          </div>

          {/* 工程学分支 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-3">工程学</h3>
            <div className="space-y-2">
              <div className="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
                <div className="font-medium">储能技术</div>
                <div className="text-xs text-gray-200">已研究</div>
              </div>
              <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                <div className="font-medium">高级冶金学</div>
                <div className="text-xs text-gray-400">未解锁</div>
              </div>
              <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                <div className="font-medium">轨道结构</div>
                <div className="text-xs text-gray-400">未解锁</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 创建舰队界面
  const createFleetView = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">舰队管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 现有舰队 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-3">现有舰队</h3>
            <div className="space-y-2">
              <div className="fleet-item bg-gray-700 border border-gray-600 rounded p-2">
                <div className="font-medium text-sm">侦查舰 x 3</div>
                <div className="text-xs text-gray-400">状态: 待命</div>
              </div>
              <div className="fleet-item bg-gray-700 border border-gray-600 rounded p-2">
                <div className="font-medium text-sm">殖民舰 x 1</div>
                <div className="text-xs text-gray-400">状态: 建造中</div>
              </div>
            </div>
          </div>

          {/* 可建造舰船 */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-3">可建造舰船</h3>
            <div className="space-y-2">
              <div className="ship-item bg-gray-700 border border-gray-600 rounded p-2 hover:bg-gray-600 cursor-pointer">
                <div className="font-medium text-sm">侦查舰</div>
                <div className="text-xs text-yellow-400">
                  金属: 200 | 晶体: 100
                </div>
              </div>
              <div className="ship-item bg-gray-700 border border-gray-600 rounded p-2 hover:bg-gray-600 cursor-pointer">
                <div className="font-medium text-sm">殖民舰</div>
                <div className="text-xs text-yellow-400">
                  金属: 1000 | 晶体: 500
                </div>
              </div>
              <div className="ship-item bg-gray-700 border border-gray-600 rounded p-2 opacity-50">
                <div className="font-medium text-sm">护卫舰</div>
                <div className="text-xs text-gray-400">需要: 脉冲武器科技</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 创建探索界面
  const createExplorationView = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">星系探索</h2>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* 太阳系 */}
            <div className="star-system bg-blue-600 border border-blue-500 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-700">
              <div className="text-lg">☀️</div>
              <div className="text-sm font-medium">太阳系</div>
              <div className="text-xs text-gray-200">已探索</div>
            </div>

            {/* 比邻星 */}
            <div className="star-system bg-orange-600 border border-orange-500 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-700">
              <div className="text-lg">⭐</div>
              <div className="text-sm font-medium">比邻星</div>
              <div className="text-xs text-gray-200">探索中...</div>
            </div>

            {/* 未知星系 */}
            <div className="star-system bg-gray-700 border border-gray-600 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-600">
              <div className="text-lg">❓</div>
              <div className="text-sm font-medium">未知星系</div>
              <div className="text-xs text-gray-400">未探索</div>
            </div>
          </div>
        </div>

        {/* 探索详情 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-3">探索任务</h3>
          <div className="space-y-2">
            <div className="mission-item bg-gray-700 border border-gray-600 rounded p-2">
              <div className="font-medium text-sm">比邻星探索</div>
              <div className="text-xs text-gray-400">预计完成: 2小时</div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 创建事件界面
  const createEventView = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">事件日志</h2>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm font-medium text-green-400">
              太阳耀斑爆发
            </div>
            <div className="text-xs text-gray-300">
              接下来1小时内能量产量+50%
            </div>
            <div className="text-xs text-gray-400 mt-1">刚刚发生</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm font-medium text-yellow-400">
              发现外星商队
            </div>
            <div className="text-xs text-gray-300">提供贸易机会</div>
            <div className="text-xs text-gray-400 mt-1">1小时前</div>
          </div>
        </div>
      </div>
    );
  };

  // 根据当前视图渲染内容
  const renderMainContent = () => {
    switch (currentView) {
      case "back":
        return <BackView />;
      case "building":
        return createBuildingView();
      case "tech":
        return createTechView();
      case "fleet":
        return createFleetView();
      case "exploration":
        return createExplorationView();
      case "event":
        return createEventView();
      default:
        return;
    }
  };

  return (
    <ResourceManager>
      {({ resources, productionRates }) => (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          {/* 顶部资源栏 */}
          <ResourceBar
            resources={resources}
            productionRates={productionRates}
          />

          {/* 主要内容区域 */}
          <div className="flex flex-1 min-h-0">
            {/* 侧边栏导航 */}
            <div className="w-16 md:w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-4">
              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "back"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("back")}
              >
                <span className="text-xs mt-1">星空</span>
              </button>

              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "building"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("building")}
              >
                <span className="text-xs mt-1">建筑</span>
              </button>

              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "tech"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("tech")}
              >
                <span className="text-xs mt-1">科技</span>
              </button>

              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "fleet"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("fleet")}
              >
                <span className="text-xs mt-1">舰队</span>
              </button>

              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "exploration"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("exploration")}
              >
                <span className="text-xs mt-1">探索</span>
              </button>

              <button
                className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
                  currentView === "event"
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleViewChange("event")}
              >
                <span className="text-xs mt-1">事件</span>
              </button>
            </div>

            {/* 主工作区 */}
            <div className="flex-1 bg-gray-850 p-4 overflow-auto min-w-0">
              {renderMainContent()}
            </div>
          </div>

          {/* 底部状态栏 */}
          <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-4">
                <span>宇宙历 025年</span>
                <span className="text-blue-400">
                  正在研究: 超空间理论 (剩余: 45min)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400">警报: 无</span>
                <span>在线</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ResourceManager>
  );
}
