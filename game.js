const boardSlots = document.querySelectorAll(".board-slot");
let dragData = null;

function createUnit(champ, star, index=null, from=null) {
  const div = document.createElement("div");
  div.className = "unit";
  div.draggable = true;

  div.ondragstart = () => {
    dragData = { champ, star, index, from };
  };

  div.innerHTML = `
    <img src="${champ.img}">
    <div class="star">${"★".repeat(star)}</div>
  `;
  return div;
}

// DROP TO BOARD
boardSlots.forEach((slot, idx) => {
  slot.ondragover = e => e.preventDefault();

  slot.ondrop = () => {
    if (!dragData || dragData.from !== "bench") return;

    boardUnits[idx] = dragData;
    benchUnits.splice(dragData.index, 1);

    slot.innerHTML = "";
    slot.appendChild(
      createUnit(dragData.champ, dragData.star, null, "board")
    );

    dragData = null;
    renderBench();
    checkWin();
  };
});

boardSlots.forEach((slot, idx) => {
  slot.ondragover = e => e.preventDefault();

  slot.ondrop = () => {
    if (!dragData || dragData.from !== "bench") return;

    boardUnits[idx] = {
      champ: dragData.champ,
      star: dragData.star,
      index: idx,
      from: "board"
    };

    benchUnits.splice(dragData.index, 1);

    slot.innerHTML = "";
    slot.appendChild(
      createUnit(dragData.champ, dragData.star, idx, "board")
    );

    dragData = null;
    renderBench();
    checkWin();
  };
});



// DROP TO SHOP (SELL)
shopEl.ondragover = e => e.preventDefault();
shopEl.ondrop = () => {
  if (!dragData || dragData.from !== "bench") return;
  pool[dragData.champ.id]++;
  benchUnits.splice(dragData.index,1);
  renderBench();
};

function checkWin() {
  const names = boardUnits.map(u => u && u.champ.id + u.star);
  if (names.includes("trieu3") && names.includes("jana3")) {
    document.getElementById("win-popup").classList.remove("hidden");
  }
}

document.getElementById("claim").onclick = () => {
  window.location.href = "https://discord.gg/KBv2Q4XP";
};

