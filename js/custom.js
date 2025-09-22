function set_items() {
  const item_name = document.getElementById("input_product").value;
  const li = document.createElement("li");
  if(item_name.length !==0){

  li.innerHTML = `
    <div class="single-product">
      <div class="decr">
        <button class="decrement-btn">-</button>
      </div>
      <div>
        <p class="product">${item_name}</p>
        <p class="qty-txt">Qty:<span class="product_quantity">1</span></p>
      </div>
      <div class="add-min-btn">
        <div class="remove-item">
          <button class="remove-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="incre">
          <button class="increment-btn">+</button>
        </div>
      </div>
    </div>
  `;
  }
  else{
    alert('please enter any product');
  }

  return li;
}

function add_item() {
  const list = document.getElementById("list_all_products");
  list.appendChild(set_items()); 
}


function increase_item(value) {
  return value = value + 1;
}
function decrease_item(value) {
  if (!value >= 0) {
    return value = value - 1;
  }
  else {
    alert('please add quantity');
  }
}

