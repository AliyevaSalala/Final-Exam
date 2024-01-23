$(function () {
  // Owl Carousel
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
        margin: 20,
      },
    },
  });
});

const productSection = document.querySelector(".products-section");
const loadMoreBtn = document.querySelector(".load-more");
const favCounter = document.querySelector(".fav-counter");

let limit = 3;
let array = [];

async function getAllData() {
  const res = await axios(`${BASE_URL}`);
  array = res.data;
  console.log(res.data);
  drawCards(res.data.slice(0, limit));
}

getAllData();

function drawCards(data) {
  productSection.innerHTML = "";

  data.forEach((element) => {
    productSection.innerHTML += `
    <div class="product-card">
            <img src="${element.image}" alt="" />
            <i class="${
              favPorducts.some((item) => item.id === element.id)
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart"
            }" onclick=addToFav("${element.id}",this)></i>
            <div class="info">
              <h1>${element.title}</h1>
              <p>${element.desc}</p>
              <h5>$ ${element.price}.00</h5>
              <a href="details.html?id=${element.id}">Read More</a>
              <i class="fa-solid fa-plus" onclick=addToBasket(${
                element.id
              })></i>
            </div>
          </div>
    `;
  });
}

loadMoreBtn.addEventListener("click", function () {
  limit += 3;
  drawCards(array.slice(0, limit));

  if (limit > array.length) {
    this.remove();
  }
});

// FAVOPRITE

let favPorducts = getItemLocalStorage();
calculate(favPorducts.length);

function addToFav(id, icon) {
  icon.className === "fa-regular fa-heart"
    ? (icon.className = "fa-solid fa-heart")
    : (icon.className = "fa-regular fa-heart");

  let favs = getItemLocalStorage();

  let bool = favs.find((item) => item.id === id);
  let product = array.find((item) => item.id === id);

  if (bool) {
    favs = favs.filter((item) => item.id !== id);
  } else {
    favs.push(product);
  }
  setItemLocalStorage(favs);
  calculate(favs.length);
}

function calculate(count) {
  favCounter.textContent = count;
}

// BASKET

let basket = getItemLocalStorage();

function addToBasket(id) {
  let basketProduct = array.find((item) => item.id === id);

  let index = basket.findIndex((item) => item.id === id);

  if (index > -1) {
    basket[index].count = basket[index].count + 1;
  } else {
    basket.push({ count: 1, ...basketProduct });
  }

  setItemLocalStorage(basket);
}
