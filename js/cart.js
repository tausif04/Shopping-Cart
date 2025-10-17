let cart = [];
let appliedPromo = null; // track applied promo code

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
    appliedPromo = null; // reset applied promo
    const promoInput = document.getElementById("discount-code");
    const promoMessage = document.getElementById("promo-message");

    // Clear promo UI fields
    if (promoInput) promoInput.value = "";
    if (promoMessage) promoMessage.textContent = "";

    updateCartUI();
}


function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
    let discount = 0;

    if (appliedPromo === "ostad10") {
        discount = subtotal * 0.1;
    } else if (appliedPromo === "ostad5") {
        discount = subtotal * 0.05;
    }

    const total = subtotal - discount;
    return { subtotal, discount, total };
}

function applyPromoCode() {
    const promoInput = document.getElementById("discount-code").value.trim();
    const messageEl = document.getElementById("promo-message");

    if (!promoInput) {
        messageEl.textContent = "Please enter a promo code.";
        messageEl.style.color = "orange";
        return;
    }

    if (appliedPromo) {
        messageEl.textContent = `Promo "${appliedPromo}" already applied.`;
        messageEl.style.color = "orange";
        return;
    }

    if (promoInput === "ostad10" || promoInput === "ostad5") {
        appliedPromo = promoInput;
        messageEl.textContent = `Promo "${promoInput}" applied successfully!`;
        messageEl.style.color = "green";
    } else {
        messageEl.textContent = "Invalid promo code. Try again.";
        messageEl.style.color = "red";
    }

    updateCartUI();
}
