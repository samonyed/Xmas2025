const characters = [
    { name: "Trieu", img: "images/Trieu.png" },
    { name: "Jana", img: "images/Jana.png" },
    { name: "X", img: "images/Trieu.png" },
    { name: "Y", img: "images/Jana.png" },
    { name: "Z", img: "images/Trieu.png" },
];

let draggedUnit = null;

const shop = document.getElementById("shop");
const benchSlots = document.querySelectorAll(".bench-slot");
const boardSlots = document.querySelectorAll(".board-slot");

/* ===== SHOP ===== */
function rollShop() {
    shop.innerHTML = "";
    characters.forEach(c => {
        const slot = document.createElement("div");
        slot.className = "shop-slot";

        const unit = document.createElement("div");
        unit.className = "unit";
        unit.draggable = true;
        unit.dataset.name = c.name;
        unit.dataset.star = "3"; // demo
        unit.innerHTML = `<img src="${c.img}">`;

        slot.appendChild(unit);
        shop.appendChild(slot);
    });
}

document.getElementById("reroll").onclick = rollShop;
rollShop();

/* ===== DRAG ===== */
document.addEventListener("dragstart", e => {
    if (e.target.classList.contains("unit")) {
        draggedUnit = e.target;
    }
});

document.addEventListener("dragend", () => draggedUnit = null);

/* ===== DROP ===== */
document.querySelectorAll(".bench-slot, .board-slot, .shop-slot").forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
        e.preventDefault();
        if (!draggedUnit) return;

        /* SELL */
        if (slot.classList.contains("shop-slot")) {
            draggedUnit.remove();
            return;
        }

        if (slot.querySelector(".unit")) return;

        slot.appendChild(draggedUnit);

        if (slot.classList.contains("board-slot")) {
            draggedUnit.classList.add("on-board");
            checkWin();
        } else {
            draggedUnit.classList.remove("on-board");
        }
    });
});

/* ===== WIN ===== */
function checkWin() {
    let t = false, j = false;

    document.querySelectorAll(".board-slot .unit").forEach(u => {
        if (u.dataset.name === "Trieu") t = true;
        if (u.dataset.name === "Jana") j = true;
    });

    if (t && j) {
        document.getElementById("gift-popup").classList.add("show");
    }
}
