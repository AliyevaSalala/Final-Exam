const favsSection = document.querySelector(".favs-section");
const favCounter = document.querySelector(".fav-counter");

let favPorducts = getItemLocalStorage();
calculate(favPorducts.length);

function drawCards(data) {
  favsSection.innerHTML = "";
  data.forEach((element) => {
    favsSection.innerHTML += `
    <div class="fav-card">
    <img src="${element.image}" alt="product-img" />
    <i class="fa-solid fa-heart" onclick=removeFav("${element.id}",this)></i>
    <div class="info">
      <h1>${element.title}</h1>
      <p>${element.desc}</p>
      <h5>$ ${element.price}.00</h5>
      <i class="fa-solid fa-plus" onclick=addToBasket(${element.id})></i>
    </div>
  </div>
    `;
  });
}

drawCards(favPorducts);

function removeFav(id, btn) {
  favPorducts = favPorducts.filter((item) => item.id !== id);

  btn.closest(".fav-card").remove();

  setItemLocalStorage(favPorducts);
  calculate(favPorducts.length);
}

function calculate(count) {
  favCounter.textContent = count;
}
