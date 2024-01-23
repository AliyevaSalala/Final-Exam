// const tbody = document.querySelector("tbody");

// let basket = getItemLocalStorage();

// function drawTable(data) {
//   tbody.innerHTML = "";
//   data.forEach((element) => {
//     const trElement = document.createElement("tr");
//     trElement.innerHTML = `
//       <td>
//         <img src="${element.image}" alt="" />
//       </td>
//       <td>${element.title}</td>
//       <td>${element.desc}</td>
//       <td>$ ${element.price}.00</td>
//       <td><button onclick=deleteBtn("${element.id}",this)>Delete</button></td>
//       <td><button class="inc" onclick=incBtn(${element.id})>+</button> <span>1</span><button class="dec" onclick=decBtn("${element.id}",this)>-</button></td>
//       `;
//     tbody.append(trElement);
//   });
// }

// drawTable(basket);

// function deleteBtn(id, btn) {
//   basket = basket.filter((item) => item.id !== id);

//   btn.closest("tr").remove();

//   setItemLocalStorage();
// }
