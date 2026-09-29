const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

let cart = getStorage('xeroid_cart');
let wishlist = getStorage('xeroid_wishlist');
let allProducts = [];

function showToast(message, icon = "info") {
    const snack = document.getElementById("snackbar");
    const snackText = document.getElementById("snackText");
    const snackIcon = document.getElementById("snackIcon");
    
    if (!snack) return;
    
    snackText.innerText = message;
    snackIcon.innerText = icon;
    
    gsap.fromTo(snack, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
    
    snack.className = "show";
    setTimeout(() => { snack.className = ""; }, 3000);
}

function updateBadges() {
    const c = document.getElementById('cart-count');
    const w = document.getElementById('wishlist-count');
    if (c) c.classList.toggle('hidden', cart.length === 0);
    if (w) w.classList.toggle('hidden', wishlist.length === 0);
}

window.actionWish = (id, event) => {
    if (event) event.stopPropagation();
    const item = allProducts.find(p => p.id == id) || wishlist.find(p => p.id == id);
    if (!item) return;

    const idx = wishlist.findIndex(p => p.id == id);
    if (idx === -1) {
        wishlist.push(item);
        showToast("Saved to collection", "bookmark_added");
    } else {
        wishlist.splice(idx, 1);
        showToast("Removed from collection", "bookmark_remove");
    }
    
    setStorage('xeroid_wishlist', wishlist);
    updateBadges();
    
    if (typeof render === "function") render(allProducts); 
    else if (window.location.pathname.includes('wishlist.html')) location.reload();
};

window.actionCart = (id, event) => {
    if (event) event.stopPropagation();
    const item = allProducts.find(p => p.id == id) || wishlist.find(p => p.id == id);
    if (!item) return;

    if (!cart.some(p => p.id == id)) {
        cart.push(item);
        setStorage('xeroid_cart', cart);
        updateBadges();
        showToast("Added to bag", "shopping_bag");
    } else {
        showToast("Already in bag", "info");
    }
};

document.addEventListener('DOMContentLoaded', updateBadges);
