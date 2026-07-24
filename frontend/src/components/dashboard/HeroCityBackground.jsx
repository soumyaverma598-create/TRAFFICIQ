import { useEffect, useRef } from "react";

const PALETTE = {
  background: "#0A0D18",
  gridLine: "rgba(46, 55, 90, 0.35)",
  buildingFillRight: "#141a2c",
  buildingFillLeft: "#1c2340",
  buildingFillTop: "#212a4a",
  edgeCyan: "rgba(0, 242, 254, 0.55)",
  edgePurple: "rgba(138, 43, 226, 0.55)",
  windowCyan: "rgba(0, 242, 254, 0.55)",
  windowPurple: "rgba(138, 43, 226, 0.5)",
  trafficCyan: "#00f2fe",
  trafficTeal: "#2dd4bf",
  trafficViolet: "#8a2be2",
};

const GRID_COLS = 14;
const GRID_ROWS = 9;
const TILE_W = 84;
const TILE_H = 42;
const BUILDING_DENSITY = 0.32;
const PARTICLE_COUNT = 26;

function project(col, row, originX, originY) {
  return {
    x: originX + (col - row) * (TILE_W / 2),
    y: originY + (col + row) * (TILE_H / 2),
  };
}

function lerpPt(a, b, t) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function makeSeededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function CityBackground({ opacity = 0.55, className = "" }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      mouse: { x: 0, y: 0 },
      mouseTarget: { x: 0, y: 0 },
      vignette: null,
      buildings: [],
      particles: [],
      pulses: [],
    };

    const rand = makeSeededRandom(7331);

    // --- Generate buildings on a subset of grid cells ---
    const buildings = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (rand() < BUILDING_DENSITY) {
          buildings.push({
            col,
            row,
            targetHeight: 34 + rand() * 120,
            height: 0,
            isCyan: rand() > 0.5,
            phase: rand() * Math.PI * 2,
          });
        }
      }
    }
    state.buildings = buildings;

    // --- Generate traffic particles traveling along rows/columns ---
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const horizontal = rand() > 0.5;
      particles.push({
        horizontal,
        lane: Math.floor(rand() * (horizontal ? GRID_ROWS : GRID_COLS)),
        t: rand(),
        speed: 0.00006 + rand() * 0.00007,
        color: [PALETTE.trafficCyan, PALETTE.trafficTeal, PALETTE.trafficViolet][
          Math.floor(rand() * 3)
        ],
        lastNode: -1,
      });
    }
    state.particles = particles;

    function resize() {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = state.width * state.dpr;
      canvas.height = state.height * state.dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      const gradient = ctx.createRadialGradient(
        state.width / 2, state.height * 0.35, state.height * 0.1,
        state.width / 2, state.height * 0.35, state.height * 0.9
      );
      gradient.addColorStop(0, "rgba(10, 13, 24, 0)");
      gradient.addColorStop(1, "rgba(4, 5, 10, 0.85)");
      state.vignette = gradient;
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      state.mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      state.mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    function drawGrid(originX, originY) {
      ctx.strokeStyle = PALETTE.gridLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let row = 0; row <= GRID_ROWS; row++) {
        const start = project(0, row, originX, originY);
        const end = project(GRID_COLS, row, originX, originY);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      }
      for (let col = 0; col <= GRID_COLS; col++) {
        const start = project(col, 0, originX, originY);
        const end = project(col, GRID_ROWS, originX, originY);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      }
      ctx.stroke();
    }

    function drawWindowLights(face, faceEdgeColor, count, time, phase) {
      const [topA, topB, bottomA, bottomB] = face;
      const topMid = lerpPt(topA, topB, 0.5);
      const groundMid = lerpPt(bottomA, bottomB, 0.5);

      for (let i = 1; i < count; i++) {
        const u = i / count;
        const pt = lerpPt(topMid, groundMid, u);
        const flicker = 0.25 + 0.55 * Math.abs(Math.sin(time * 0.0012 + phase + i * 0.7));
        ctx.beginPath();
        ctx.fillStyle = faceEdgeColor.replace(/[\d.]+\)$/, `${flicker.toFixed(2)})`);
        ctx.rect(pt.x - 3, pt.y - 1.5, 6, 3);
        ctx.fill();
      }
    }

    function drawBuilding(b, originX, originY, time) {
      const { x: sx, y: sy } = project(b.col + 0.5, b.row + 0.5, originX, originY);
      const halfW = TILE_W / 2.6;
      const halfH = TILE_H / 2.6;
      const h = b.height;

      const top = { x: sx, y: sy - h - halfH };
      const right = { x: sx + halfW, y: sy - h };
      const bottom = { x: sx, y: sy - h + halfH };
      const left = { x: sx - halfW, y: sy - h };
      const groundRight = { x: sx + halfW, y: sy };
      const groundBottom = { x: sx, y: sy + halfH };
      const groundLeft = { x: sx - halfW, y: sy };

      const edgeColor = b.isCyan ? PALETTE.edgeCyan : PALETTE.edgePurple;
      const windowColor = b.isCyan ? PALETTE.windowCyan : PALETTE.windowPurple;

      ctx.beginPath();
      ctx.moveTo(right.x, right.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.lineTo(groundBottom.x, groundBottom.y);
      ctx.lineTo(groundRight.x, groundRight.y);
      ctx.closePath();
      ctx.fillStyle = PALETTE.buildingFillRight;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.lineTo(groundBottom.x, groundBottom.y);
      ctx.lineTo(groundLeft.x, groundLeft.y);
      ctx.closePath();
      ctx.fillStyle = PALETTE.buildingFillLeft;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(right.x, right.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.lineTo(left.x, left.y);
      ctx.closePath();
      ctx.fillStyle = PALETTE.buildingFillTop;
      ctx.fill();

      ctx.save();
      ctx.shadowColor = edgeColor;
      ctx.shadowBlur = 6;
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(right.x, right.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.lineTo(left.x, left.y);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      const windowRows = Math.max(2, Math.floor(h / 16));
      drawWindowLights([right, bottom, groundRight, groundBottom], windowColor, windowRows, time, b.phase);
      drawWindowLights([left, bottom, groundLeft, groundBottom], windowColor, windowRows, time, b.phase + 1.4);

      const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + b.phase);
      ctx.save();
      ctx.shadowColor = edgeColor;
      ctx.shadowBlur = 10 + pulse * 6;
      ctx.fillStyle = edgeColor;
      ctx.beginPath();
      ctx.arc(top.x, top.y, 2 + pulse * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function updateParticle(p, dt) {
      p.t += p.speed * dt;
      if (p.t >= 1) p.t -= 1;

      const span = p.horizontal ? GRID_COLS : GRID_ROWS;
      const node = Math.floor(p.t * span);
      if (node !== p.lastNode) {
        p.lastNode = node;
        const col = p.horizontal ? node : p.lane;
        const row = p.horizontal ? p.lane : node;
        state.pulses.push({ col, row, life: 1 });
      }
    }

    function drawParticle(p, originX, originY) {
      const span = p.horizontal ? GRID_COLS : GRID_ROWS;
      const pos = p.t * span;
      const trailPos = Math.max(0, pos - 0.4);

      const col1 = p.horizontal ? pos : p.lane;
      const row1 = p.horizontal ? p.lane : pos;
      const col2 = p.horizontal ? trailPos : p.lane;
      const row2 = p.horizontal ? p.lane : trailPos;

      const head = project(col1, row1, originX, originY);
      const tail = project(col2, row2, originX, originY);

      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, p.color);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(head.x, head.y);
      ctx.stroke();
      ctx.restore();
    }

    function drawPulse(pulse, originX, originY) {
      const { x, y } = project(pulse.col, pulse.row, originX, originY);
      const radius = 4 + (1 - pulse.life) * 14;
      ctx.save();
      ctx.globalAlpha = Math.max(pulse.life, 0);
      ctx.strokeStyle = "rgba(0, 242, 254, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    let lastTime = performance.now();

    function render(time) {
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.save();
      ctx.scale(state.dpr, state.dpr);
      ctx.fillStyle = PALETTE.background;
      ctx.fillRect(0, 0, state.width, state.height);

      state.mouse.x += (state.mouseTarget.x - state.mouse.x) * 0.04;
      state.mouse.y += (state.mouseTarget.y - state.mouse.y) * 0.04;

      const originX = state.width / 2 + state.mouse.x * 16;
      const originY = state.height * 0.32 + state.mouse.y * 10;

      drawGrid(originX, originY);

      const sortedBuildings = [...state.buildings].sort(
        (a, b) => (a.row + a.col) - (b.row + b.col)
      );
      for (const b of sortedBuildings) {
        b.height += (b.targetHeight - b.height) * 0.02;
        drawBuilding(b, originX, originY, time);
      }

      for (const p of state.particles) {
        updateParticle(p, dt);
        drawParticle(p, originX, originY);
      }

      state.pulses = state.pulses.filter((pulse) => pulse.life > 0);
      for (const pulse of state.pulses) {
        pulse.life -= dt * 0.0022;
        drawPulse(pulse, originX, originY);
      }

      if (state.vignette) {
        ctx.fillStyle = state.vignette;
        ctx.fillRect(0, 0, state.width, state.height);
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(render);
    }

    frameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ opacity, pointerEvents: "none" }}
    />
  );
}