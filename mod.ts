interface Point {
  x: number;
  y: number;
}

function getDis(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function sort(points: Point[]): Point[] {
  points.sort((a, b) => {
    if (a.x < b.x) return -1;
    if (a.x > b.x) return 1;
    if (a.y < b.y) return -1;
    return 0;
  });
  const lastPoints = [points.shift()!];
  while (points.length > 0) {
    const currentNode = lastPoints.at(-1)!;
    const { node, index } = find3Node(currentNode, points);
    lastPoints.push(node);
    points.splice(index, 1);
  }
  return lastPoints;
}

function find3Node(currentNode: Point, list: Point[]) {
  const map: Record<number, {
    index: number;
    node: Point;
  }> = {};
  const last = Math.min(...list.map((node, index) => {
    const dis = getDis(node, currentNode);
    map[dis] = {
      index,
      node,
    };
    return dis;
  }));
  console.log("Found ", map[last]);
  return map[last];
}

export function getAllDis(points: Point[]) {
  let dis = 0;
  points.reduce((pre, cur) => {
    //   console.log(pre, cur);
    dis += Math.sqrt(Math.pow(cur.x - pre.x, 2) + Math.pow(cur.y - pre.y, 2));
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
  const lastPoints = sort(points);
  const indexes = getIndexes(points, originPoints);
  const dist = getAllDis(lastPoints);
  console.timeEnd("getPath");
  return {
    dist,
    path: indexes,
    finalPoints: lastPoints,
    originPoints,
  };
}

const points = [
  { "x": 0, "y": 0 },
  { "x": 2.8, "y": 6 },
  { "x": 1.3, "y": 5.1 },
  { "x": 1.3, "y": 4.5 },
  { "x": 2.1, "y": 3.3 },
  { "x": 1.3, "y": 2 },
  { "x": 1, "y": 1 },
];
// const indexes = [0, 6, 5, 4, 3, 1, 2];
// console.log(indexes.map((index) => points[index]));

// console.log(points);

export default function main() {
  //   console.log(getPath(points));
  return getPath(points);
}

// main();
