document.addEventListener("DOMContentLoaded", function() {
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
    if (shoppingCartData.length == 0) { return; } else {
        loadShoppingCart();
    }
});


/**
 * Loads the shopping cart data from localStorage and updates the HTML elements
 * to display the shopping cart items, subtotal, delivery price, and total price.
 * 
 * This function performs the following tasks:
 * - Retrieves the shopping cart data from localStorage.
 * - Updates the item count in the shopping cart.
 * - Generates the HTML for each item in the shopping cart and appends it to the list.
 * - Calculates the subtotal of the items in the shopping cart.
 * - Determines the delivery price based on the subtotal.
 * - Calculates the total price including the delivery price.
 * - Updates the HTML elements to display the subtotal, delivery price, and total price.
 */
function loadShoppingCart() {
    let shoppingCartList = document.getElementById("list-products");
    let subtotalSpan = document.getElementById("subtotal");
    let entregaPrecioSpan = document.getElementById("entrega-precio");
    let totalSpan = document.getElementById("total");
    let totalYapeSpan = document.getElementById("totalYape");
    let totalPlinSpan = document.getElementById("totalPlin");
    let totalTunkiSpan = document.getElementById("totalTunki");
    let counterSpan = document.getElementById("item-count");
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));

    counterSpan.innerHTML = shoppingCartData.length;
    let html = "";
    let subtotal = 0;
    shoppingCartData.forEach((producto) => {
      html += `
      <li class="list-group-item">
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-2 d-flex align-items-center justify-content-center">
                  <img src="${producto.img}" alt="item" width="100" class="rounded">
              </div>
              <div class="col-sm-3 d-flex align-items-center justify-content-center">
                  <div class="container text-center">
                          <p class="mb-0">${producto.nombre}</p>
                          <p class="fw-bold">${producto.marca}</p> 
                  </div>
              </div>
              <div class="col-sm-3 d-flex align-items-center justify-content-center">
                  <div class="container text-center">
                          <p class="mb-0">S/.${producto.precio}</p>
                  </div>
              </div>                                
              <div class="col-sm-2 d-flex align-items-center justify-content-center">
                  <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity" onclick="changeItemQuantity(${producto.id}, -1)">
                  <span class="w-25 text-center">${producto.cantidad}</span>
                  <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity" onclick="changeItemQuantity(${producto.id}, 1)">
              </div>
              <div class="col-sm-2 d-flex align-items-center justify-content-center"><a href="#" class="text-decoration-none" data-id="${producto.id}" onclick="deleteItem(${producto.id})">Eliminar</a></div>
          </div>
      </div>
  </li>
      `;
      subtotal += producto.precio * producto.cantidad;
    });
    subtotalSpan.innerHTML = `S/.${subtotal.toFixed(2)}`;
    let entregaPrecio = 15;
    if (subtotal >= 99) {
      entregaPrecio = 0;
    }
    entregaPrecioSpan.innerHTML = `S/.${entregaPrecio.toFixed(2)}`;
    let total = subtotal + entregaPrecio;
    totalSpan.innerHTML = `S/.${total.toFixed(2)}`;
    totalYapeSpan.innerHTML = `S/.${total.toFixed(2)}`;
    totalPlinSpan.innerHTML = `S/.${total.toFixed(2)}`;
    totalTunkiSpan.innerHTML = `S/.${total.toFixed(2)}`;
    shoppingCartList.innerHTML = html;
}

/**
 * Deletes an item from the shopping cart stored in localStorage by its ID.
 *
 * @param {number} id - The ID of the item to be deleted.
 */
function deleteItem(id) {
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
    shoppingCartData = shoppingCartData.filter(function(item) {
        return item.id != parseInt(id);
    });
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCartData));
    loadShoppingCart();
    loadItemBadge();
}

/**
 * Changes the quantity of an item in the shopping cart.
 *
 * @param {number} id - The ID of the item to change the quantity of.
 * @param {number} quantityChange - The amount to change the item's quantity by. Can be positive or negative.
 */
function changeItemQuantity(id, quantityChange) {
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
    let index = shoppingCartData.findIndex(item => item.id == id);
    if(index != -1) {
        if (shoppingCartData[index].cantidad + quantityChange >= 1) {
            shoppingCartData[index].cantidad += quantityChange;
        }
    }
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCartData));
    loadShoppingCart();
    loadItemBadge();  
}