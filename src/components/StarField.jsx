"use client";

import { useEffect, useRef } from "react";

const StarField = ({
  width = window.innerWidth,
  height = window.innerHeight,
  starCount = 400,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // 设置canvas尺寸
    canvas.width = width;
    canvas.height = height;

    // 初始化星星数据
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          color: getStarColor(),
        });
      }
    };

    // 获取星星颜色
    const getStarColor = () => {
      const colors = [
        "rgba(255, 255, 255, ",
        "rgba(255, 248, 220, ",
        "rgba(173, 216, 230, ",
        "rgba(255, 182, 193, ",
        "rgba(255, 255, 224, ",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // 绘制背景渐变
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000011");
      gradient.addColorStop(0.3, "#001122");
      gradient.addColorStop(0.7, "#002244");
      gradient.addColorStop(1, "#000033");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // 绘制星云效果
    const drawNebula = () => {
      // 创建几个半透明的星云区域
      const nebulaData = [
        {
          x: width * 0.2,
          y: height * 0.3,
          radius: 150,
          color: "rgba(138, 43, 226, 0.1)",
        },
        {
          x: width * 0.7,
          y: height * 0.6,
          radius: 120,
          color: "rgba(75, 0, 130, 0.08)",
        },
        {
          x: width * 0.5,
          y: height * 0.1,
          radius: 100,
          color: "rgba(72, 61, 139, 0.06)",
        },
      ];

      nebulaData.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // 绘制星星
    const drawStars = () => {
      starsRef.current.forEach((star) => {
        // 更新闪烁效果
        star.brightness += star.twinkleSpeed;
        if (star.brightness > 1 || star.brightness < 0.3) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // 绘制星星光晕
        const glowGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 3
        );
        glowGradient.addColorStop(0, star.color + star.brightness + ")");
        glowGradient.addColorStop(
          0.5,
          star.color + star.brightness * 0.3 + ")"
        );
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // 绘制星星核心
        ctx.fillStyle = star.color + star.brightness + ")";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // 为较大的星星添加十字光芒
        if (star.size > 1.5) {
          ctx.strokeStyle = star.color + star.brightness * 0.8 + ")";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      });
    };

    // 动画循环
    const animate = () => {
      // 清除画布
      ctx.clearRect(0, 0, width, height);

      // 绘制背景
      drawBackground();

      // 绘制星云
      drawNebula();

      // 绘制星星
      drawStars();

      // 继续动画
      animationRef.current = requestAnimationFrame(animate);
    };

    // 初始化并开始动画
    initStars();
    animate();

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, starCount]);

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-2xl border border-blue-900/30"
        style={{
          background:
            "radial-gradient(ellipse at center, #001122 0%, #000011 100%)",
        }}
      />
      {/* 添加一些装饰性的UI元素 */}
      <div className="absolute top-4 left-4 text-blue-300 text-sm font-mono">
        <div className="bg-black/50 px-2 py-1 rounded border border-blue-500/30">
          星空观测站
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-blue-400 text-xs font-mono">
        <div className="bg-black/50 px-2 py-1 rounded border border-blue-500/30">
          {starCount} 颗恒星
        </div>
      </div>
    </div>
  );
};

export default StarField;
