document.addEventListener('DOMContentLoaded', function () {
    const BACKEND_URL = 'https://kiosk.farm/product-api/';  // Fetch from backend, NOT the external API

    let currentPage = 1;
    let selectedSubcategory = 'all';
    let isLoading = false;

    const productsContainer = document.getElementById('products-container');
    const productsCount = document.getElementById('products-count');
    const loadingIndicator = document.getElementById('loading-indicator');
    const subcategoriesContainer = document.getElementById('subcategories-container');
    const templateElement = document.getElementById('product-card-template');

    let productCardTemplate = templateElement ? templateElement.innerHTML : null;
    if (!productCardTemplate) {
        console.error('Product card template not found!');
        return;
    }

    function formatPriceRange(price) {
        if (!price) return 'Contact for pricing';
        const lowerRange = Math.max(price - 100, 0);
        const upperRange = price + 100;
        return lowerRange === 0
            ? `As low as ${upperRange.toFixed(0)}`
            : `${lowerRange.toFixed(0)} - ${upperRange.toFixed(0)}`;
    }

    function sanitizeDescription(description) {
        return description
            ? description.replace(/https?:\/\/[^\s]+\.(png|jpg|jpeg|gif|svg)/gi, '').trim()
            : '';
    }

    function loadProducts() {
        if (isLoading || !productsContainer) return;
        isLoading = true;

        if (currentPage === 1) {
            productsContainer.innerHTML = '<div class="product-loading"><p>Loading products...</p></div>';
        } else if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }

        fetch(`${BACKEND_URL}/api/products`)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.subcategories) {
                    throw new Error('Unexpected data structure');
                }

                if (currentPage === 1) {
                    loadSubcategories(data.subcategories);
                }
                processProductsData(data.subcategories);
                isLoading = false;
                if (loadingIndicator) {
                    loadingIndicator.classList.add('hidden');
                }
            })
            .catch(error => {
                console.error('API request failed:', error);
                productsContainer.innerHTML = `<div class="api-error"><p>Failed to load products. Try again later.</p></div>`;
                isLoading = false;
                if (loadingIndicator) {
                    loadingIndicator.classList.add('hidden');
                }
            });
    }

    function loadSubcategories(subcategories) {
        if (!subcategoriesContainer) return;

        subcategoriesContainer.innerHTML = '<button class="subcategory-btn active" data-subcategory="all">All Categories</button>';

        subcategories.forEach(subcategory => {
            const button = document.createElement('button');
            button.className = 'subcategory-btn';
            button.setAttribute('data-subcategory', subcategory.id);

            button.innerHTML = subcategory.imageUrl
                ? `<img src="${subcategory.imageUrl}" alt="${subcategory.name}"> ${subcategory.name}`
                : subcategory.name;

            subcategoriesContainer.appendChild(button);
        });

        document.querySelectorAll('.subcategory-btn').forEach(button => {
            button.addEventListener('click', function () {
                document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                selectedSubcategory = this.getAttribute('data-subcategory');
                currentPage = 1;
                filterProducts();
            });
        });
    }

    function processProductsData(subcategories) {
        if (currentPage === 1) {
            productsContainer.innerHTML = '';
        }

        let allSkus = [];

        subcategories.forEach(subcategory => {
            if (subcategory.products && Array.isArray(subcategory.products)) {
                subcategory.products.forEach(product => {
                    if (product.skus && Array.isArray(product.skus)) {
                        product.skus.forEach(sku => {
                            allSkus.push({
                                sku,
                                product,
                                subcategory
                            });
                        });
                    }
                });
            }
        });

        if (productsCount) {
            productsCount.textContent = `Showing ${allSkus.length} products`;
        }

        productsContainer.setAttribute('data-all-skus', JSON.stringify(allSkus));
        filterProducts();
    }

    function filterProducts() {
        if (!productsContainer) return;

        const allSkus = JSON.parse(productsContainer.getAttribute('data-all-skus') || '[]');
        productsContainer.innerHTML = '';

        const filteredSkus = selectedSubcategory === 'all'
            ? allSkus
            : allSkus.filter(item => item.subcategory.id.toString() === selectedSubcategory.toString());

        if (productsCount) {
            productsCount.textContent = `Showing ${filteredSkus.length} products`;
        }

        if (filteredSkus.length === 0) {
            productsContainer.innerHTML = '<div class="no-products"><p>No products found in this category.</p></div>';
            return;
        }

        filteredSkus.forEach(item => displaySku(item.product, item.sku, item.subcategory));
    }

    function displaySku(product, sku, subcategory) {
        // Format: Product Name - SKU Size SKU Unit
        const displayName = `${product.productName} - ${sku.skuSize} ${sku.skuUnit}`;
    
        const priceRange = formatPriceRange(sku.netPrice);
        const imageUrl = sku.skuImageUrl || product.productImageUrl || './images/product-placeholder.png';
        const cleanDescription = sanitizeDescription(product.productDesc || '');
        const productNameSlug = displayName.toLowerCase().replace(/\s+/g, '-'); // SEO-friendly URL
    
        let productCard = productCardTemplate
            .replace(/{product-id}/g, product.productId)
            .replace(/{sku-id}/g, sku.skuId)
            .replace(/{product-image}/g, imageUrl)
            .replace(/{product-name}/g, displayName)  // ✅ Using displayName instead of product.productName
            .replace(/{product-category}/g, subcategory.name)
            .replace(/{product-description}/g, cleanDescription)
            .replace(/{price-range}/g, priceRange);
    
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = productCard;
        
        tempDiv.firstElementChild.addEventListener('click', function () {
            localStorage.setItem('selectedProduct', JSON.stringify({ 
                productName: displayName, // ✅ Using displayName instead of product.productName
                priceRange,
                imageUrl,  
                cleanDescription
            }));
            window.open(window.location.origin + `/pages/product_description.html?name=${productNameSlug}`, '_blank'); 
        });
    
        productsContainer.appendChild(tempDiv.firstElementChild);
    }
    

    loadProducts();
});
