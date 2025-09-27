let cart = [];

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateQuantity(id, qty) {
    if (qty <= 0) return;
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty = qty;
    }
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function calculateTotal() {
    const discountCode = document.getElementById("discount-code").value;
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (discountCode == "Ostad") {
        total *= 0.9; // Apply 10% discount
    }
    return total;
}


