"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function BackView() {
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

    // 获取容器尺寸
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
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

    // 容器大小调整
    function onContainerResize() {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    // 使用 ResizeObserver 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(onContainerResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    createStarField();
    animate();

    return () => {
      // 断开 ResizeObserver
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

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
    <div
      id="container"
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    >
      <style jsx>{`
        #container canvas {
          display: block;
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
}
