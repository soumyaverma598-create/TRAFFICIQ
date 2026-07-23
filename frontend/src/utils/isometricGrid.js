// Shared isometric-projection math used by every animated grid/flow
// background across the Dashboard (Hero's rich scene and the lighter
// section backdrops), so no component reimplements the same trig —
// only the geometry (origin, density, waypoints) differs per section.

export function makeProjector(origin, tileW = 92, tileH = 46) {
  return (i, j) => ({
    x: origin.x + (i - j) * (tileW / 2),
    y: origin.y + (i + j) * (tileH / 2),
  });
}

export function pointStr(p) {
  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
}

export function pathFromWaypoints(project, waypoints) {
  return "M " + waypoints.map(({ i, j }) => pointStr(project(i, j))).join(" L ");
}

export function buildGridLines(project, range) {
  const lines = [];

  for (let i = -range; i <= range; i++) {
    lines.push({
      key: `i-${i}`,
      ...project(i, -range),
      x2: project(i, range).x,
      y2: project(i, range).y,
    });
  }

  for (let j = -range; j <= range; j++) {
    lines.push({
      key: `j-${j}`,
      ...project(-range, j),
      x2: project(range, j).x,
      y2: project(range, j).y,
    });
  }

  return lines;
}