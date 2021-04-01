//===================================================================
//variables

let urlList = ["http://localhost:3000/api/teddies", "http://localhost:3000/api/cameras", "http://localhost:3000/api/furniture"];

let groupList = ["peluches", "photo", "meubles"];

//====================================================================
//panier

//====================================================================
//catégories

function buildCategory(url, group) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('category').insertAdjacentHTML("afterbegin", '<div class="col"><div class="card h-100"><div class="card-body"><h3 id="category_title" class="card-title text-center text-capitalize">' + group + '</h3></div><img id="category_img" src="' + response[1].imageUrl + '" class="card-img-top img-thumbnail" alt="..."><div class="card-footer text-center"><a href="#' + group + '"class="btn btn-light stretched-link"><h4 class="font-weight-bold"">Consulter</h4></a></div></div></div> ');
        }
    };
    request.open("GET", url);
    request.send();
}

for (let i = 0; i < urlList.length; i++) {
    buildCategory(urlList[i], groupList[i]);
}

//====================================================================
//Catalogue

function buildCatalogue(url, group) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (elt of response) {
                document.getElementById(group).insertAdjacentHTML("beforeend", '<div class="card mb-3" style="max-width: 550px;"><div class="row g-0"><div class="col-md-6"><img src="' + elt.imageUrl + '" class="d-block w-100 img-thumbnail" alt="..."></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' + elt.name + '</h5><p class="card-text">' + elt.price + ' €</p><a href="./html/product.html" class="btn btn-primary stretched-link">En savoir +</a></div></div></div></div>');
            }
        }
    };
    request.open("GET", url);
    request.send();
}

for (let i = 0; i < urlList.length; i++) {
    document.getElementById("catalogue").insertAdjacentHTML("beforeend", '<h3 id="' + groupList[i] + '" class="font-weight-bold font-italic mt-5 mb-3 text-capitalize">' + groupList[i] + '</h3> <div class="d-flex justify-content-around flex-wrap" >');

    buildCatalogue(urlList[i], groupList[i]);

    document.getElementById(groupList[i]).insertAdjacentHTML("beforeend", '</div>');
}

//==================================================================