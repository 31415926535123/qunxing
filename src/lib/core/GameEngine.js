// 建筑界面函数
function createBuildingView() {
  return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">行星视图</h2>
        
        <!-- 行星网格 -->
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            <!-- 建筑槽位 -->
            <div class="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <div class="text-gray-400 text-sm">空槽位</div>
            </div>
            <div class="building-slot bg-gray-700 border border-gray-600 rounded-lg p-4 text-center">
                <div class="text-sm font-medium">金属矿场</div>
                <div class="text-xs text-gray-400">Lv.3</div>
            </div>
            <div class="building-slot bg-gray-700 border border-gray-600 rounded-lg p-4 text-center">
                <div class="text-sm font-medium">晶体矿场</div>
                <div class="text-xs text-gray-400">Lv.2</div>
            </div>
            <div class="building-slot bg-gray-700 border border-gray-600 rounded-lg p-4 text-center">
                <div class="text-sm font-medium">聚变电厂</div>
                <div class="text-xs text-gray-400">Lv.1</div>
            </div>
            <div class="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <div class="text-gray-400 text-sm">空槽位</div>
            </div>
            <div class="building-slot bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <div class="text-gray-400 text-sm">空槽位</div>
            </div>
        </div>
        
        <!-- 建造列表 -->
        <h3 class="text-lg font-semibold mb-3 text-gray-300">可建造建筑</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div class="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
                <div class="flex-1">
                    <div class="font-medium">研究实验室</div>
                    <div class="text-xs text-gray-400">生产科研点数</div>
                    <div class="text-xs text-yellow-400 mt-1">金属: 500 | 晶体: 200</div>
                </div>
            </div>
            
            <div class="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
                <div class="flex-1">
                    <div class="font-medium">合金冶炼厂</div>
                    <div class="text-xs text-gray-400">生产合金</div>
                    <div class="text-xs text-yellow-400 mt-1">金属: 800 | 能量: 300</div>
                </div>
            </div>
            
            <div class="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
                <div class="flex-1">
                    <div class="font-medium">仓储仓库</div>
                    <div class="text-xs text-gray-400">提升资源容量</div>
                    <div class="text-xs text-yellow-400 mt-1">金属: 300 | 晶体: 150</div>
                </div>
            </div>
        </div>
    `;
}

// 科技界面函数
function createTechView() {
  return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">科技树</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 物理学分支 -->
            <div class="bg-gray-800 rounded-lg p-4">
                <h3 class="font-semibold text-blue-300 mb-3">物理学</h3>
                <div class="space-y-2">
                    <div class="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
                        <div class="font-medium">基础行星学</div>
                        <div class="text-xs text-gray-200">已研究</div>
                    </div>
                    <div class="tech-node bg-blue-600 border border-blue-500 rounded p-2 text-sm">
                        <div class="font-medium">磁约束聚变</div>
                        <div class="text-xs text-gray-200">研究中...</div>
                    </div>
                    <div class="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                        <div class="font-medium">量子计算</div>
                        <div class="text-xs text-gray-400">未解锁</div>
                    </div>
                </div>
            </div>
            
            <!-- 工程学分支 -->
            <div class="bg-gray-800 rounded-lg p-4">
                <h3 class="font-semibold text-blue-300 mb-3">工程学</h3>
                <div class="space-y-2">
                    <div class="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
                        <div class="font-medium">储能技术</div>
                        <div class="text-xs text-gray-200">已研究</div>
                    </div>
                    <div class="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                        <div class="font-medium">高级冶金学</div>
                        <div class="text-xs text-gray-400">未解锁</div>
                    </div>
                    <div class="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
                        <div class="font-medium">轨道结构</div>
                        <div class="text-xs text-gray-400">未解锁</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 舰队界面函数
function createFleetView() {
  return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">舰队管理</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 现有舰队 -->
            <div class="bg-gray-800 rounded-lg p-4">
                <h3 class="font-semibold text-blue-300 mb-3">现有舰队</h3>
                <div class="space-y-2">
                    <div class="fleet-item bg-gray-700 border border-gray-600 rounded p-2">
                        <div class="font-medium text-sm">侦查舰 x 3</div>
                        <div class="text-xs text-gray-400">状态: 待命</div>
                    </div>
                    <div class="fleet-item bg-gray-700 border border-gray-600 rounded p-2">
                        <div class="font-medium text-sm">殖民舰 x 1</div>
                        <div class="text-xs text-gray-400">状态: 建造中</div>
                    </div>
                </div>
            </div>
            
            <!-- 可建造舰船 -->
            <div class="bg-gray-800 rounded-lg p-4">
                <h3 class="font-semibold text-blue-300 mb-3">可建造舰船</h3>
                <div class="space-y-2">
                    <div class="ship-item bg-gray-700 border border-gray-600 rounded p-2 hover:bg-gray-600 cursor-pointer">
                        <div class="font-medium text-sm">侦查舰</div>
                        <div class="text-xs text-yellow-400">金属: 200 | 晶体: 100</div>
                    </div>
                    <div class="ship-item bg-gray-700 border border-gray-600 rounded p-2 hover:bg-gray-600 cursor-pointer">
                        <div class="font-medium text-sm">殖民舰</div>
                        <div class="text-xs text-yellow-400">金属: 1000 | 晶体: 500</div>
                    </div>
                    <div class="ship-item bg-gray-700 border border-gray-600 rounded p-2 opacity-50">
                        <div class="font-medium text-sm">护卫舰</div>
                        <div class="text-xs text-gray-400">需要: 脉冲武器科技</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 探索界面函数
function createExplorationView() {
  return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">星系探索</h2>
        <div class="bg-gray-800 rounded-lg p-4 mb-4">
            <div class="grid grid-cols-3 gap-4">
                <!-- 太阳系 -->
                <div class="star-system bg-blue-600 border border-blue-500 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-700">
                    <div class="text-lg">☀️</div>
                    <div class="text-sm font-medium">太阳系</div>
                    <div class="text-xs text-gray-200">已探索</div>
                </div>
                
                <!-- 比邻星 -->
                <div class="star-system bg-orange-600 border border-orange-500 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-700">
                    <div class="text-lg">⭐</div>
                    <div class="text-sm font-medium">比邻星</div>
                    <div class="text-xs text-gray-200">探索中...</div>
                </div>
                
                <!-- 未知星系 -->
                <div class="star-system bg-gray-700 border border-gray-600 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-600">
                    <div class="text-lg">❓</div>
                    <div class="text-sm font-medium">未知星系</div>
                    <div class="text-xs text-gray-400">未探索</div>
                </div>
            </div>
        </div>
        
        <!-- 探索详情 -->
        <div class="bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-blue-300 mb-3">探索任务</h3>
            <div class="space-y-2">
                <div class="mission-item bg-gray-700 border border-gray-600 rounded p-2">
                    <div class="font-medium text-sm">比邻星探索</div>
                    <div class="text-xs text-gray-400">预计完成: 2小时</div>
                    <div class="w-full bg-gray-600 rounded-full h-2 mt-1">
                        <div class="bg-orange-500 h-2 rounded-full" style="width: 30%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 事件界面函数
function createEventView() {
  return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">事件日志</h2>
        <div class="space-y-3">
            <!-- 近期事件 -->
            <div class="event-item bg-gray-800 border-l-4 border-green-500 rounded-r p-3">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="font-medium text-green-400">太阳耀斑爆发</div>
                        <div class="text-sm text-gray-300">能量产量暂时提升50%，持续1小时</div>
                    </div>
                    <div class="text-xs text-gray-400">2分钟前</div>
                </div>
            </div>
            
            <div class="event-item bg-gray-800 border-l-4 border-blue-500 rounded-r p-3">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="font-medium text-blue-400">研究突破</div>
                        <div class="text-sm text-gray-300">磁约束聚变研究进度加快</div>
                    </div>
                    <div class="text-xs text-gray-400">15分钟前</div>
                </div>
            </div>
            
            <div class="event-item bg-gray-800 border-l-4 border-yellow-500 rounded-r p-3">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="font-medium text-yellow-400">资源短缺警告</div>
                        <div class="text-sm text-gray-300">晶体储量低于安全水平</div>
                    </div>
                    <div class="text-xs text-gray-400">1小时前</div>
                </div>
            </div>
        </div>
    `;
}

// 初始化游戏
document.addEventListener("DOMContentLoaded", function () {
  // 初始化资源显示

  // 添加导航按钮事件监听
  setupNavigation();

  // 默认显示建筑界面

  // 启动游戏循环
});

// 设置导航按钮事件监听
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 移除所有按钮的激活状态
      navButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-blue-600");
        btn.classList.add("bg-gray-700");
      });

      // 设置当前按钮为激活状态
      this.classList.add("active", "bg-blue-600");
      this.classList.remove("bg-gray-700");

      const viewType = this.getAttribute("data-view");
      switch (viewType) {
        case "building":
          showBuildingView();
          break;
        case "tech":
          showTechView();
          break;
        case "fleet":
          showFleetView();
          break;
        case "exploration":
          showExplorationView();
          break;
        case "event":
          showEventView();
          break;
        case "asteroid":
          showAsteroidView();
          break;
      }
    });
  });
  const navAsteroid = document.getElementById("nav-asteroid");
  navAsteroid.click();
}

// 显示建筑界面
function showBuildingView() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createBuildingView();
}

// 显示科技界面
function showTechView() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createTechView();
}

// 显示舰队界面
function showFleetView() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createFleetView();
}

// 显示探索界面
function showExplorationView() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createExplorationView();
}

// 显示事件界面
function showEventView() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createEventView();
}
// 显示陨石界面
function showAsteroidView() {
  // 陨石界面函数
  function createAsteroidView() {
    return `
        <h2 class="text-xl font-bold mb-4 text-blue-400">陨石场</h2>
        <div class="bg-gray-800 rounded-lg p-4">
            <canvas id="asteroidCanvas" class="w-full border border-gray-600 rounded" width="800" height="600"></canvas>
            <div class="mt-4 text-sm text-gray-400">
                <p>观察小行星带中的陨石运动，点击陨石可以获得资源奖励</p>
                <p class="mt-2">陨石数量: <span id="asteroidCount">0</span> | 已收集: <span id="collectedCount">0</span></p>
            </div>
        </div>
    `;
  }
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = createAsteroidView();

  // 等待DOM更新后初始化Canvas
  setTimeout(() => {
    initAsteroidCanvas();
  }, 100);
  // 初始化陨石Canvas
  function initAsteroidCanvas() {
    const canvas = document.getElementById("asteroidCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const asteroids = [];
    let collectedCount = 0;
    let animationId;

    // 创建陨石
    function createAsteroids() {
      asteroids.length = 0;
      for (let i = 0; i < 15; i++) {
        asteroids.push(new Asteroid(canvas));
      }
      updateAsteroidCount();
    }

    // 更新陨石数量显示
    function updateAsteroidCount() {
      const activeAsteroids = asteroids.filter((a) => !a.collected).length;
      document.getElementById("asteroidCount").textContent = activeAsteroids;
      document.getElementById("collectedCount").textContent = collectedCount;
    }

    // 绘制星空背景
    function drawBackground() {
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      asteroids.forEach((asteroid) => {
        asteroid.update();
        asteroid.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    }

    // 鼠标点击事件
    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

      asteroids.forEach((asteroid) => {
        if (!asteroid.collected && asteroid.isClicked(mouseX, mouseY)) {
          asteroid.collected = true;
          collectedCount++;
          updateAsteroidCount();

          // 创建收集特效
          createCollectEffect(mouseX, mouseY);

          // 如果所有陨石都被收集，重新生成
          if (asteroids.every((a) => a.collected)) {
            setTimeout(() => {
              createAsteroids();
            }, 2000);
          }
        }
      });
    });

    // 收集特效
    function createCollectEffect(x, y) {
      const particles = [];
      for (let i = 0; i < 10; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30,
          maxLife: 30,
        });
      }

      function animateParticles() {
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;

          if (particle.life <= 0) {
            particles.splice(index, 1);
            return;
          }

          const alpha = particle.life / particle.maxLife;
          ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        if (particles.length > 0) {
          requestAnimationFrame(animateParticles);
        }
      }

      animateParticles();
    }

    // 响应式Canvas大小调整
    function resizeCanvas() {
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth - 32; // 减去padding
      const aspectRatio = 4 / 3;

      canvas.style.width = containerWidth + "px";
      canvas.style.height = containerWidth / aspectRatio + "px";
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 初始化并开始动画
    createAsteroids();
    animate();

    // 清理函数
    window.currentAsteroidAnimation = function () {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }
  class Asteroid {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 20 + 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      this.color = `hsl(0, 0%, ${Math.random() * 30 + 40}%)`;
      this.vertices = this.generateVertices();
      this.collected = false;
    }

    generateVertices() {
      const vertices = [];
      const numVertices = Math.floor(Math.random() * 6) + 6;
      for (let i = 0; i < numVertices; i++) {
        const angle = (i / numVertices) * Math.PI * 2;
        const variance = Math.random() * 0.4 + 0.8;
        vertices.push({
          x: Math.cos(angle) * this.radius * variance,
          y: Math.sin(angle) * this.radius * variance,
        });
      }
      return vertices;
    }

    update() {
      if (this.collected) return;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      // 边界检测
      if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
      if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
      if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
      if (this.collected) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // 绘制陨石主体
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
      for (let i = 1; i < this.vertices.length; i++) {
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    isClicked(mouseX, mouseY) {
      const distance = Math.sqrt(
        (mouseX - this.x) ** 2 + (mouseY - this.y) ** 2
      );
      return distance <= this.radius;
    }
  }
}

// 陨石类
/*class Asteroid {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 20 + 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.color = `hsl(0, 0%, ${Math.random() * 30 + 40}%)`;
        this.vertices = this.generateVertices();
        this.collected = false;
    }
    
    generateVertices() {
        const vertices = [];
        const numVertices = Math.floor(Math.random() * 6) + 6;
        for (let i = 0; i < numVertices; i++) {
            const angle = (i / numVertices) * Math.PI * 2;
            const variance = Math.random() * 0.4 + 0.8;
            vertices.push({
                x: Math.cos(angle) * this.radius * variance,
                y: Math.sin(angle) * this.radius * variance
            });
        }
        return vertices;
    }
    
    update() {
        if (this.collected) return;
        
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        
        // 边界检测
        if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
        if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
        if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // 绘制陨石主体
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
    isClicked(mouseX, mouseY) {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        return distance <= this.radius;
    }
}*/

// 初始化陨石Canvas
/*function initAsteroidCanvas() {
    const canvas = document.getElementById('asteroidCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const asteroids = [];
    let collectedCount = 0;
    let animationId;
    
    // 创建陨石
    function createAsteroids() {
        asteroids.length = 0;
        for (let i = 0; i < 15; i++) {
            asteroids.push(new Asteroid(canvas));
        }
        updateAsteroidCount();
    }
    
    // 更新陨石数量显示
    function updateAsteroidCount() {
        const activeAsteroids = asteroids.filter(a => !a.collected).length;
        document.getElementById('asteroidCount').textContent = activeAsteroids;
        document.getElementById('collectedCount').textContent = collectedCount;
    }
    
    // 绘制星空背景
    function drawBackground() {
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        
        asteroids.forEach(asteroid => {
            asteroid.update();
            asteroid.draw(ctx);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 鼠标点击事件
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);
        
        asteroids.forEach(asteroid => {
            if (!asteroid.collected && asteroid.isClicked(mouseX, mouseY)) {
                asteroid.collected = true;
                collectedCount++;
                updateAsteroidCount();
                
                // 创建收集特效
                createCollectEffect(mouseX, mouseY);
                
                // 如果所有陨石都被收集，重新生成
                if (asteroids.every(a => a.collected)) {
                    setTimeout(() => {
                        createAsteroids();
                    }, 2000);
                }
            }
        });
    });
    
    // 收集特效
    function createCollectEffect(x, y) {
        const particles = [];
        for (let i = 0; i < 10; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                maxLife: 30
            });
        }
        
        function animateParticles() {
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;
                
                if (particle.life <= 0) {
                    particles.splice(index, 1);
                    return;
                }
                
                const alpha = particle.life / particle.maxLife;
                ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            
            if (particles.length > 0) {
                requestAnimationFrame(animateParticles);
            }
        }
        
        animateParticles();
    }
    
    // 响应式Canvas大小调整
    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth - 32; // 减去padding
        const aspectRatio = 4/3;
        
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = (containerWidth / aspectRatio) + 'px';
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // 初始化并开始动画
    createAsteroids();
    animate();
    
    // 清理函数
    window.currentAsteroidAnimation = function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resizeCanvas);
    };
}*/
