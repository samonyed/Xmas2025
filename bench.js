const benchEl = document.getElementById("bench");

function addToBench(unit) {
  benchUnits.push(unit);
  mergeCheck(unit.id);
  renderBench();
}

function mergeCheck(id) {
  let merged = true;

  while (merged) {
    merged = false;

    // check từng cấp sao
    [1, 2].forEach(star => {
      const same = benchUnits.filter(
        u => u.id === id && u.star === star
      );

      if (same.length >= 3) {
        // remove 3 unit cũ
        for (let i = 0; i < 3; i++) {
          benchUnits.splice(benchUnits.indexOf(same[i]), 1);
        }

        // add unit sao cao hơn
        benchUnits.push({
          ...same[0],
          star: star + 1
        });

        merged = true;
      }
    });
  }
}


function renderBench() {
  benchEl.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement("div");
    slot.className = "bench-slot";

    if (benchUnits[i]) {
      slot.appendChild(
        createUnit(benchUnits[i], benchUnits[i].star, i, "bench")
      );
    }

    benchEl.appendChild(slot);
  }
}


benchEl.ondragover = e => e.preventDefault();

benchEl.ondrop = () => {
  if (!dragData || dragData.from !== "board") return;

  // board → bench
  benchUnits.push({
    ...dragData.champ,
    star: dragData.star
  });

  boardUnits[dragData.index] = null;

  // clear board slot
  document.querySelectorAll(".board-slot")[dragData.index].innerHTML = "";

  dragData = null;
  renderBench();
};

renderBench();

