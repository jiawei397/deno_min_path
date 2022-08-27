interface Point {
  x: number;
  y: number;
}

function getDist(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function sort(points: Point[]) {
  points.sort((a, b) => {
    if (a.x < b.x) return -1;
    if (a.x > b.x) return 1;
    if (a.y < b.y) return -1;
    return 0;
  });
}

function findMinPath(points: Point[]): {
  minPath: Point[];
  minDist: number;
  count: number;
  findIntactCount: number;
} {
  let minDist = Infinity;
  let minPath: Point[] = [];
  let count = 0;
  const paths: {
    dist: number;
    path: Point[];
  }[] = [];
  const len = points.length;
  let findIntactCount = 0;
  points.forEach((_, i) => {
    if (i === 0) {
      return;
    }
    count++;
    paths.push({
      dist: getDist(points[0], points[i]),
      path: [points[0], points[i]],
    });
  });

  while (paths.length) {
    count++;
    const current = paths.pop()!;
    const currentPath = current.path;
    const currentDist = current.dist;
    if (currentDist >= minDist) {
      continue;
    }
    if (currentPath.length === len) {
      if (currentDist < minDist) {
        minDist = currentDist;
        minPath = currentPath;
      }
      findIntactCount++;
      continue;
    }
    points.forEach((point) => {
      if (currentPath.includes(point)) {
        return;
      }
      const newPath = [...currentPath, point];
      const newDist = getDist(currentPath[currentPath.length - 1], point) +
        currentDist;
      if (newDist >= minDist) {
        return;
      }
      paths.push({
        dist: newDist,
        path: newPath,
      });
    });
  }
  return {
    minPath,
    minDist,
    count,
    findIntactCount,
  };
}

export function getAllDis(points: Point[]) {
  let dis = 0;
  points.reduce((pre, cur) => {
    dis += getDist(pre, cur);
    return cur;
  });
  return dis;
}

function getIndexes(lastPoints: Point[], originPoints: Point[]) {
  return lastPoints.map((point) =>
    originPoints.findIndex((point2) => point2 === point)
  );
}

function getPath(points: Point[]) {
  const startTime = Date.now();
  const clonedPoints = [...points];
  sort(clonedPoints);
  const { minDist, minPath, count, findIntactCount } = findMinPath(points);
  const indexes = getIndexes(minPath, points);
  return {
    dist: minDist,
    path: indexes,
    time: Date.now() - startTime,
    count,
    findIntactCount,
    finalPoints: minPath,
    originPoints: points,
  };
}

export default getPath;

if (import.meta.main) {
  // const points = [
  //   //   { "x": 0, "y": 1 },
  //   { "x": 0, "y": 0 },
  //   { "x": 2.8, "y": 6 },
  //   { "x": 1.3, "y": 5.1 },
  //   { "x": 1.3, "y": 4.5 },
  //   { "x": 2.1, "y": 3.3 },
  //   { "x": 1.3, "y": 2 },
  //   { "x": 1, "y": 1 },
  // ];
  const points = [
    { "x": 0, "y": 0 },
    { "x": 1, "y": 0 },
    { "x": 1, "y": 1 },
    { "x": 2, "y": 1 },
    { "x": 3, "y": 4 },
    { "x": 4, "y": 4 },
    { "x": 3, "y": 5 },
    { "x": 5, "y": 0 },
    { "x": 6, "y": 0 },
    { "x": 6, "y": 1 },
    { "x": 5, "y": 4 },
    { "x": 5, "y": 5 },
    { "x": 6, "y": 5 },
  ];
  console.time("run");
  getPath(points);
  console.timeEnd("run");
}
