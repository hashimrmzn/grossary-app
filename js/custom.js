function save_list() {
  const items = [];
  document.querySelectorAll("#list_all_products li").forEach(li => {
    const name = li.querySelector(".product").textContent;
    const qty = parseInt(li.querySelector(".product_quantity").textContent) || 0;
    items.push({ name, qty });
  });
  localStorage.setItem("grocery_list", JSON.stringify(items));
}

function load_list() {
  const saved = localStorage.getItem("grocery_list");
  if (!saved) return;

  const items = JSON.parse(saved);
  const list = document.getElementById("list_all_products");

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="single-product">
        <div class="decr">
          <button class="decrement-btn" onclick="decrease_item(this)">-</button>
        </div>
        <div>
          <p class="product">${item.name}</p>
          <p class="qty-txt">Qty:<span class="product_quantity">${item.qty}</span></p>
        </div>
        <div class="add-min-btn">
          <div class="remove-item">
            <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
          </div>
          <div class="incre">
            <button class="increment-btn" onclick="increase_item(this)">+</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(li);
  });

  update_totals();
}

function count_total_products() {
  let qtyElements = document.querySelectorAll(".product_quantity");
  let total = 0;
  qtyElements.forEach(el => {
    total += parseInt(el.textContent) || 0;
  });
  return total;
}

function count_total_li() {
  return document.querySelectorAll("#list_all_products li").length;
}

function update_totals() {

  document.querySelectorAll(".total-item").forEach(el => {
    el.textContent = count_total_li();
  });


  document.querySelector(".total-items").textContent=count_total_products();
}


function add_item() {
  const input = document.getElementById("input_product");
  const name = input.value.trim();
  if (!name) {
    alert("Please enter a product");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="single-product">
      <div class="decr">
        <button class="decrement-btn" onclick="decrease_item(this)">-</button>
      </div>
      <div>
        <p class="product">${name}</p>
        <p class="qty-txt">Qty:<span class="product_quantity">1</span></p>
      </div>
      <div class="add-min-btn">
        <div class="remove-item">
          <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="incre">
          <button class="increment-btn" onclick="increase_item(this)">+</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("list_all_products").appendChild(li);
  input.value = "";

  update_totals();
  save_list();
}

function increase_item(button) {
  const li = button.closest("li");
  const qtyEl = li.querySelector(".product_quantity");
  let value = parseInt(qtyEl.textContent) || 0;
  value++;
  qtyEl.textContent = value;
  update_totals();
  save_list();
}

function decrease_item(button) {
  const li = button.closest("li");
  const qtyEl = li.querySelector(".product_quantity");
  let value = parseInt(qtyEl.textContent) || 0;

  if (value > 1) {
    value--;
    qtyEl.textContent = value;
    update_totals();
    save_list();
  } else {
    alert("Quantity cannot be less than 1");
  }
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".remove-btn")) {
    const li = e.target.closest("li");
    li.remove();
    update_totals();
    save_list();
  }
});

window.addEventListener("DOMContentLoaded", load_list);
