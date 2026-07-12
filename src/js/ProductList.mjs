import { renderListWithTemplate } from "./utils.mjs";

function normalizeImagePath(imagePath) {
  return imagePath ? imagePath.replace(/^(?:\.\.\/)+/, "/") : "";
}

function productCardTemplate(product) {
  const imageSrc = normalizeImagePath(product.Image) || "/images/noun_Tent_2517.svg";
  const brandName = product.Brand?.Name || "";
  const productName = product.NameWithoutBrand || "";
  const price = typeof product.FinalPrice === "number"
    ? product.FinalPrice.toFixed(2)
    : product.ListPrice?.toFixed(2) || "";

  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${encodeURIComponent(product.Id)}">
        <img src="${imageSrc}" alt="Image of ${productName}" onerror="this.src='/images/noun_Tent_2517.svg'" />
        <h3 class="card__brand">${brandName}</h3>
        <h2 class="card__name">${productName}</h2>
        <p class="product-card__price">$${price}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
