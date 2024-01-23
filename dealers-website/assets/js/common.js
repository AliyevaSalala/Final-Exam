const nav = document.querySelector("nav");
const menuIcon = document.querySelector("#menu-icon");

const BASE_URL = "http://localhost:8080/product";

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");
});
