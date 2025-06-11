document.addEventListener('DOMContentLoaded', () => {

    // ================= Navbar Toggle for Mobile =================
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerToggle && mainNav) {
        hamburgerToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // ================= Product Data (UPDATED IMAGE) =================
    const products = [
        {
            name: "Wireless Headphones",
            price: 1299,
            originalPrice: 1499,
            img: "sony-wh-ult900n-ult-wear-active-noise-canceling-wireless-headphones-black-43213131645183.webp",
            category: "Electronics"
        },
        {
            name: "Smart Watch",
            price: 1999,
            originalPrice: 2499,
            img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Electronics"
        },
        {
            name: "Modern Sofa",
            price: 8999 ,
            originalPrice: 10999,
            img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Home Decor"
        },
        {
            name: "Running Shoes",
            price: 899,
            originalPrice: 1099,
            img: "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Sports"
        },
        {
            name: "Classic Novel",
            price: 299,
            originalPrice: 499,
            img: "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Books"
        },
        {
            name: "Designer Dress",
            price: 2499,
            originalPrice: 3999,
            img: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Fashion"
        },
        {
            name: "Aroma Diffuser",
            price: 399,
            originalPrice: 499,
            img: "Redolance Electric Aroma Oil Diffuser.jpg",
            category: "Home Decor"
        },
        {
            name: "Lipstick Set",
            price: 2999,
            originalPrice: 3599,
            img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600",
            category: "Beauty"
        }
    ];

    // ================= Dynamic Product Rendering =================
    const productsGrid = document.getElementById('productsGrid');

    function renderProducts(filter = "") {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        const lowerCaseFilter = filter.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseFilter) ||
            product.category.toLowerCase().includes(lowerCaseFilter)
        );

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p class="no-products-found">No products found.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/eee/ccc?text=Image+Not+Found';">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">
                        ₹${product.price.toFixed(2)}
                        <span class="original-price">₹${product.originalPrice.toFixed(2)}</span>
                    </p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Initial render of all products
    renderProducts();

    // ================= Search Functionality =================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            renderProducts(searchInput.value);
        });

        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                renderProducts(searchInput.value);
            }
        });
    }

    // ================= Customer Reviews Slider =================
    const slider = document.getElementById('reviews-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (slider && prevBtn && nextBtn) {
        const scrollStep = () => {
            const reviewCard = slider.querySelector('.review-card');
            if (!reviewCard) return 300; 
            const cardStyle = window.getComputedStyle(reviewCard);
            const cardMargin = parseFloat(cardStyle.marginRight);
            return reviewCard.offsetWidth + (cardMargin || 30);
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollStep(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
        });
    }

    // ================= Countdown Timer =================
    const countdownTimer = document.getElementById('countdown-timer');
    if (countdownTimer) {
        const offerEndDate = new Date();
        offerEndDate.setDate(offerEndDate.getDate() + 5);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = offerEndDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                countdownTimer.innerHTML = '<div class="offer-expired">Offer Expired!</div>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    // ================= FAQ Accordion =================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (questionButton && answer) {
                questionButton.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    faqItems.forEach(otherItem => {
                        if(otherItem !== item) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        }
                    });

                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        item.classList.remove('active');
                        answer.style.maxHeight = null;
                    }
                });
            }
        });
    }
});
