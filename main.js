/** Variables importantes para la ejecucion */
let url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let data_json;
let categories_number = 0;
let categoriesListenes = Array();
let products_cart = Array();
let num_products_cart = 0;

/** Evento para volver al menu principal */
const logo = (document.querySelector("h1").onclick = () => {
  document.getElementById("MenuContainer").innerHTML = "";
  renderMenu(0);
});

/** Primera  renderizacion */
recoverData(url, (data) => {
  data_json = data;
  renderCatergories(data_json);
  setListenersCategories();
  renderMenu(0);
});

/** Funcion asincrona para carga de datos */
function recoverData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json));
}

/** Funcion para renderivar menu de navegacion segun datos */
function renderCatergories(json) {
  json.forEach((cat) => {
    let categories = document.getElementById("CategoriesList");
    let list_element = document.createElement("li");
    let list_element_text = document.createTextNode(cat.name);
    list_element.classList.add("nav-item");
    list_element.setAttribute("id", "cat" + categories_number);
    list_element.appendChild(list_element_text);
    categories.appendChild(list_element);
    categories_number++;
  });
}

/** signacion de eventos a barra de navegacion */
function setListenersCategories() {
  for (let i = 0; i < categories_number; i++) {
    categoriesListenes.push(
      (document.getElementById("cat" + i).onclick = (element) => {
        document.getElementById("MenuContainer").innerHTML = "";
        renderMenu(i);
      })
    );
  }
}

/** Funcion para renderizar el menu */
function renderMenu(index) {
  document.getElementById("MenuHeader").innerHTML = data_json[index].name;
  document.getElementById("SelectedItem").innerHTML = data_json[index].name;
  document.getElementById("CheckoutContainer").style.display = "none";
  let counter = 0;
  let row;
  let menu_container = document.getElementById("MenuContainer");
  data_json[index].products.forEach((prod) => {
    if (counter % 4 == 0) {
      row = document.createElement("div");
      row.classList.add("row");
      row.classList.add("product-row");
    }
    let card = createCard(prod);
    row.appendChild(card);
    if (counter % 4 == 3 || counter == data_json[index].products.length - 1) {
      menu_container.appendChild(row);
    }
    counter++;
  });
}

/** Funcion para creat una unica carta*/
function createCard(element) {
  let column = document.createElement("div");
  let card_element = document.createElement("div");
  let card_image = document.createElement("img");
  let card_body = document.createElement("div");
  let card_title = document.createElement("h5");
  let card_content = document.createElement("p");
  let card_price = document.createElement("p");
  let card_button = document.createElement("a");
  let card_strong = document.createElement("strong");

  let card_title_node = document.createTextNode(element.name);
  let card_desc_node = document.createTextNode(element.description);
  let button_text = document.createTextNode("Add to cart");
  let price = document.createTextNode("$" + element.price);

  column.classList.add("col-12");
  column.classList.add("col-lg-3");
  column.classList.add("card_col");

  card_element.classList.add("card");
  card_image.classList.add("card-img-top");
  card_body.classList.add("card-body");
  card_body.classList.add("d-flex");
  card_body.classList.add("flex-column");
  card_title.classList.add("card-title");
  card_title.classList.add("text-center");
  card_content.classList.add("card-text");
  card_button.classList.add("btn");
  card_button.classList.add("card-button");
  card_button.classList.add("mt-auto");
  card_button.onclick = () => {
    addProductToCart(element);
  };
  card_image.setAttribute("src", element.image);
  card_element.setAttribute("style", "width: auto");

  card_strong.appendChild(price);
  card_price.appendChild(card_strong);
  card_title.append(card_title_node);
  card_content.appendChild(card_desc_node);
  card_button.appendChild(button_text);

  card_body.appendChild(card_title);
  card_body.appendChild(card_content);
  card_body.appendChild(card_price);
  card_body.appendChild(card_button);

  card_element.appendChild(card_image);
  card_element.append(card_body);
  column.append(card_element);
  return column;
}

/** Añadir un producto al carrito de compra */
function addProductToCart(product) {
  num_products_cart++;
  products_cart.push(product);
  document.getElementById("ItemCounter").innerHTML =
    num_products_cart + " Items";
}

/** Remover un producto al carrito de compra */
function removeProductFromCart(product) {
  let removed = products_cart.splice(products_cart.indexOf(product), 1);
  if (removed) {
    num_products_cart--;
    document.getElementById("ItemCounter").innerHTML =
      num_products_cart + " Items";
  }
}

/** Evento sobre el carro de compra para iniciar el checkout */
document.getElementById("cart").onclick = () => {
  renderCheckOut();
};

/** Funcion para renderizar el checkout*/
function renderCheckOut() {
  document.getElementById("MenuHeader").innerHTML = "ORDER DETAIL";
  document.getElementById("MenuContainer").innerHTML = "";
  document.getElementById("CheckoutContainer").style.display = "";

  let table_body = document.getElementById("OrderTableBody");
  table_body.innerHTML = "";

  let order_summary = summarizeOrder(products_cart);
  let total = 0;
  order_summary.forEach((product) => {
    let row_element = document.createElement("tr");
    let item_element = document.createElement("th");
    let qty_element = document.createElement("td");
    let desc_element = document.createElement("td");
    let unit_element = document.createElement("td");
    let amount_element = document.createElement("td");
    let modify_element = document.createElement("td");
    let plus_button = document.createElement("Button");
    let minus_button = document.createElement("Button");

    let item_element_text = document.createTextNode(product.item);
    let qty_element_text = document.createTextNode(product.qty);
    let desc_element_text = document.createTextNode(product.prod.name);
    let unit_element_text = document.createTextNode(product.prod.price);
    let amount_element_text = document.createTextNode(
      Math.round(product.prod.price * product.qty * 100) / 100
    );

    total = total + product.prod.price * product.qty;

    plus_button.innerHTML = "+";
    minus_button.innerHTML = "-";
    plus_button.classList.add("checkout-button");
    minus_button.classList.add("checkout-button");

    plus_button.onclick = () => {
      addProductToCart(product.prod);
      renderCheckOut();
    };

    minus_button.onclick = () => {
      removeProductFromCart(product.prod);
      renderCheckOut();
    };

    item_element.appendChild(item_element_text);
    qty_element.appendChild(qty_element_text);
    desc_element.appendChild(desc_element_text);
    unit_element.appendChild(unit_element_text);
    amount_element.appendChild(amount_element_text);
    modify_element.appendChild(plus_button);
    modify_element.appendChild(minus_button);

    row_element.appendChild(item_element);
    row_element.appendChild(qty_element);
    row_element.appendChild(desc_element);
    row_element.appendChild(unit_element);
    row_element.appendChild(amount_element);
    row_element.appendChild(modify_element);

    table_body.appendChild(row_element);
  });
  document.getElementById("PrecioTotal").innerHTML =
    "Total:$" + Math.round(total * 100) / 100;
}

/**  Funcion para procesar elementos en el carrito de compra y generar resumen */
function summarizeOrder(products_cart) {
  let products = Array();
  let summary = Array();
  data_json.forEach((element) => {
    element.products.forEach((prod) => {
      products.push(prod);
    });
  });
  let item_id = 0;
  products.forEach((prod) => {
    let qty_item = products_cart.filter((x) => x == prod).length;
    if (qty_item > 0) {
      item_id++;
      summary.push({ item: item_id, prod: prod, qty: qty_item });
    }
  });
  return summary;
}

/** Eventos de los botones en el checkout */
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");
const orderCancelBtn = document.getElementById("CanelConfirmationBtn");
const orderContinueBtn = document.getElementById("OrderContinueBtn");

orderCancelBtn.onclick = () => {
  products_cart = Array();
  num_products_cart = 0;
  document.getElementById("ItemCounter").innerHTML = "";
  popup.style.display = "none";
  renderMenu(0);
};

orderContinueBtn.onclick = () => {
  popup.style.display = "none";
};

document.getElementById("OrderCancelButton").addEventListener("click", () => {
  popup.style.display = "block";
});

close.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (e.target.className === "popup-wrapper") {
    popup.style.display = "none";
  }
});

document.getElementById("OrderConfirmationButton").onclick = () => {
  let summary = summarizeOrder(products_cart);
  let output = Array();
  summary.forEach((element) => {
    output.push({
      item: element.item,
      quantity: element.qty,
      description: element.prod.name,
      unitPrice: element.prod.price,
    });
  });
  console.log(output);
};
