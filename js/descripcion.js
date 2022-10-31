async function cargarDescripcion() {
  const respuesta = await fetch("data/productos.json");
  const data = await respuesta.json();
  let queryStrings = new URLSearchParams(window.location.search);
  const q = parseInt(queryStrings.get("id"));
  document.title = `GirlFactor - ${data[q-1].nombre}`;
  let tallas = "";
  if(data[q-1].tipo == "blusa"){
      tallas = `
        <div class="p-2 mx-2 border">XS</div>
        <div class="p-2 mx-2 border">S</div>
        <div class="p-2 mx-2 border">S</div>
        <div class="p-2 mx-2 border">M</div>
        <div class="p-2 mx-2 border">L</div>
      `;
  } else {
      tallas = `
        <div class="p-2 mx-2 border">40</div>
        <div class="p-2 mx-2 border">41</div>
        <div class="p-2 mx-2 border">42</div>
        <div class="p-2 mx-2 border">43</div>
        <div class="p-2 mx-2 border">44</div>
      `;
  }
  let html = `
    <div class="row d-flex justify-content-center">
    <div class="col-auto d-none d-md-none d-lg-block d-xl-block d-xxl-block">
        <div class="d-flex flex-column">
        <img
            src="${data[q-1].img}"
            style="width: 5rem"
            class="img-fluid border mb-2"
            alt=""
        />
        <img
            src="${data[q-1].img}"
            style="width: 5rem"
            class="img-fluid border mb-2"
            alt=""
        />
        <img
            src="${data[q-1].img}"
            style="width: 5rem"
            class="img-fluid border mb-2"
            alt=""
        />
        </div>
    </div>
    <div class="col-auto">
        <img
        src="${data[q-1].img}"
        class="img-fluid border"
        style="width: 30rem; max-height:40rem;"
        alt=""
        />
    </div>
    <div class="col">
        <p>XIOMI</p>
        <h4>${data[q-1].nombre}</h4>
        <p>SKU : 1820410</p>
        <hr />
        <p>Precio antes : <del class="text-secondary fw-bold">S/ ${(data[q-1].precio * 1.15).toFixed(0)}</del></p>
        <p class="h3">Precio ahora : S/ <strong class="h1 text-danger">${data[q-1].precio}</strong></p>
        <hr />
        <p>
        ${data[q-1].descripcion}
        </p>
        <h6>Colores</h6>
        <div class="container overflow-hidden text-center">
        <div class="row gx-1">
            <div class="col-1">
            <div class="p-2 border bg-dark" style="height: 2rem"></div>
            </div>
            <div class="col-1">
            <div class="p-2 border bg-info" style="height: 2rem"></div>
            </div>
            <div class="col-1">
            <div class="p-2 border bg-secondary" style="height: 2rem"></div>
            </div>
            <div class="col-1">
            <div class="p-2 border bg-warning" style="height: 2rem"></div>
            </div>
        </div>
        </div>
        <br />
        <h6>Talla</h6>
        <div class="container overflow-hidden text-center">
        <div class="row gx-2">
            <div class="col d-flex">
              ${tallas}
            </div>
        </div>
        </div>
        <button type="button" class="btn btn-danger w-50 my-5 d-block m-auto" id="add" data-bs-container="body" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="top" data-bs-content="Listo! Producto añadido, <a href='carrito.html' title='test add link'>Ir al carrito</a>">
        Añadir al carrito
        </button>
        <ul style = "list-style-type: none">
        <li><img src="https://cdn.icon-icons.com/icons2/1849/PNG/96/fast-delivery_116471.png" height="30px" width="30px"> &nbsp; Express
            Compra HOY y recíbelo MAÑANA</li><br>
        <li><img src="https://cdn.icon-icons.com/icons2/2331/PNG/96/food_delivery_meal_order_icon_142268.png" height="30px" width="30px"> &nbsp; Delivery GRATIS
            Por compras desde S/99</li><br>
        <li><img src="https://cdn.icon-icons.com/icons2/2989/PNG/96/address_delivery_map_tracking_distribution_icon_187242.png" height="30px" width="30px"> &nbsp; Revisa tu pedido
            Ingresa tu N° pedido y conoce su estado.</li><br>
        </ul>
    </div>
    </div>
    `;
  document.getElementById("contenedor").innerHTML = html;

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

  document.getElementById("add").onclick = () => {
    let producto = {
        id: data[q-1].id,
        img: data[q-1].img,
        nombre: data[q-1].nombre,
        precio: data[q-1].precio,
        cantidad: 1,
        marca: 'GirlFactor'
    };
    console.log(producto);
    
    if (localStorage.getItem("shopping-cart") !== null) {
        let shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
        console.log(shoppingCart);
        console.log(data[q-1].id);
        let index = shoppingCart.findIndex(item => item.id == data[q-1].id);
        console.log(index);
        if(index != -1) {
            shoppingCart[index].cantidad += 1;
        } else {
            shoppingCart.push(producto);
        }

        localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    } else {
        localStorage.setItem("shopping-cart", JSON.stringify([producto]));
    }
  };
}

cargarDescripcion();
