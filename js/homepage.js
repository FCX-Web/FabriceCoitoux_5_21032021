//===================================================================
//variables

let basketTotalItems = Number(localStorage.getItem("basketItems"));
// let basketTotalItems = 0;

//====================================================================
//panier

if (basketTotalItems !== 0) {
    document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<a class="nav-link" href="./html/basket.html"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-danger">' + basketTotalItems + '</span></a>');
} else {
    document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<a class="nav-link" href="./html/basket.html"><i class="fas fa-shopping-basket mr-1"></i>Panier<span class="badge bg-secondary">(vide)</span></a>');
}

// document.getElementById('test').insertAdjacentHTML('beforebegin', '<h2>' + basketTotalItems + '</h2');

//====================================================================
//catégories

for (let i = 0; i < urlList.length; i++) {
    getDatas(urlList[i], groupList[i]).then((response) => {

        document.getElementById("category").insertAdjacentHTML('beforeend', '<div class="col"> <div class="card h-100"><div class="card-body"><h3 id="category_title" class="card-title text-center text-capitalize">' + groupList[i] + '</h3></div><img id="category_img" src="' + response[1].imageUrl + '" alt="' + response[1].name + '" class="card-img-top img-thumbnail"><div class="card-footer text-center"><a id="category_a" href="' + '#' + groupList[i] + "List" + '" class="btn btn-light stretched-link"><h4 class="font-weight-bold">Consulter</h4></a></div></div></div>');
    });
}

//====================================================================
//Catalogue

function buildCatalogue(url, group) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (elt of response) {
                document.getElementById(group).insertAdjacentHTML("beforeend", '<div class="col-6-md card mb-3 mx-1" style="max-width: 550px;"><div class="row g-0"><div class="col-md-6"><img src="' + elt.imageUrl + '" class="d-block w-100 img-thumbnail" alt="..."></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' + elt.name + '</h5><p class="card-text">' + elt.price + ' €</p><a href="./html/product.html" class="btn btn-primary stretched-link">En savoir +</a></div></div></div></div>');
            }
        }
    };
    request.open("GET", url);
    request.send();
}

// for (let i = 0; i < urlList.length; i++) {
//     document.getElementById("catalogue").insertAdjacentHTML("beforeend", '<h3 id="' + groupList[i] + "List" + '" class="font-weight-bold font-italic mt-5 mb-3 text-capitalize">' + groupList[i] + '</h3><div id="' + groupList[i] + '" class="row justify-content-around">');

//     buildCatalogue(urlList[i], groupList[i]);

//     document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '</div>');
// }

for (let i = 0; i < urlList.length; i++) {
    getDatas(urlList[i], groupList[i]).then((response) => {

        document.getElementById("catalogue").insertAdjacentHTML("beforeend", '<h3 id="' + groupList[i] + "List" + '" class="font-weight-bold font-italic mt-5 mb-3 text-capitalize">' + groupList[i] + '</h3><div id="' + groupList[i] + '" class="row justify-content-around">');

        // buildCatalogue(urlList[i], groupList[i]);

        for (elt of response) {
            document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '<div class="col-6-md card mb-3 mx-1" style="max-width: 550px;"><div class="row g-0"><div class="col-md-6"><img src="' + elt.imageUrl + '" class="d-block w-100 img-thumbnail" alt="..."></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' + elt.name + '</h5><p class="card-text">' + elt.price + ' €</p><a href="./html/product.html" class="btn btn-primary stretched-link">En savoir +</a></div></div></div></div>');
        }

        document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '</div>');

    });
}


//==================================================================