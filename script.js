/* ============================================
   NOIR CLOTHING — E-COMMERCE JAVASCRIPT
   Handles: Cart System, Product Filtering, 
   Product Detail Modal, Toast Notifications
   Storage: Uses localStorage so cart survives page refreshes
   ============================================ */

// ===== PRODUCT CATALOG =====
// All product data with descriptions, materials, etc.
// This makes it easy to add/change products in one place.
const PRODUCTS = {
  1: {
    id: 1,
    name: 'Classic Black Tee',
    price: 29.99,
    image: 'images/product1.png',
    clothingImage: 'images/product1_flat.png',
    category: 'Tops',
    badge: 'New',
    description: 'A wardrobe essential crafted from 100% premium cotton. This classic crew-neck tee features a relaxed fit with a clean silhouette that pairs effortlessly with any look.',
    details: ['100% Premium Cotton', 'Relaxed Fit', 'Crew Neck', 'Pre-shrunk Fabric'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  2: {
    id: 2,
    name: 'Oversized Hoodie',
    price: 59.99,
    image: 'images/product2.png',
    clothingImage: 'images/product2_flat.png',
    category: 'Tops',
    badge: 'Popular',
    description: 'Stay cozy in this oversized hoodie made from a soft cotton-polyester blend. Features a spacious kangaroo pocket and an adjustable drawstring hood for the perfect casual look.',
    details: ['80% Cotton, 20% Polyester', 'Oversized Fit', 'Kangaroo Pocket', 'Drawstring Hood'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  3: {
    id: 3,
    name: 'Slim Fit Jeans',
    price: 49.99,
    image: 'images/product3.png',
    clothingImage: 'images/product3_flat.png',
    category: 'Bottoms',
    badge: '',
    description: 'These slim-fit jeans combine comfort with a modern tailored look. Made with stretch denim for freedom of movement, they feature a classic 5-pocket design and a tapered leg.',
    details: ['98% Cotton, 2% Elastane', 'Slim Fit', '5-Pocket Design', 'Tapered Leg'],
    sizes: ['28', '30', '32', '34', '36']
  },
  4: {
    id: 4,
    name: 'Gray Bomber Jacket',
    price: 79.99,
    image: 'images/product4.png',
    clothingImage: 'images/product4_flat.png',
    category: 'Outerwear',
    badge: 'Best Seller',
    description: 'A modern take on the classic bomber silhouette. This lightweight jacket features ribbed cuffs, a clean zip front, and sleek side pockets — perfect for layering in any season.',
    details: ['Shell: 100% Nylon', 'Ribbed Cuffs & Hem', 'Zip Front Closure', 'Side Zip Pockets'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  5: {
    id: 5,
    name: 'Black Joggers',
    price: 44.99,
    image: 'images/product5.png',
    clothingImage: 'images/product5_flat.png',
    category: 'Bottoms',
    badge: '',
    description: 'Versatile joggers that transition seamlessly from the gym to the street. Crafted with a soft fleece lining and featuring an elastic waistband with drawstring for a custom fit.',
    details: ['French Terry Cotton', 'Elastic Waistband', 'Tapered Ankle Cuffs', 'Side Pockets'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  6: {
    id: 6,
    name: 'White Cap',
    price: 24.99,
    image: 'images/product6.png',
    clothingImage: 'images/product6_flat.png',
    category: 'Accessories',
    badge: '',
    description: 'A clean, minimalist baseball cap that completes any casual outfit. Features a structured crown, curved brim, and an adjustable strap for a perfect fit every time.',
    details: ['100% Cotton Twill', 'Structured Crown', 'Curved Brim', 'Adjustable Back Strap'],
    sizes: ['One Size']
  },
  7: {
    id: 7,
    name: 'Essential White Tee',
    price: 29.99,
    image: 'images/product7.png',
    clothingImage: 'images/product7_flat.png',
    category: 'Tops',
    badge: 'New',
    description: 'The perfect white tee — clean, crisp, and made from premium combed cotton. A slightly heavier weight ensures opacity and durability, wash after wash.',
    details: ['100% Combed Cotton', 'Regular Fit', 'Crew Neck', 'Reinforced Stitching'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  8: {
    id: 8,
    name: 'Black Zip Hoodie',
    price: 64.99,
    image: 'images/product8.png',
    clothingImage: 'images/product8_flat.png',
    category: 'Tops',
    badge: '',
    description: 'A versatile zip-up hoodie in classic black. Features a full metal zipper, split kangaroo pockets, and a soft brushed fleece interior for all-day comfort.',
    details: ['80% Cotton, 20% Polyester', 'Full Zip Front', 'Brushed Fleece Lining', 'Ribbed Cuffs'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  9: {
    id: 9,
    name: 'Gray Crewneck',
    price: 54.99,
    image: 'images/product9.png',
    clothingImage: 'images/product9_flat.png',
    category: 'Tops',
    badge: 'Trending',
    description: 'An elevated crewneck sweatshirt in heather gray. Made from a premium cotton blend with a soft interior, it offers a clean and polished casual look.',
    details: ['85% Cotton, 15% Polyester', 'Regular Fit', 'Ribbed Neckline', 'Soft Interior'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  10: {
    id: 10,
    name: 'Black Shorts',
    price: 34.99,
    image: 'images/product10.png',
    clothingImage: 'images/product10_flat.png',
    category: 'Bottoms',
    badge: '',
    description: 'Lightweight athletic shorts designed for both performance and style. Feature a 7-inch inseam, moisture-wicking fabric, and a comfortable elastic waistband.',
    details: ['92% Polyester, 8% Spandex', '7-inch Inseam', 'Moisture-Wicking', 'Zip Pockets'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  11: {
    id: 11,
    name: 'Black Beanie',
    price: 19.99,
    image: 'images/product11.png',
    clothingImage: 'images/product11_flat.png',
    category: 'Accessories',
    badge: '',
    description: 'A classic knit beanie in pure black. Made from a soft acrylic blend, it offers warmth without bulk and features a fold-over cuff for a timeless look.',
    details: ['100% Acrylic Knit', 'Fold-over Cuff', 'One Size Fits Most', 'Soft & Warm'],
    sizes: ['One Size']
  }
};

// ===== PRODUCT DETAIL MODAL =====
// Opens a beautiful modal when you click on a product card.
let selectedSize = null;
let modalQuantity = 1;

function openProductModal(id) {
  const product = PRODUCTS[id];
  if (!product) return;

  selectedSize = null;
  modalQuantity = 1;
  showingClothingOnly = false;

  // Remove existing modal if any
  const existingModal = document.getElementById('product-modal');
  if (existingModal) existingModal.remove();

  // Build size buttons
  const sizesHTML = product.sizes.map(size => `
    <button class="size-btn" onclick="selectSize('${size}', this)">${size}</button>
  `).join('');

  // Build details list
  const detailsHTML = product.details.map(d => `<li>${d}</li>`).join('');

  const modalHTML = `
    <div class="modal-overlay" id="product-modal" onclick="closeModal(event)">
      <div class="modal-container">
        <button class="modal-close" onclick="closeProductModal()" aria-label="Close">&times;</button>
        <div class="modal-body">
          <div class="modal-image">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" id="modal-product-img">
            <button class="modal-view-toggle" id="modal-view-btn" onclick="toggleModalImage(${product.id})" title="View clothing only">
              <span class="material-icons-outlined">checkroom</span>
            </button>
          </div>
          <div class="modal-details">
            <span class="modal-category">${product.category}</span>
            <h2 class="modal-title">${product.name}</h2>
            <p class="modal-price">$${product.price.toFixed(2)}</p>
            <p class="modal-description">${product.description}</p>
            
            <div class="modal-section">
              <h4>Size</h4>
              <div class="size-options">${sizesHTML}</div>
            </div>

            <div class="modal-section">
              <h4>Quantity</h4>
              <div class="modal-qty">
                <button onclick="changeModalQty(-1)">−</button>
                <span id="modal-qty-value">1</span>
                <button onclick="changeModalQty(1)">+</button>
              </div>
            </div>

            <button class="modal-add-btn" onclick="addFromModal(${product.id})">
              Add to Cart — $${product.price.toFixed(2)}
            </button>

            <div class="modal-info">
              <h4>Product Details</h4>
              <ul>${detailsHTML}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  // Prevent body scrolling while modal is open
  document.body.style.overflow = 'hidden';
  // Animate in
  requestAnimationFrame(() => {
    document.getElementById('product-modal').classList.add('active');
  });
}

// ===== IMAGE VIEW TOGGLE =====
// Switches between model photo and clothing-only photo in the modal.
let showingClothingOnly = false;

function toggleModalImage(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const img = document.getElementById('modal-product-img');
  const btn = document.getElementById('modal-view-btn');
  const imageContainer = img ? img.closest('.modal-image') : null;
  if (!img || !btn || !imageContainer) return;

  showingClothingOnly = !showingClothingOnly;

  // Smooth transition
  img.style.opacity = '0';
  setTimeout(() => {
    if (showingClothingOnly) {
      img.src = product.clothingImage;
      img.style.objectFit = 'contain';
      imageContainer.classList.add('clothing-view');
      btn.innerHTML = '<span class="material-icons-outlined">person</span>';
      btn.title = 'View with model';
    } else {
      img.src = product.image;
      img.style.objectFit = 'cover';
      imageContainer.classList.remove('clothing-view');
      btn.innerHTML = '<span class="material-icons-outlined">checkroom</span>';
      btn.title = 'View clothing only';
    }
    img.style.opacity = '1';
  }, 200);
}

function closeModal(event) {
  // Only close if clicking the overlay background, not the modal content
  if (event.target.id === 'product-modal') {
    closeProductModal();
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
  }
}

function selectSize(size, btn) {
  selectedSize = size;
  // Remove active from all size buttons
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeModalQty(change) {
  modalQuantity = Math.max(1, modalQuantity + change);
  document.getElementById('modal-qty-value').textContent = modalQuantity;
  // Update the button price
  const product = document.querySelector('.modal-add-btn');
  const priceMatch = product.textContent.match(/\$[\d.]+/);
  if (priceMatch) {
    // Recalculate based on the original product
  }
}

function addFromModal(id) {
  const product = PRODUCTS[id];
  if (!product) return;

  if (product.sizes.length > 1 && !selectedSize) {
    showToast('Please select a size');
    return;
  }

  // Add the item(s) to cart
  for (let i = 0; i < modalQuantity; i++) {
    addToCart(id, product.name, product.price, product.image);
  }

  closeProductModal();
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});

// ===== 1. GET CART FROM LOCAL STORAGE =====
// We store the cart as a JSON string in the browser's localStorage.
// This function reads it and converts it back to a JavaScript array.
function getCart() {
  const cart = localStorage.getItem('cart');
  // If there's nothing in storage, return an empty array
  return cart ? JSON.parse(cart) : [];
}

// ===== 2. SAVE CART TO LOCAL STORAGE =====
// Whenever the cart changes, we save the updated array to localStorage.
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ===== 3. UPDATE THE CART COUNT BADGE =====
// This updates the small number shown on the cart icon in navigation.
// It runs on every page load so the badge is always accurate.
function updateCartCount() {
  const cart = getCart();
  // Add up all item quantities to get the total number of items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Find ALL elements with the class "cart-count" and update them
  const countElements = document.querySelectorAll('.cart-count');
  countElements.forEach(el => {
    el.textContent = totalItems;
  });
}

// ===== 4. ADD ITEM TO CART =====
// Called when the user clicks "Add to Cart" on a product card.
// Parameters: id, name, price, and image path of the product.
function addToCart(id, name, price, image) {
  const cart = getCart();

  // Check if this product is already in the cart
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    // If it exists, just increase the quantity by 1
    existingItem.quantity += 1;
  } else {
    // If it's new, add a new object to the cart array
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  saveCart(cart);       // Save updated cart
  updateCartCount();   // Update the badge number
  showToast(`✓ ${name} added to cart`);  // Show a notification
}

// ===== 5. REMOVE ITEM FROM CART =====
// Removes a product entirely from the cart using its id.
function removeFromCart(id) {
  let cart = getCart();
  // Filter out the item that matches the given id
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  updateCartCount();
  renderCart();  // Re-render the cart page
}

// ===== 6. CHANGE ITEM QUANTITY =====
// Increases or decreases the quantity of an item.
// If quantity drops to 0, the item is removed.
function changeQuantity(id, change) {
  const cart = getCart();
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += change;

    // If quantity goes to 0 or below, remove the item
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }

  saveCart(cart);
  updateCartCount();
  renderCart();
}

// ===== 7. RENDER THE CART PAGE =====
// This function builds the HTML for the cart page dynamically.
// It only runs on the cart.html page (checks for #cart-container).
function renderCart() {
  const cartContainer = document.getElementById('cart-container');

  // If we're not on the cart page, do nothing
  if (!cartContainer) return;

  const cart = getCart();

  // If the cart is empty, show a friendly message with a link to shop
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-dark-filled" style="border-radius: 50px;">Continue Shopping</a>
      </div>
    `;
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Build the HTML string for each cart item
  let itemsHTML = '<div class="cart-items">';

  cart.forEach(item => {
    itemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="qty-controls">
          <button onclick="changeQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">✕</button>
      </div>
    `;
  });

  itemsHTML += '</div>';

  // Add the summary section with subtotal, shipping, and total
  itemsHTML += `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal (${totalItems} item${totalItems > 1 ? 's' : ''})</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
      </div>
      ${subtotal < 75 ? `
        <div class="cart-summary-row" style="color: #555; font-size: 0.78rem;">
          <span>Add $${(75 - subtotal).toFixed(2)} more for free shipping</span>
          <span></span>
        </div>
      ` : ''}
      <div class="cart-summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;

  cartContainer.innerHTML = itemsHTML;
}

// ===== 8. CHECKOUT (Placeholder) =====
// A simple placeholder for the checkout action.
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  showToast('🎉 Thank you for your order!');
  // Clear the cart after "checkout"
  localStorage.removeItem('cart');
  updateCartCount();
  renderCart();
}

// ===== 9. PRODUCT FILTER (Shop Page) =====
// Filters product cards by category when a filter tag button is clicked.
// Each product card has a data-category attribute (e.g. "tops", "bottoms").
function filterProducts(category, clickedButton) {
  const products = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('visible-count');
  let visibleCount = 0;

  // Update active button style
  document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
  clickedButton.classList.add('active');

  // Get the current search term (if any)
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  // Show/hide products based on category AND search
  products.forEach(card => {
    const name = card.querySelector('.product-info h3').textContent.toLowerCase();
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesSearch = searchTerm === '' || name.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update the "X products" counter
  if (countEl) {
    countEl.textContent = visibleCount;
  }
}

// ===== 10. SEARCH PRODUCTS (Shop Page) =====
// Filters product cards by name as the user types in the search bar.
// Works together with category filter — respects both simultaneously.
function searchProducts(query) {
  const products = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('visible-count');
  const searchTerm = query.toLowerCase().trim();
  let visibleCount = 0;

  // Get the currently active category filter
  const activeFilter = document.querySelector('.filter-tag.active');
  const activeCategory = activeFilter ? activeFilter.textContent.toLowerCase() : 'all';

  products.forEach(card => {
    const name = card.querySelector('.product-info h3').textContent.toLowerCase();
    const category = card.dataset.category;

    // Check both search and category filter
    const matchesSearch = name.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (countEl) {
    countEl.textContent = visibleCount;
  }
}

// ===== 10. TOAST NOTIFICATION =====
// Shows a small popup message at the bottom-right of the screen.
// It appears for 2.5 seconds and then disappears smoothly.
function showToast(message) {
  // Check if a toast element already exists
  let toast = document.querySelector('.toast');

  if (!toast) {
    // Create the toast element if it doesn't exist
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;

  // Force browser to reflow before adding .show class (for animation)
  toast.offsetHeight;
  toast.classList.add('show');

  // Hide the toast after 2.5 seconds
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ===== 11. INITIALIZE ON PAGE LOAD =====
// When any page loads, update the cart count badge.
// If we're on the cart page, also render the cart items.
// Also set up the scroll-reveal IntersectionObserver and product card clicks.
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
  initScrollReveal();
  initProductCardClicks();
});

// ===== 12. PRODUCT CARD CLICK DELEGATION =====
// Instead of adding onclick to every product card in the HTML,
// we use event delegation: listen for clicks on the document
// and check if the click was on a product card image or name.
function initProductCardClicks() {
  document.addEventListener('click', (e) => {
    // Check if click was on a product card image area or product name (h3)
    const cardImage = e.target.closest('.product-card-image');
    const cardTitle = e.target.closest('.product-info h3');

    // Don't open modal if they clicked the "Add to Cart" button
    if (e.target.closest('.add-to-cart-btn') || e.target.closest('.quick-add')) return;

    let card = null;
    if (cardImage) {
      card = cardImage.closest('.product-card');
    } else if (cardTitle) {
      card = cardTitle.closest('.product-card');
    }

    if (card) {
      // Extract the product ID from the card's id attribute
      // Cards have id like "product-1" or "hp-product-1"
      const idMatch = card.id.match(/product-(\d+)/);
      if (idMatch) {
        const productId = parseInt(idMatch[1], 10);
        openProductModal(productId);
      }
    }
  });
}

// ===== 13. SCROLL-REVEAL ANIMATION =====
// Uses IntersectionObserver to detect when elements with class "reveal"
// enter the viewport. When they do, the class "visible" is added,
// which triggers the CSS transition (fade in + slide up).
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  // If browser doesn't support IntersectionObserver, show everything
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once it's been revealed (one-time animation)
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Trigger when just 8% of the element is visible
    threshold: 0.08,
    // Animate once element is 80px into the viewport
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
