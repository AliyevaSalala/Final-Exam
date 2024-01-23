const search = document.querySelector("#search");
const inputsAll = document.querySelectorAll("input");
const form = document.querySelector("form");

const sortBtn = document.querySelector(".sort-btn");
const tBody = document.querySelector("tbody");

let array = [];

let productCopy = [];

async function getData() {
  const res = await axios(`${BASE_URL}`);
  array = res.data;
  productCopy = structuredClone(array);
  //   console.log(res.data);
  drawTable(res.data);
}

getData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>
      <img src="${element.image}" alt="" />
    </td>
    <td>${element.title}</td>
    <td>${element.desc}</td>
    <td>$ ${element.price}.00</td>
    <td><button onclick=deleteBtn("${element.id}",this)>Delete</button> <button onclick=editBtn("${element.id}")>Edit</button></td>
    `;
    tBody.append(trElement);
  });
}

// SEARCH

search.addEventListener("input", function (e) {
  e.preventDefault();

  let filtered = array.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// SORT

sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Ascending") {
    sortBtn.innerText = "Descending";
    sorted = array.sort((a, b) => a.price - b.price);
  } else if (sortBtn.innerText === "Descending") {
    sortBtn.innerText = "Deafult";
    sorted = array.sort((a, b) => b.price - a.price);
  } else {
    sortBtn.innerText = "Ascending";
    sorted = productCopy;
  }
  drawTable(sorted);
});

// delete

async function deleteBtn(id, btn) {
  if (confirm("silmek istediginden eminmisin??")) {
    await axios.delete(`${BASE_URL}/${id}`);
    favPorducts = favPorducts.filter((item) => item.id !== id);
    btn.closest("tr").remove();
    setItemLocalStorage(favPorducts);
  }
}

// EDIT

let editId = null;

async function editBtn(id) {
  editId = id;
  window.scrollTo(0, 0);
  const res = await axios(`${BASE_URL}/${id}`);

  inputsAll[1].value = res.data.title;
  inputsAll[2].value = res.data.desc;
  inputsAll[3].value = res.data.price;
}



form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    image: `./assets/images/${inputsAll[0].value.split("\\")[2]}`,
    title: inputsAll[1].value,
    desc: inputsAll[2].value,
    price: inputsAll[3].value,
  };

  if (!editId) {
    if (
      inputsAll[0].value !== "" &&
      inputsAll[1].value !== "" &&
      inputsAll[2].value !== "" &&
      inputsAll[3].value !== ""
    ) {
      await axios.post(`${BASE_URL}`, obj);
    } else {
      alert("zehmet olmasa inputlari doldurun:)");
    }
  } else {
    await axios.patch(`${BASE_URL}/${editId}`, obj);
  }
});


