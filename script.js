const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

let cart = getStorage('xeroid_cart');
let wishlist = getStorage('xeroid_wishlist');
let allProducts = [];

function showToast(message, icon = "info") {
    const snack = document.getElementById("snackbar");
    const snackText = document.getElementById("snackText");
    const snackIcon = document.getElementById("snackIcon");
    
    if(!snack) return;
    
    snackText.innerText = message;
    snackIcon.innerText = icon;
    snack.className = "show";
    setTimeout(() => { snack.className = ""; }, 3000);
}

function updateBadges() {
    const c = document.getElementById('cart-count');
    const w = document.getElementById('wishlist-count');
    if (c) c.classList.toggle('hidden', cart.length === 0);
    if (w) w.classList.toggle('hidden', wishlist.length === 0);
}

window.actionWish = (id) => {
    const item = allProducts.find(p => p.id == id) || wishlist.find(p => p.id == id);
    if (!item) return;

    const idx = wishlist.findIndex(p => p.id == id);
    if (idx === -1) {
        wishlist.push(item);
        showToast("Added to Saved Items", "favorite");
    } else {
        wishlist.splice(idx, 1);
        showToast("Removed from Saved Items", "heart_broken");
    }
    
    setStorage('xeroid_wishlist', wishlist);
    updateBadges();
    
    // Refresh UI if it exists
    if(typeof render === "function") render(allProducts); 
    else if (window.location.pathname.includes('wishlist.html')) location.reload();
};

window.actionCart = (id) => {
    const item = allProducts.find(p => p.id == id) || wishlist.find(p => p.id == id);
    if (!item) return;

    if (!cart.some(p => p.id == id)) {
        cart.push(item);
        setStorage('xeroid_cart', cart);
        updateBadges();
        showToast("Item added to cart", "shopping_bag");
    } else {
        showToast("Already in your cart", "error");
    }
};

document.addEventListener('DOMContentLoaded', updateBadges);
