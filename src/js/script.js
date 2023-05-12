const inputItem = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const resultList = document.getElementById("list");
const result = document.getElementById("result");
const sumValues = document.querySelector(".sum-values");

let itemList = [];

addBtn.addEventListener("click", () => {
  const itemValue = inputItem.value.trim();

  if (!itemValue) {
    alert("Você precisa informar um item para ser adicionado à lista.");
    return;
  }

  if (itemList.some((item) => item.value === itemValue)) {
    alert("Você já adicionou este item a sua lista.");
    return;
  }

  const newItem = { value: itemValue, quantity: 0, price: 0 };
  itemList.push(newItem);

  renderList();
  clearInput();
  focusInput();
  attachDeleteListeners();
  updateSumValues();
});

inputItem.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    addBtn.click();
  }
});

function renderList() {
  result.classList.add("result");

  const headerHtml = `
    <div class="header-items">
      <div class="info-item-header">
        <span>Item</span>
      </div>
      <div class="info-item-header">
        <span>Valor</span>
      </div>
      <div class="info-item-header">
        <span>Qtd</span>
      </div>
      <div class="info-item-header">
        <span>Total</span>
      </div>
      <div class="info-item-header">
        <span>Deletar</span>
      </div>
    </div>
  `;

  const itemsHtml = itemList
    .map(
      ({ value, quantity, price }, index) => `
    <div class="item">
      <div class="info-item">
        <li class="list-item">${value}</li>
      </div>
      <div class="info-item">
        <span><input class="item-input" type="number" name="value" value="${price.toFixed(
          2
        )}" onchange="updatePrice(${index}, this.value)" /></span>
      </div>
      <div class="info-item">
        <span><input class="item-input" type="number" name="qtd" value="${quantity}" onchange="updateQuantity(${index}, this.value)" /></span>
      </div>
      <div class="info-item">
        <span class="total-value">R$ ${(quantity * price).toFixed(2)}</span>
      </div>
      <div class="info-item">
        <span class="delete"><i class="fa-solid fa-trash-can"></i></span>
      </div>
    </div>
  `
    )
    .join("");

  resultList.innerHTML = headerHtml + itemsHtml; // Adiciona o HTML do cabeçalho e dos itens
  console.log(resultList);
}

function attachDeleteListeners() {
  const deleteItens = document.querySelectorAll(".delete");
  deleteItens.forEach((button, index) => {
    button.addEventListener("click", () => {
      itemList.splice(index, 1);
      renderList();
      attachDeleteListeners();
      updateSumValues();
    });
  });
}

function clearInput() {
  inputItem.value = "";
}

function focusInput() {
  inputItem.focus();
}

function updatePrice(index, newPrice) {
  itemList[index].price = parseFloat(newPrice);
  updateTotalValue(index);
  updateSumValues();
}

function updateQuantity(index, newQuantity) {
  itemList[index].quantity = parseInt(newQuantity);
  updateTotalValue(index);
  updateSumValues();
}

function updateTotalValue(index) {
  const { quantity, price } = itemList[index];
  const totalValueElement =
    resultList.children[index + 1].querySelector(".total-value");

  totalValueElement.textContent = `R$ ${(quantity * price).toFixed(2)}`;
}

function updateSumValues() {
  const totalValues = itemList.map(({ quantity, price }) => quantity * price);
  const sum = totalValues.reduce((acc, curr) => acc + curr, 0);
  sumValues.innerText = `Valor da compra: R$ ${sum.toFixed(2)}`;
}
