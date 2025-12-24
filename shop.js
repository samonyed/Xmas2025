const shopEl = document.getElementById("shop");
const rerollBtn = document.getElementById("reroll");

function rollShop() {
  const slots = document.querySelectorAll(".shop-slot");

  slots.forEach(slot => {
    slot.innerHTML = "";

    const available = champions.filter(c => pool[c.id] > 0);
    if (available.length === 0) return;

    const champ = available[Math.floor(Math.random() * available.length)];
    slot.appendChild(createUnit(champ, 1));
    slot.onclick = () => buyUnit(champ, slot);
  });
}


function initShop() {
  shopEl.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const slot = document.createElement("div");
    slot.className = "shop-slot";
    shopEl.appendChild(slot);
  }
}


function buyUnit(champ, slot) {
  if (benchUnits.length >= 10) return;
  pool[champ.id]--;
  slot.innerHTML = "";
  addToBench({ ...champ, star: 1 });
}

initShop();
rerollBtn.onclick = rollShop;
rollShop();
