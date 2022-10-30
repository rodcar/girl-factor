document.addEventListener("DOMContentLoaded", function() {
  let shoppingCartList = document.getElementById("list-products");
  let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
  let html = "";
  shoppingCartData.forEach((producto) => {
    html += `
    <li class="list-group-item">
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 d-flex align-items-center">
                <img src="${producto.img}" alt="item" width="100">
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
                <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 " data-field="quantity">
                <span class="w-25 text-center">${producto.cantidad}</span>
                <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm lh-0" data-field="quantity">
            </div>
            <div class="col-2 d-flex align-items-center"><a href="#">Eliminar</a></div>
        </div>
    </div>
</li>
    `;
  });
  shoppingCartList.innerHTML = html;
});