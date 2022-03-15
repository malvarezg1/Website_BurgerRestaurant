
let url ="https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let data_json;

let burgers = document.getElementById("cat1").onclick = (element) => {
    document.getElementById("MenuContainer").innerHTML = '';
    renderMenu(0)
    let addToCartButtons = document.getElementsByClassName("cart")
        console.log(addToCartButtons)
};

let tacos = document.getElementById("cat2").onclick = (element) => {
    document.getElementById("MenuContainer").innerHTML = '';
    renderMenu(1)
};

let salads = document.getElementById("cat3").onclick = (element) => {
    document.getElementById("MenuContainer").innerHTML = '';
    renderMenu(2)
};

let deserts = document.getElementById("cat4").onclick = (element) => {
    document.getElementById("MenuContainer").innerHTML = '';
    renderMenu(3)
};

let drinks = document.getElementById("cat5").onclick = (element) => {
    document.getElementById("MenuContainer").innerHTML = '';
    renderMenu(4)
};


recoverData(url, (data) => {
    data_json = data;
    console.log(data_json)
    renderMenu(0)
  });


function recoverData(url, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => callback(json));
  }


function renderMenu(index){
    data_json[index].products.forEach(prod => {
        crateCard(prod)
    });
}


function crateCard(element){
    let menu_container = document.getElementById("MenuContainer")
    let column = document.createElement("div")
    let card_element = document.createElement("div")
    let card_image = document.createElement("img")
    let card_body = document.createElement("div")
    let card_title = document.createElement("h5")
    let card_content= document.createElement("p")
    let card_button = document.createElement("a")

    let card_title_node = document.createTextNode(element.name)
    let card_desc_node = document.createTextNode(element.description)
    let button_text = document.createTextNode("Add to cart")

    column.classList.add("col-12")
    column.classList.add("col-lg-3")

    card_element.classList.add("card")
    card_image.classList.add("card-img-top")
    card_body.classList.add("card-body")
    card_title.classList.add("card-title")
    card_content.classList.add("card-text")
    card_button.classList.add("btn")
    card_button.classList.add("btn-primary")

    card_image.setAttribute("src",element.image)
    card_element.setAttribute("style","width: 18rem")

    card_title.append(card_title_node)
    card_content.appendChild(card_desc_node)
    card_button.appendChild(button_text)

    card_body.appendChild(card_title)
    card_body.appendChild(card_content)
    card_body.appendChild(button_text)

    card_element.appendChild(card_image)
    card_element.append(card_body)
    menu_container.appendChild(card_element)

}
  



  