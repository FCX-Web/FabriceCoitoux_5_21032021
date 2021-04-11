//===================================================================
//variables

// let basket = [];

let urlList = ["http://localhost:3000/api/teddies", "http://localhost:3000/api/cameras", "http://localhost:3000/api/furniture"];

let groupList = ["peluches", "photo", "meubles"];

let customList = { peluches: "colors", photo: "lenses", meubles: "varnish" };

//====================================================================
//panier

let basketHeader = (file) => {
    let basketTotalItems = localStorage.getItem("basketLevel");
    if (basketTotalItems !== 0) {
        document.getElementById('buttonBasket').innerHTML = '<a class="nav-link" href="' + file + '"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-danger">' + basketTotalItems + '</span></a>';
    } else {
        document.getElementById('buttonBasket').innerHTML = '<a class="nav-link" href="' + file + '"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-secondary">(vide)</span></a>';
    }
};

//===================================================================
//requests

function getDatas(url) {
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                const response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        request.open("GET", url);
        request.send();
    })
};