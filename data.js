const champions = [
  { id: "trieu", name: "Trieu", img: "assets/Trieu.png", total: 20 },
  { id: "jana", name: "Jana", img: "assets/Jana.png", total: 20 },
  { id: "a", name: "A", img: "assets/A.png", total: 20 },
  { id: "b", name: "B", img: "assets/B.png", total: 20 },
  { id: "c", name: "C", img: "assets/C.png", total: 20 }
];

// POOL CÒN LẠI
const pool = {};
champions.forEach(c => pool[c.id] = c.total);

// BENCH + BOARD DATA
const benchUnits = [];
const boardUnits = [null, null];
