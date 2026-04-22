// --- INITIALIZE STORAGE ---
const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

let cart = getStorage('xeroid_cart');
let wishlist = getStorage('xeroid_wishlist');
let allProducts = []; // This gets filled by the fetch on each page

// --- SYNC UI ---
function updateBadges() {
    const c = document.getElementById('cart-count');
    const w = document.getElementById('wishlist-count');
    if (c) c.innerText = cart.length;
    if (w) w.innerText = wishlist.length;
}

// --- GLOBAL ACTIONS ---
window.actionWish = (id) => {
    const item = allProducts.find(p => p.id == id);
    if (!item) return;

    const idx = wishlist.findIndex(p => p.id == id);
    if (idx === -1) {
        wishlist.push(item);
    } else {
        wishlist.splice(idx, 1);
    }
    
    setStorage('xeroid_wishlist', wishlist);
    updateBadges();

    // Update heart icons on screen if they exist
    const hearts = document.querySelectorAll(`[data-id="${id}"] .fa-heart`);
    hearts.forEach(h => {
        h.classList.toggle('text-red-500');
        h.classList.toggle('text-slate-300');
    });
};

window.actionCart = (id) => {
    const item = allProducts.find(p => p.id == id);
    if (!item) return;

    if (!cart.some(p => p.id == id)) {
        cart.push(item);
        setStorage('xeroid_cart', cart);
        updateBadges();
        alert("Xeroid, item added to cart!");
    } else {
        alert("Already in cart!");
    }
};

document.addEventListener('DOMContentLoaded', updateBadges);
