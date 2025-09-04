// Fetch and render products
async function loadProducts() {
    try {
        const response = await fetch("products.json");
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
        document.getElementById("product-list").innerHTML =
            "<p>Failed to load products.</p>";
    }
}

function renderProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
        productList.appendChild(card);
    });
}

// Load products when page starts
document.addEventListener("DOMContentLoaded", loadProducts());

