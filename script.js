// Sample products data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Headphones",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Smart+Watch",
        rating: 4.8
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Backpack",
        rating: 4.2
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Speaker",
        rating: 4.6
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 39.99,
        image: "https://via.placeholder.com/300x200/F44336/FFFFFF?text=Mouse",
        rating: 4.3
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 29.99,
        image: "https://via.placeholder.com/300x200/607D8B/FFFFFF?text=USB+Hub",
        rating: 4.1
    }
];

// Cart functionality
let cart = [];
let cartCount = 0;

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load products into the grid
function loadProducts() {
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card product-card h-100';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'card-img-top';

    const overlay = document.createElement('div');
    overlay.className = 'product-overlay';

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', () => addToCart(product));

    overlay.appendChild(addToCartBtn);
    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body product-info';

    const title = document.createElement('h5');
    title.className = 'card-title product-title';
    title.textContent = product.name;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${product.price}`;

    const rating = document.createElement('div');
    rating.className = 'product-rating';
    rating.innerHTML = generateStars(product.rating);

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(rating);

    card.appendChild(imageContainer);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    stars += ` ${rating}`;
    return stars;
}

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    cartCount++;
    updateCartCount();

    // Show success message
    showNotification(`${product.name} added to cart!`);
}

// Update cart count display
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.input-group .btn');
    if (newsletterForm) {
        newsletterForm.addEventListener('click', () => {
            const emailInput = document.querySelector('.input-group input');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

// Initialize cart count
updateCartCount();
