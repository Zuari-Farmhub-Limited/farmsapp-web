document.addEventListener("DOMContentLoaded", function () {
    const productData = JSON.parse(localStorage.getItem("selectedProduct"));

    if (productData) {
        document.getElementById("page-title").textContent = productData.productName;
        document.querySelector("meta[name='description']").setAttribute("content", productData.cleanDescription);
        document.getElementById("product-name").textContent = productData.productName; // 🔹 Updated
        document.getElementById("product-price").textContent = productData.priceRange;
        document.getElementById("product-description").textContent = productData.cleanDescription;
        
        const productImage = document.getElementById("product-image");
        productImage.src = productData.imageUrl;
        productImage.alt = productData.productName;  // Improve SEO accessibility
    } else {
        document.querySelector("main").innerHTML = "<h2>Product not found</h2>";
    }
});
