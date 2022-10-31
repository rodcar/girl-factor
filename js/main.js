document.addEventListener("DOMContentLoaded", function() {
    loadItemBadge();
});

// carga cantidad de elementos en el carrito de compras
function loadItemBadge() {
    let shoppingCartData = JSON.parse(localStorage.getItem("shopping-cart"));
    if (shoppingCartData.length == 0) { 
        let shoppingCartBadge = document.getElementById("badge-shopping-cart");
        shoppingCartBadge.style.display = 'none';
        return;
    } else {
        let shoppingCartBadge = document.getElementById("badge-shopping-cart");
        shoppingCartBadge.style.display = 'inline-block';
        shoppingCartBadge.innerHTML = shoppingCartData.length;
    }
}