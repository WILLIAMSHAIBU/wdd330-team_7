import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  if (product) {
    addProductToCart(product);
  }
}

async function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  if (!productId) {
    return;
  }

  const product = await dataSource.findProductById(productId);
  if (!product) {
    return;
  }

  const brand = product.Brand?.Name || "";
  const name = product.NameWithoutBrand || product.Name || "";
  const color = product.Colors?.[0]?.ColorName || "";
  const description = product.DescriptionHtmlSimple || "";
  const price = typeof product.FinalPrice === "number"
    ? product.FinalPrice.toFixed(2)
    : product.ListPrice?.toFixed(2) || "";
  const image = product.Image
    ? product.Image.replace(/^(?:\.\.\/)+/, "/")
    : "/images/noun_Tent_2517.svg";
  const imageAlt = `Image of ${name}`;

  const brandElement = document.querySelector(".product-detail h3");
  const nameElement = document.querySelector(".product-detail h2");
  const imageElement = document.querySelector(".product-detail img");
  const priceElement = document.querySelector(".product-card__price");
  const colorElement = document.querySelector(".product__color");
  const descriptionElement = document.querySelector(".product__description");
  const addBtn = document.getElementById("addToCart");

  if (brandElement) {
    brandElement.textContent = brand;
  }
  if (nameElement) {
    nameElement.textContent = name;
  }
  if (imageElement) {
    imageElement.src = image;
    imageElement.alt = imageAlt;
    imageElement.onerror = () => {
      imageElement.src = "/images/noun_Tent_2517.svg";
    };
  }
  if (priceElement) {
    priceElement.textContent = `$${price}`;
  }
  if (colorElement) {
    colorElement.textContent = color;
  }
  if (descriptionElement) {
    descriptionElement.innerHTML = description;
  }
  if (addBtn) {
    addBtn.dataset.id = product.Id;
  }
}

renderProductDetail();

const addToCartBtn = document.getElementById("addToCart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}
