let url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let data_json;
let categories_number = 0;
let categoriesListenes = Array();
let products_cart = Array();
let num_products_cart = 0;

recoverData(url, (data) => {
  data_json = data;
  console.log(data_json);
  renderCatergories(data_json);
  setListenersCategories();
  renderMenu(0);
});

function recoverData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json));
}

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

function renderMenu(index) {
  document.getElementById("MenuHeader").innerHTML = data_json[index].name;
  document.getElementById("OrderTable").style.display = "none";
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

function createCard(element, row) {
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

  card_element.classList.add("card");
  card_image.classList.add("card-img-top");
  card_body.classList.add("card-body");
  card_title.classList.add("card-title");
  card_title.classList.add("text-center");
  card_content.classList.add("card-text");
  card_button.classList.add("btn");
  card_button.classList.add("card-button");
  card_button.onclick = () => {
    addProductToCart(element);
  };
  card_image.setAttribute("src", element.image);
  card_element.setAttribute("style", "width: 18rem");

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

function addProductToCart(product) {
  num_products_cart++;
  products_cart.push(product);
  document.getElementById("ItemCounter").innerHTML = num_products_cart + " Items";
}

document.getElementById("cart").onclick = () =>{
renderCheckOut()
}

function renderCheckOut(){
    document.getElementById("MenuHeader").innerHTML="ORDER DETAIL"
    document.getElementById("MenuContainer").innerHTML=""
    document.getElementById("OrderTable").style.display = "";
    document.getElementById("OrderTable").style.display = "";
    let count = 1;
    let order_summary = summarizeOrder()
    products_cart.forEach((product) =>{
        let row_element = document.createElement("tr")
        let item_element = document.createElement("th")
        let qty_element = document.createElement("td")
        let desc_element = document.createElement("td")
        let unit_element = document.createElement("td")
        let amount_element = document.createElement("td")
        let modify_element = document.createElement("td")

        let item_element_text = document.createTextNode(count)
        let qty_element_text = document.createTextNode()
        let desc_element_text = document.createTextNode()
        let unit_element_text = document.createTextNode()
        let amount_element_text = document.createTextNode()
        let modify_element_text = document.createTextNode()

    });
}

function summarizeOrder(){
}