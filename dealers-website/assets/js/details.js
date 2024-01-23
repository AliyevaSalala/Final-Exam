const details = document.querySelector(".details-section");

let id = new URLSearchParams(window.location.search).get("id");

async function getData() {
  const res = await axios(`${BASE_URL}/${id}`);

  //   console.log(res.data);

  details.innerHTML = `
<div class="details-left">
<img src="${res.data.image}" alt="" />
</div>
<div class="details-right">
<h1>Titl: ${res.data.title}</h1>
<p>Description:${res.data.desc}</p>
<h5>$ ${res.data.price}.00</h5>
<button class="goback" onclick=goBack()>Go Back</button>
</div>`;
}

getData();

function goBack() {
  window.history.back();
}
