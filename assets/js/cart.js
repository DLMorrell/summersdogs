/* ==========================================================================
   Summer's Dogs - Shopping Cart Management
   ========================================================================== */

const CART_STORAGE_KEY = 'summersdogs_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading cart from storage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error('Error saving cart to storage', e);
  }
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'inline-block' : 'inline-block';
  });
}

function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id && item.variant === product.variant);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += (product.quantity || 1);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      variant: product.variant || '',
      quantity: product.quantity || 1
    });
  }
  
  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast(`Added "${product.title}" to your cart!`, 'success');
  }
}

function removeFromCart(id, variant = '') {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === id && (item.variant || '') === variant));
  saveCart(cart);
  renderCartPage();
}

function updateQuantity(id, variant, delta) {
  const cart = getCart();
  const item = cart.find(item => item.id === id && (item.variant || '') === variant);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }
    saveCart(cart);
    renderCartPage();
  }
}

function renderCartPage() {
  const tableBody = document.getElementById('cart-items-body');
  const emptyMessage = document.getElementById('cart-empty-message');
  const cartLayout = document.getElementById('cart-layout-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (!tableBody) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'block';
    if (cartLayout) cartLayout.style.display = 'none';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';
  if (cartLayout) cartLayout.style.display = 'grid';

  let subtotal = 0;
  tableBody.innerHTML = '';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div>
            <strong>${item.title}</strong>
            ${item.variant ? `<div class="text-muted" style="font-size: 0.85rem;">Option: ${item.variant}</div>` : ''}
          </div>
        </div>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-control">
          <button type="button" class="qty-btn" onclick="updateQuantity('${item.id}', '${item.variant || ''}', -1)">-</button>
          <span class="qty-input">${item.quantity}</span>
          <button type="button" class="qty-btn" onclick="updateQuantity('${item.id}', '${item.variant || ''}', 1)">+</button>
        </div>
      </td>
      <td><strong>$${itemTotal.toFixed(2)}</strong></td>
      <td>
        <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5;" onclick="removeFromCart('${item.id}', '${item.variant || ''}')">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartPage();

  // Handle "Add to cart" forms or buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price') || '0');
      const image = btn.getAttribute('data-image');
      
      const variantSelect = document.getElementById('variant-select');
      const variant = variantSelect ? variantSelect.value : '';
      
      const qtyInput = document.getElementById('quantity-input');
      const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

      addToCart({ id, title, price, image, variant, quantity });
    });
  });

  const checkoutBtn = document.getElementById('checkout-button');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert("Checkout demo: Connect your Stripe Checkout, PayPal, or merchant account here to process payments online!");
    });
  }
});
