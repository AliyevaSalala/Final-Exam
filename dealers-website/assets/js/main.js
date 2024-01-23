const productSection = document.querySelector(".products-section");

async function getAllData() {
  const res = await axios(`${BASE_URL}`);
  console.log(res.data);
  drawCards(res.data);
}

getAllData();

function drawCards(data) {
  productSection.innerHTML = "";

  data.forEach((element) => {
    productSection.innerHTML += `
    <div class="product-card">
            <img src="${element.image}" alt="" />
            <div class="info">
              <h1>${element.title}</h1>
              <p>${element.desc}</p>
              <h5>$ ${element.price}.00</h5>
              <a href="">Read More</a>
            </div>
          </div>
    `;
  });
}
