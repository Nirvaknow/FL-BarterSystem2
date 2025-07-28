const userInventory = [
  { name: "Apple", value: 1 },
  { name: "Fish", value: 2 },
  { name: "Cloth", value: 3 }
];

const merchantInventory = [
  { name: "Salt", value: 2 },
  { name: "Spices", value: 3 },
  { name: "Rice", value: 1 }
];

let userOffer = [];
let merchantOffer = [];

function animateTrade(success) {
  const merch = document.querySelector('.merchant-anim');
  merch.style.transform = success ? 'scale(1.2) rotate(0deg)' : 'scale(1) rotate(0deg)';
  setTimeout(() => merch.style.transform = '', 400);
}

function renderInventory() {
  const userList = document.getElementById("user-items");
  const merchantList = document.getElementById("merchant-items");
  userList.innerHTML = '';
  merchantList.innerHTML = '';

  userInventory.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Offer";
    btn.className = "item-btn";
    btn.onclick = () => { userOffer.push(item); userInventory.splice(i, 1); renderAll(); };
    li.appendChild(btn);
    userList.appendChild(li);
  });

  merchantInventory.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Ask";
    btn.className = "item-btn";
    btn.onclick = () => { merchantOffer.push(item); merchantInventory.splice(i, 1); renderAll(); };
    li.appendChild(btn);
    merchantList.appendChild(li);
  });
}

function renderOffers() {
  function offerList(offerArr, invArr, listId) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    offerArr.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} (${item.value})`;
      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.className = "item-btn";
      btn.onclick = () => { invArr.push(item); offerArr.splice(i, 1); renderAll(); };
      li.appendChild(btn);
      list.appendChild(li);
    });
  }
  offerList(userOffer, userInventory, 'user-offer');
  offerList(merchantOffer, merchantInventory, 'merchant-offer');
}

function checkTrade() {
  const userSum = userOffer.reduce((sum, item) => sum + item.value, 0);
  const merchantSum = merchantOffer.reduce((sum, item) => sum + item.value, 0);
  return Math.abs(userSum - merchantSum) <= 1;
}

document.getElementById('propose-trade').onclick = function() {
  const result = document.getElementById('result');
  if (userOffer.length === 0 || merchantOffer.length === 0) {
    result.textContent = "Offer at least one item each side!";
    result.style.color = "#d32f2f";
    animateTrade(false);
    return;
  }
  if (checkTrade()) {
    result.textContent = "🎉 Trade Successful! Items exchanged.";
    result.style.color = "#388e3c";
    userOffer.forEach(item => merchantInventory.push(item));
    merchantOffer.forEach(item => userInventory.push(item));
    userOffer.length = 0;
    merchantOffer.length = 0;
    animateTrade(true);
    renderAll();
  } else {
    result.textContent = "⛔ Trade Rejected! Offers not fair.";
    result.style.color = "#fbc02d";
    animateTrade(false);
  }
};

document.getElementById('reset-trade').onclick = function() {
  document.getElementById('result').textContent = "";
  userInventory.push(...userOffer);
  merchantInventory.push(...merchantOffer);
  userOffer.length = 0;
  merchantOffer.length = 0;
  renderAll();
};

function renderAll() {
  renderInventory();
  renderOffers();
}

renderAll();
