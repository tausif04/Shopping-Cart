function updateCartUI() {
  const cartBody = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountEl = document.getElementById("cart-discount");

  cartBody.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${item.qty}" onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${(item.price * item.qty).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
    cartBody.appendChild(row);
  });

  const { subtotal, discount, total } = calculateTotal();

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  subtotalEl.textContent = subtotal.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

