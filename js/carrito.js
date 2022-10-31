document.addEventListener("DOMContentLoaded", function() {
  loadShoppingCart();
});

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

    if (shoppingCartData.length == 0) { return; }

    counterSpan.innerHTML = shoppingCartData.length;
    let html = "";
    let subtotal = 0;
    shoppingCartData.forEach((producto) => {
      html += `
      <li class="list-group-item">
      <div class="container-fluid">
          <div class="row">
              <div class="col-2 d-flex align-items-center">
                  <img src="${producto.img}" alt="item" width="100" class="rounded">
              </div>
              <div class="col-3 d-flex align-items-center">
                  <div class="container">
                          <p class="mb-0">${producto.nombre}</p>
                          <p class="fw-bold">${producto.marca}</p> 
                  </div>
              </div>
              <div class="col-3 d-flex align-items-center">
                  <div class="container">
                          <p class="mb-0">S/.${producto.precio}</p>
                  </div>
              </div>                                
              <div class="col-2 d-flex align-items-center">
                  <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity" onclick="changeItemQuantity(${producto.id}, -1)">
                  <span class="w-25 text-center">${producto.cantidad}</span>
                  <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity" onclick="changeItemQuantity(${producto.id}, 1)">
              </div>
              <div class="col-2 d-flex align-items-center"><a href="#" class="text-decoration-none" data-id="${producto.id}" onclick="deleteItem(${producto.id})">Eliminar</a></div>
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

function deleteItem(id) {
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
    shoppingCartData = shoppingCartData.filter(function(item) {
        return item.id != parseInt(id);
    });
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCartData));
    loadShoppingCart();
}

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
}