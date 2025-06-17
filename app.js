$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('gamestore-cart')) || [];
    let currentFilter = 'all';
    let isDarkMode = localStorage.getItem('gamestore-theme') === 'dark';

    initApp();

    function initApp() {
        loadTheme();
        displayGamesByCategory();
        updateCartUI();
        bindEvents();
        showWelcomeAnimation();
    }


    function loadTheme() {
        if (isDarkMode) {
            $('body').addClass('dark-mode');
            $('#themeToggle i').removeClass('fa-gamepad').addClass('fa-sun');
        }
    }

    function showWelcomeAnimation() {
        $('.fade-in').each(function(index) {
            $(this).css({
                opacity: 0,
                transform: 'translateY(20px)'
            }).delay(index * 200).animate({
                opacity: 1
            }, 800).animate({
                transform: 'translateY(0px)'
            }, 600);
        });
    }


    function bindEvents() {
        $('#themeToggle').on('click', toggleTheme);
        $('#searchInput').on('input', handleSearch);
        $('.filter-btn').on('click', handlePlatformFilter);
        $('#cartToggle').on('click', openCart);
        $('#closeCart, #cartOverlay').on('click', closeCart);
        $('#confirmOrder').on('click', showOrderConfirmation);
        $('#clearCart').on('click', clearCart);
        $('#finalConfirm').on('click', finalizeOrder);

        $('#contactForm').on('submit', handleContactForm);
        $('#contactName, #contactEmail, #contactMessage').on('blur', validateField);

        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });

        $(document).on('mouseenter', '.game-card', function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        }).on('mouseleave', '.game-card', function() {
            $(this).find('img').css('transform', 'scale(1)');
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCart();
                $('#confirmModal').modal('hide');
            }
        });
    }

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        $('body').toggleClass('dark-mode');
        
        const icon = $('#themeToggle i');
        if (isDarkMode) {
            icon.removeClass('fa-gamepad').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-gamepad');
        }

        localStorage.setItem('gamestore-theme', isDarkMode ? 'dark' : 'light');
        
        $('#themeToggle').addClass('animate__animated animate__rotate');
        setTimeout(() => {
            $('#themeToggle').removeClass('animate__animated animate__rotate');
        }, 500);
    }

    function displayGamesByCategory() {
        const container = $('#gamesContainer');
        container.empty();


        const latestGames = getGamesByCategory('latest');
        container.append(createCategorySection('🚀 Últimos Lanzamientos 2024', latestGames));


        const lastYearGames = getGamesByCategory('lastyear');
        container.append(createCategorySection('🎯 Lanzamientos 2023', lastYearGames));


        const popularGames = getGamesByCategory('popular');
        container.append(createCategorySection('🔥 Más Populares', popularGames));


        $('.game-card').css({opacity: 0, transform: 'translateY(20px)'});
        $('.game-card').each(function(index) {
            $(this).delay(index * 100).animate({
                opacity: 1
            }, 500).animate({
                transform: 'translateY(0)'
            }, 400);
        });
    }

    function createCategorySection(title, games) {
        let html = `
            <div class="col-12 mb-4">
                <h2 class="text-white text-center mb-4 category-title">
                    <i class="fas fa-star me-2"></i>${title}
                </h2>
                <div class="row">
        `;

        games.slice(0, 6).forEach(game => {
            html += createGameCard(game);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    function createGameCard(game) {
        const discountHtml = game.discount > 0 ? 
            `<span class="discount-badge">-${game.discount}%</span>` : '';
        
        const originalPriceHtml = game.originalPrice > game.price ? 
            `<span class="original-price">$${game.originalPrice}</span>` : '';

        const platformBadges = game.platforms.map(platform => 
            `<span class="platform-badge">${getPlatformIcon(platform)} ${getPlatformName(platform)}</span>`
        ).join('');

        const genreTags = game.genres.map(genre => 
            `<span class="genre-tag">${genre}</span>`
        ).join('');

        const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));

        const priceDisplay = game.price === 0 ? 
            '<span class="price-tag">GRATIS</span>' : 
            `<span class="price-tag">$${game.price}</span>`;

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card game-card h-100" data-game-id="${game.id}">
                    ${discountHtml}
                    <img src="${game.image}" class="card-img-top" alt="${game.title}" loading="lazy">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text flex-grow-1">${game.description}</p>
                        <div class="mb-2">
                            <div class="rating-stars">${stars} (${game.rating})</div>
                        </div>
                        <div class="mb-2">
                            ${platformBadges}
                        </div>
                        <div class="mb-3">
                            ${genreTags}
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                ${originalPriceHtml}
                                ${priceDisplay}
                            </div>
                            <button class="btn btn-primary add-to-cart-btn" data-game-id="${game.id}">
                                <i class="fas fa-cart-plus me-1"></i>
                                ${game.price === 0 ? 'Descargar' : 'Comprar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function getPlatformIcon(platform) {
        const icons = {
            pc: '<i class="fas fa-desktop"></i>',
            playstation: '<i class="fab fa-playstation"></i>',
            xbox: '<i class="fab fa-xbox"></i>',
            nintendo: '<i class="fas fa-gamepad"></i>',
            mobile: '<i class="fas fa-mobile-alt"></i>'
        };
        return icons[platform] || '<i class="fas fa-gamepad"></i>';
    }

    function getPlatformName(platform) {
        const names = {
            pc: 'PC',
            playstation: 'PlayStation',
            xbox: 'Xbox',
            nintendo: 'Nintendo',
            mobile: 'Móvil'
        };
        return names[platform] || platform;
    }

    function handlePlatformFilter(e) {
        e.preventDefault();
        $('.filter-btn').removeClass('active').attr('aria-pressed', 'false');
        $(this).addClass('active').attr('aria-pressed', 'true');

        currentFilter = $(this).data('category');

        if (currentFilter === 'all') {
            displayGamesByCategory();
        } else {
            displayGamesByPlatform(currentFilter);
        }

        $('#gamesContainer').fadeOut(200, function() {
            $(this).fadeIn(400);
        });
    }

    function displayGamesByPlatform(platform) {
        const games = getGamesByPlatform(platform);
        const container = $('#gamesContainer');
        
        container.empty();
        
        const platformName = getPlatformName(platform);
        const platformIcon = getPlatformIcon(platform);
        
        let html = `
            <div class="col-12 mb-4">
                <h2 class="text-white text-center mb-4">
                    ${platformIcon} Juegos para ${platformName}
                </h2>
                <div class="row">
        `;

        games.forEach(game => {
            html += createGameCard(game);
        });

        html += `
                </div>
            </div>
        `;

        container.html(html);

        $('.game-card').css({opacity: 0, transform: 'scale(0.8)'});
        $('.game-card').each(function(index) {
            $(this).delay(index * 50).animate({
                opacity: 1
            }, 300).animate({
                transform: 'scale(1)'
            }, 300);
        });
    }

    function handleSearch() {
        const query = $(this).val().trim();
        
        if (query.length === 0) {
            if (currentFilter === 'all') {
                displayGamesByCategory();
            } else {
                displayGamesByPlatform(currentFilter);
            }
            return;
        }

        if (query.length < 2) return;

        const results = searchGames(query);
        displaySearchResults(results, query);
    }

    function displaySearchResults(games, query) {
        const container = $('#gamesContainer');
        container.empty();

        let html = `
            <div class="col-12 mb-4">
                <h2 class="text-white text-center mb-4">
                    <i class="fas fa-search me-2"></i>
                    Resultados para "${query}" (${games.length})
                </h2>
        `;

        if (games.length === 0) {
            html += `
                <div class="text-center py-5">
                    <i class="fas fa-search text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                    <h3 class="text-muted mt-3">No se encontraron juegos</h3>
                    <p class="text-muted">Intenta con otros términos de búsqueda</p>
                </div>
            `;
        } else {
            html += '<div class="row">';
            games.forEach(game => {
                html += createGameCard(game);
            });
            html += '</div>';
        }

        html += '</div>';
        container.html(html);

        $('.game-card').hide().fadeIn(400);
    }

    $(document).on('click', '.add-to-cart-btn', function(e) {
        e.preventDefault();
        
        const gameId = parseInt($(this).data('game-id'));
        const game = videogames.find(g => g.id === gameId);
        
        if (!game) return;

        addToCart(game);
        
        const $btn = $(this);
        const originalText = $btn.html();
        
        $btn.html('<i class="fas fa-check me-1"></i>¡Agregado!').addClass('btn-success');
        
        setTimeout(() => {
            $btn.html(originalText).removeClass('btn-success');
        }, 1500);

        showToast(`${game.title} agregado al carrito`, 'success');
    });

    function addToCart(game) {
        const existingItem = cart.find(item => item.id === game.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: game.id,
                title: game.title,
                price: game.price,
                image: game.image,
                quantity: 1
            });
        }

        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('gamestore-cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        const cartCounter = $('#cartCounter');
        const cartItems = $('#cartItems');
        const cartSummary = $('#cartSummary');
        const emptyMessage = $('#emptyCartMessage');

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.text(totalItems);

        if (cart.length === 0) {
            emptyMessage.show();
            cartSummary.hide();
            cartItems.html(`
                <div class="text-center py-4" id="emptyCartMessage">
                    <i class="fas fa-shopping-cart empty-cart-icon" aria-hidden="true"></i>
                    <p class="text-muted mt-3">Tu carrito está vacío</p>
                </div>
            `);
        } else {
            emptyMessage.hide();
            cartSummary.show();

            let itemsHtml = '';
            cart.forEach(item => {
                itemsHtml += createCartItem(item);
            });
            cartItems.html(itemsHtml);

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            $('#cartTotal').text(total.toFixed(2));
        }
    }

    function createCartItem(item) {
        return `
            <div class="cart-item mb-3" data-item-id="${item.id}">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.title}</h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-success">$${item.price}</span>
                            <div class="quantity-controls">
                                <button class="btn btn-sm btn-outline-light decrease-qty" data-item-id="${item.id}">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-light increase-qty" data-item-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-item-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    $(document).on('click', '.increase-qty', function() {
        const itemId = parseInt($(this).data('item-id'));
        updateQuantity(itemId, 1);
    });

    $(document).on('click', '.decrease-qty', function() {
        const itemId = parseInt($(this).data('item-id'));
        updateQuantity(itemId, -1);
    });

    $(document).on('click', '.remove-item', function() {
        const itemId = parseInt($(this).data('item-id'));
        removeFromCart(itemId);
    });

    function updateQuantity(itemId, change) {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(itemId);
            } else {
                saveCart();
                updateCartUI();
            }
        }
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        updateCartUI();
        showToast('Juego removido del carrito', 'info');
    }

    function openCart() {
        $('#cartSidebar').addClass('show');
        $('#cartOverlay').show().addClass('show');
        $('body').addClass('cart-open');
    }

    function closeCart() {
        $('#cartSidebar').removeClass('show');
        $('#cartOverlay').removeClass('show').hide();
        $('body').removeClass('cart-open');
    }

    function clearCart() {
        if (cart.length === 0) return;

        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart = [];
            saveCart();
            updateCartUI();
            showToast('Carrito vaciado', 'info');
        }
    }

    function showOrderConfirmation() {
        if (cart.length === 0) {
            showToast('Tu carrito está vacío', 'warning');
            return;
        }

        let summaryHtml = `
            <div class="order-summary">
                <h5 class="mb-3">Resumen de tu pedido:</h5>
        `;

        cart.forEach(item => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            summaryHtml += `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <strong>${item.title}</strong><br>
                        <small class="text-muted">$${item.price} x ${item.quantity}</small>
                    </div>
                    <span class="text-success">$${subtotal}</span>
                </div>
            `;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryHtml += `
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <strong>Total:</strong>
                    <strong class="text-success fs-4">$${total.toFixed(2)}</strong>
                </div>
            </div>
        `;

        $('#orderSummary').html(summaryHtml);
        $('#confirmModal').modal('show');
    }

    function finalizeOrder() {
        $('#finalConfirm').html('<i class="fas fa-spinner fa-spin me-2"></i>Procesando...').prop('disabled', true);

        setTimeout(() => {
            $('#confirmModal').modal('hide');
            showToast('¡Compra realizada exitosamente! Recibirás un email de confirmación.', 'success');
            
            cart = [];
            saveCart();
            updateCartUI();
            closeCart();

            $('#finalConfirm').html('<i class="fas fa-check me-2"></i>Confirmar Compra').prop('disabled', false);
        }, 2000);
    }

    function showToast(message, type = 'info') {
        const toast = $('#gameToast');
        const toastBody = $('#toastMessage');
        
        toast.removeClass('bg-success bg-danger bg-warning bg-info');
        switch(type) {
            case 'success':
                toast.addClass('bg-success text-white');
                break;
            case 'error':
                toast.addClass('bg-danger text-white');
                break;
            case 'warning':
                toast.addClass('bg-warning text-dark');
                break;
            default:
                toast.addClass('bg-info text-white');
        }

        toastBody.text(message);
        
        const bsToast = new bootstrap.Toast(toast[0]);
        bsToast.show();
    }

    function handleContactForm(e) {
        e.preventDefault();
        
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const message = $('#contactMessage').val().trim();

        let isValid = true;
        
        if (!validateField.call($('#contactName')[0])) isValid = false;
        if (!validateField.call($('#contactEmail')[0])) isValid = false;
        if (!validateField.call($('#contactMessage')[0])) isValid = false;

        if (!isValid) return;

        const submitBtn = $('#contactForm button[type="submit"]');
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Enviando...').prop('disabled', true);

        setTimeout(() => {
            $('#contactSuccess').show();
            $('#contactForm')[0].reset();
            submitBtn.html('<i class="fas fa-paper-plane me-2"></i>Enviar Mensaje').prop('disabled', false);
            
            setTimeout(() => {
                $('#contactSuccess').hide();
            }, 5000);

            showToast('Mensaje enviado correctamente', 'success');
        }, 1500);
    }

    function validateField() {
        const field = $(this);
        const value = field.val().trim();
        const fieldId = field.attr('id');
        const errorElement = $(`#${fieldId.replace('contact', '').toLowerCase()}Error`);

        let isValid = true;

        if (fieldId === 'contactName') {
            isValid = value.length >= 2;
        } else if (fieldId === 'contactEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (fieldId === 'contactMessage') {
            isValid = value.length >= 10;
        }

        if (isValid) {
            field.removeClass('is-invalid');
            errorElement.hide();
        } else {
            field.addClass('is-invalid');
            errorElement.show();
        }

        return isValid;
    }

    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const navbar = $('.navbar');
        
        if (scrolled > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        $(document).on('DOMNodeInserted', function(e) {
            const newImages = $(e.target).find('img[data-src]');
            newImages.each(function() {
                imageObserver.observe(this);
            });
        });
    }
});