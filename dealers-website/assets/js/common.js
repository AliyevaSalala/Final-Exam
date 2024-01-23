const nav = document.querySelector("nav");
const menuIcon = document.querySelector("#menu-icon");
const header = document.querySelector("header");
const toTop = document.querySelector(".arrow-up");
const darkMode = document.querySelector("#dark-mode");
const body = document.querySelector("body");

const BASE_URL = "http://localhost:8080/product";

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");

  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.className = "fa-solid fa-xmark";
  } else {
    menuIcon.className = "fa-solid fa-bars";
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("header-scroll");
    toTop.classList.add("active");
  } else {
    header.classList.remove("header-scroll");
    toTop.classList.remove("active");
  }
});

function setItemLocalStorage(item) {
  localStorage.setItem("product", JSON.stringify(item));
}

function getItemLocalStorage() {
  return JSON.parse(localStorage.getItem("product")) || [];
}

localStorage.getItem("dark-mode") === "true" && body.classList.add("dark-mode");

darkMode?.addEventListener("click", function () {
  body.classList.toggle("dark-mode");

  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});
