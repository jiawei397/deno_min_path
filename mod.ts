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
  for (let i = 0; i < points.length; i++) {
    const node1 = points[i];
    const node2 = points[i + 1];
    if (!node2) {
      break;
    }
    const node3 = points[i + 2];
    if (!node3) {
      break;
    }
    const dis1 = getDis(node1, node2) + getDis(node2, node3);
    const dis2 = getDis(node1, node3) + getDis(node3, node2);
    if (dis1 > dis2) {
      points[i + 1] = node3;
      points[i + 2] = node2;
    }
  }
}

function getAllDis(points: Point[]) {
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
  const originPoints = [...points];
  sort(points);
  const indexes = getIndexes(points, originPoints);
  const dist = getAllDis(points);
  return {
    dist,
    path: indexes,
    points,
    originPoints,
  };
}

const points = [
  { "x": 0, "y": 0 },
  { "x": 2.8, "y": 6 },
  { "x": 4.3, "y": 5.1 },
  { "x": 1.3, "y": 4.5 },
  { "x": 2.1, "y": 3.3 },
  { "x": 1.3, "y": 2 },
  { "x": 1, "y": 1 },
];
// const indexes = [0, 6, 5, 4, 3, 1, 2];
// console.log(indexes.map((index) => points[index]));

// console.log(points);

function main() {
  console.log(getPath(points));
}

main();
