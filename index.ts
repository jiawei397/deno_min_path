interface Point {
  x: number;
  y: number;
}

function getDis(p1: Point, p2: Point) {
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
} {
  let minDist = Infinity;
  let minPath: Point[] = [];
  let count = 0;
  const paths: Point[][] = [];
  const len = points.length;
  points.forEach((_, i) => {
    if (i === 0) {
      return;
    }
    count++;
    paths.push([points[0], points[i]]);
  });

  while (paths.length) {
    count++;
    const currentPath = paths.pop()!;
    const currentDist = getAllDis(currentPath);
    if (currentDist >= minDist) {
      continue;
    }
    if (currentPath.length === len) {
      if (currentDist < minDist) {
        minDist = currentDist;
        minPath = currentPath;
      }
      continue;
    }
    points.forEach((point) => {
      if (currentPath.includes(point)) {
        return;
      }
      const newPath = [...currentPath, point];
      const currentDist = getAllDis(newPath);
      if (currentDist >= minDist) {
        return;
      }
      paths.push(newPath);
    });
  }
  return {
    minPath,
    minDist,
    count,
  };
}

function getAllDis(points: Point[]) {
  let dis = 0;
  points.reduce((pre, cur) => {
    dis += getDis(pre, cur);
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
  const { minDist, minPath, count } = findMinPath(points);
  const indexes = getIndexes(minPath, points);
  return {
    dist: minDist,
    path: indexes,
    time: Date.now() - startTime,
    count,
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
  getPath(points);
}
