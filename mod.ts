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
} {
  let minDist = Infinity;
  let minPath: Point[] = [];

  function getAllPath() {
    const lastPaths: Point[][] = [];
    const paths: Point[][] = [];
    const len = points.length;
    points.forEach((_, i) => {
      if (i === 0) {
        return;
      }
      paths.push([points[0], points[i]]);
    });

    while (paths.length) {
      const first = paths.shift()!;
      if (first.length === len) {
        lastPaths.push(first);
        continue;
      }
      points.forEach((point) => {
        if (first.includes(point)) {
          return;
        }
        paths.push([...first, point]);
      });
    }
    return lastPaths;
  }

  console.time("getAllPath");
  const paths = getAllPath();
  console.timeEnd("getAllPath");

  paths.forEach((path) => {
    const dist = getAllDis(path);
    if (dist < minDist) {
      minDist = dist;
      minPath = path;
    }
  });

  return {
    minPath,
    minDist,
  };
}

export function getAllDis(points: Point[]) {
  let dis = 0;
  points.reduce((pre, cur) => {
    dis += getDis(pre, cur);
    return cur;
  });
  return dis;
}

function getIndexes(lastPoints: Point[], originPoints: Point[]) {
  return lastPoints.map((point) => {
    return originPoints.findIndex((point2) =>
      point2.x >= point.x && point2.y == point.y
    );
  });
}

function getPath(points: Point[]) {
  console.time("getPath");
  const originPoints = [...points];
  sort(points);
  const { minDist, minPath } = findMinPath(points);
  const indexes = getIndexes(minPath, originPoints);
  console.timeEnd("getPath");
  return {
    dist: minDist,
    path: indexes,
    finalPoints: minPath,
    originPoints,
  };
}

const points = [
  //   { "x": 0, "y": 1 },
  { "x": 0, "y": 0 },
  { "x": 2.8, "y": 6 },
  { "x": 1.3, "y": 5.1 },
  { "x": 1.3, "y": 4.5 },
  { "x": 2.1, "y": 3.3 },
  { "x": 1.3, "y": 2 },
  { "x": 1, "y": 1 },
];
// const points = [
//   { "x": 0, "y": 0 },
//   { "x": 1, "y": 0 },
//   { "x": 1, "y": 1 },
//   { "x": 2, "y": 1 },
//   { "x": 3, "y": 4 },
//   { "x": 4, "y": 4 },
//   { "x": 3, "y": 5 },
//   { "x": 5, "y": 0 },
//   { "x": 6, "y": 0 },
//   { "x": 6, "y": 1 },
//   { "x": 5, "y": 4 },
//   { "x": 5, "y": 5 },
//   { "x": 6, "y": 5 },
// ];
// const indexes = [0, 6, 5, 4, 3, 1, 2];
// console.log(indexes.map((index) => points[index]));

// console.log(points);

export default function main() {
  //   console.log(getPath(points));
  return getPath(points);
}

// main();
