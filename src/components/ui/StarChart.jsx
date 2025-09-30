// components/StarChart.js
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const StarChart = () => {
  const mountRef = useRef(null);
  const [isConstellationsVisible, setIsConstellationsVisible] = useState(true);
  const [isStarsVisible, setIsStarsVisible] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();

    // 初始化相机
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000011);
    mountRef.current.appendChild(renderer.domElement);

    // 主要恒星数据
    const majorStars = [
      { name: "北极星", ra: 2.530301, dec: 89.264109, magnitude: 2.02 },
      { name: "织女星", ra: 18.61565, dec: 38.78369, magnitude: 0.03 },
      { name: "牛郎星", ra: 19.84639, dec: 8.86833, magnitude: 0.76 },
      { name: "大角星", ra: 14.26104, dec: 19.18241, magnitude: -0.05 },
      { name: "参宿四", ra: 5.91953, dec: 7.40706, magnitude: 0.45 },
      { name: "参宿七", ra: 5.2423, dec: -8.20164, magnitude: 0.18 },
      { name: "天狼星", ra: 6.75248, dec: -16.71612, magnitude: -1.46 },
      { name: "南河三", ra: 7.65538, dec: 5.22499, magnitude: 0.34 },
      { name: "毕宿五", ra: 4.59868, dec: 16.5093, magnitude: 0.85 },
      { name: "北河三", ra: 7.75538, dec: 28.0262, magnitude: 1.14 },
    ];

    // 星座数据
    const constellations = [
      {
        name: "大熊座",
        lines: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 6],
          [6, 0],
        ],
        stars: [
          { ra: 10.897, dec: 56.382 },
          { ra: 11.03, dec: 56.864 },
          { ra: 11.767, dec: 49.313 },
          { ra: 12.257, dec: 57.033 },
          { ra: 13.792, dec: 49.313 },
          { ra: 14.073, dec: 54.925 },
          { ra: 13.398, dec: 54.925 },
        ],
      },
      {
        name: "猎户座",
        lines: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 0],
          [4, 5],
          [5, 6],
        ],
        stars: [
          { ra: 5.679, dec: -1.943 },
          { ra: 5.792, dec: -9.67 },
          { ra: 5.919, dec: -7.407 },
          { ra: 6.065, dec: -8.201 },
          { ra: 5.418, dec: -6.349 },
          { ra: 5.242, dec: -8.201 },
          { ra: 5.533, dec: -0.299 },
        ],
      },
    ];

    // 将赤经赤纬转换为笛卡尔坐标
    const equatorialToCartesian = (ra, dec, radius = 40) => {
      const raRad = ra * (Math.PI / 12);
      const decRad = dec * (Math.PI / 180);

      const x = radius * Math.cos(decRad) * Math.cos(raRad);
      const y = radius * Math.cos(decRad) * Math.sin(raRad);
      const z = radius * Math.sin(decRad);

      return new THREE.Vector3(x, y, z);
    };

    // 创建星空背景
    const createStarField = () => {
      const starCount = 2000;
      const starsGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        const radius = 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i + 2] = radius * Math.cos(phi);
      }

      starsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3)
      );

      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
      });

      return new THREE.Points(starsGeometry, starsMaterial);
    };

    // 创建恒星
    const createStars = () => {
      const group = new THREE.Group();

      majorStars.forEach((star) => {
        const position = equatorialToCartesian(star.ra, star.dec);

        const size = Math.max(0.5, 3 - star.magnitude) * 1.5;
        const brightness = Math.min(1, (3 - star.magnitude) / 3);

        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(brightness, brightness, 1.0),
          transparent: true,
          opacity: 0.8,
        });

        const starMesh = new THREE.Mesh(geometry, material);
        starMesh.position.copy(position);
        starMesh.userData = { name: star.name, magnitude: star.magnitude };
        group.add(starMesh);

        // 创建恒星标签
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 128;

        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = "24px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(star.name, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(10, 5, 1);
        sprite.position.copy(position);
        sprite.position.y += 5;
        sprite.visible = isStarsVisible;
        sprite.userData = { name: star.name };
        group.add(sprite);
      });

      return group;
    };

    // 创建星座
    const createConstellations = () => {
      const group = new THREE.Group();

      constellations.forEach((constellation) => {
        const points = [];

        constellation.stars.forEach((star) => {
          const position = equatorialToCartesian(star.ra, star.dec);
          points.push(position);
        });

        // 创建星座连线
        constellation.lines.forEach((line) => {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            points[line[0]],
            points[line[1]],
          ]);

          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4488ff,
            transparent: true,
            opacity: 0.7,
          });

          const constellationLine = new THREE.Line(lineGeometry, lineMaterial);
          constellationLine.userData = { name: constellation.name };
          group.add(constellationLine);
        });

        // 创建星座标签
        const center = new THREE.Vector3();
        points.forEach((point) => center.add(point));
        center.divideScalar(points.length);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = "20px Arial";
        context.fillStyle = "#4488ff";
        context.textAlign = "center";
        context.fillText(
          constellation.name,
          canvas.width / 2,
          canvas.height / 2
        );

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(10, 2.5, 1);
        sprite.position.copy(center);
        sprite.position.y += 3;
        sprite.userData = { name: constellation.name };
        group.add(sprite);
      });

      group.visible = isConstellationsVisible;
      return group;
    };

    // 添加到场景
    const starField = createStarField();
    const stars = createStars();
    const constellationsGroup = createConstellations();

    scene.add(starField);
    scene.add(stars);
    scene.add(constellationsGroup);

    // 鼠标控制
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseDown = (event) => {
      isMouseDown = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - previousMouseX;
      const deltaY = event.clientY - previousMouseY;

      stars.rotation.y += deltaX * 0.01;
      stars.rotation.x += deltaY * 0.01;
      constellationsGroup.rotation.y += deltaX * 0.01;
      constellationsGroup.rotation.x += deltaY * 0.01;
      starField.rotation.y += deltaX * 0.01;
      starField.rotation.x += deltaY * 0.01;

      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleWheel = (event) => {
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(20, Math.min(100, camera.position.z));
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 缓慢自转
      stars.rotation.y += 0.001;
      constellationsGroup.rotation.y += 0.001;
      starField.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 清理函数
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      renderer.dispose();
    };
  }, [isConstellationsVisible, isStarsVisible]);

  const toggleConstellations = () => {
    setIsConstellationsVisible(!isConstellationsVisible);
  };

  const toggleStars = () => {
    setIsStarsVisible(!isStarsVisible);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div ref={mountRef} className="w-full h-full" />

      {/* 控制面板 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-4 rounded-lg text-white">
        <div className="space-y-2">
          <button
            onClick={toggleConstellations}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            {isConstellationsVisible ? "隐藏星座" : "显示星座"}
          </button>
          <button
            onClick={toggleStars}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
          >
            {isStarsVisible ? "隐藏标签" : "显示标签"}
          </button>
        </div>
      </div>

      {/* 说明文字 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 p-3 rounded-lg text-white text-center">
        <p>鼠标拖动旋转 • 滚轮缩放</p>
      </div>
    </div>
  );
};

export default StarChart;
