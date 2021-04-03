//====================================================================
//panier

if (basketTotalItems !== 0) {
    document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<a class="nav-link" href="../html/basket.html"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-danger">' + basketTotalItems + '</span></a>');
} else {
    document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<a class="nav-link" href="../html/basket.html"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-secondary">(vide)</span></a>');
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);