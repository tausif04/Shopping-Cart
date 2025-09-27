function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.qty}" 
          onchange="updateQuantity(${item.id}, this.value)">
      </td>
      <td>$${(item.price * item.qty).toFixed(2)}</td>
      <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = calculateTotal().toFixed(2);
}
document.addEventListener("DOMContentLoaded", updateCartUI);

document.getElementById("apply-discount").addEventListener("click", updateCartUI);
document.getElementById("clear-cart").addEventListener("click", clearCart);
document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout complete! Total: $" + calculateTotal().toFixed(2));
  clearCart();
});
