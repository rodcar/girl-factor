async function cargarJSON() {
    const respuesta = await fetch("data/productos.json");
    const data = await respuesta.json();
    let html = "";
    data.forEach((producto) => {
      if(producto.tipo == "zapatilla"){
        html += `
        <div class="u-align-center u-container-style u-products-item u-repeater-item"">
            <div class="u-container-layout u-similar-container u-valign-bottom-sm u-container-layout-1"><!--product_image-->
            <a href="descripcion.html?id=${producto.id}">
                <img alt="" class="u-expanded-width u-image u-image-default u-product-control u-image-1 rounded" src="${producto.img}" data-image-height="385"><!--/product_image-->
            </a>   
            <div class="u-align-center u-container-style u-grey-10 u-group u-group-1 rounded">
                <div class="u-container-layout u-valign-bottom u-container-layout-2">
                <h4 class="u-text u-text-default u-text-font u-text-1">${producto.nombre}<br>
                </h4>
                <h6 class="u-text u-text-default u-text-2">S/.${producto.precio}</h6><!--product_button--><!--options_json--><!--{"clickType":"add-to-cart","content":"aGREGAR AL CARRITO"}--><!--/options_json-->
                <a href="#" class="u-border-2 u-border-grey-25 u-btn rounded u-button-style u-palette-2-base u-product-control u-text-body-color u-btn-1"><!--product_button_content-->AGREGAR AL CARRITO<!--/product_button_content--></a><!--/product_button-->
                </div>
            </div>
            </div>
        </div>
        `;
      }
    });
    document.getElementById("blusas").innerHTML = html;
  }
  
  cargarJSON();
  