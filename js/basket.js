//====================================================================
/*basket management*/

/*function*/

//update of the total amount of the basket
let totalAmount = () => {
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
    let idList = Object.keys(basketDatas);

    let numberOfItems = 0;
    for (let i = 0; i < idList.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case idList[i]:
                            numberOfItems += elt.price * parseInt(basketDatas[idList[i]].itemQuantity, 10);
                            break;
                    };
                };
                document.getElementById("totalAmount").innerHTML = numberOfItems / 100;
            });
        };
    };
};

//change of basket quantities
let changeItemQuantity = (price, i, quantity) => {
    let numberOfItems = JSON.parse(localStorage.getItem("basketLevel"));

    numberOfItems = numberOfItems - basketDatas[idList[i]].itemQuantity + quantity;
    basketDatas[idList[i]].itemQuantity = quantity;
    document.getElementById("quantity-" + i).setAttribute("value", quantity);
    document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * basketDatas[idList[i]].itemQuantity) / 100 + " €";

    localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
    localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));

    if (!numberOfItems) {
        basketEmpty();
        basketUpDate();
    } else {
        totalAmount();
        basketUpDate();
    }
}

//deletion of an article
let removeItem = (i) => {
    basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
    idList = Object.keys(basketDatas);

    if (window.confirm("Confirmez-vous la suppression de cet article ?", "", "")) {
        document.getElementById("item-" + i).remove();
        delete basketDatas[idList[i]];
        idList = Object.keys(basketDatas);
        localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
        let numberOfItems = 0;
        for (let i = 0; i < idList.length; i++) {
            numberOfItems += parseInt(basketDatas[idList[i]].itemQuantity, 10);
        }
        localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));
        if (numberOfItems === 0) {
            basketEmpty();
            basketUpDate();
        } else {
            totalAmount();
            basketUpDate();
        }
    }
}

//list of basket items
let showBasket = () => {
    let basketTotalItems = 0;
    for (let i = 0; i < idList.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case idList[i]:
                            document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketDatas[idList[i]].itemChoiceOption + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '" class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketDatas[idList[i]].itemQuantity + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketDatas[idList[i]].itemQuantity) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

                            document.getElementById("quantity-" + i).addEventListener("change", () => {
                                changeItemQuantity(document.getElementById("eltPrice-" + i).innerHTML * 100, i, document.getElementById("quantity-" + i).value);
                            });

                            document.getElementById(i).addEventListener("click", () => {
                                removeItem(document.getElementById(i).id);
                            });

                            break;
                    };
                }
            });
        }
    };
};

//alert empty basket
let basketEmpty = () => {
    document.getElementById("basketsection").innerHTML = '<div class="container"> <h2 class="d-flex justify-content-lg-center mb-5">Votre panier est vide</h2> <div class="d-flex justify-content-center mb-5"> <a href="../index.html"  class="btn btn-primary mr-3">Continuer mes achats</a> </div> </div>';
};

//order validation form
let command = () => {
    document.getElementById("basketsection").innerHTML = '<div class="container mb-5"> <h2 class="mb-5">Vos Coordonnées</h2> <form> <div class="form-row"> <div class="col-md-4 mb-3"> <label for="prenom">Prénom</label> <input type="text" class="form-control" id="prenom" placeholder="Prénom" required> </div> <div class="col-md-4 mb-3"> <label for="nom">Nom</label> <input type="text" class="form-control" id="nom" placeholder="Nom" required> </div> </div> <div class="form-row"> <div class="col-md-6 mb-3"> <label for="prenom">Adresse</label> <input type="text" class="form-control" id="adresse" placeholder="Adresse" required> </div> <div class = "col-md-6 mb-3" > <label for="prenom">Complément d\'adresse</label> <input type = "text" class="form-control" id="adresse" placeholder="Complément d\'adresse" > </div> </div > <div class="form-row"> <div class="col-md-3 mb-3"> <label for="cp">Code postal</label> <input type="number" class="form-control" id="cp" placeholder="Code postal" required> </div> <div class="col-md-6 mb-3"> <label for="ville">Ville</label> <input type="text" class="form-control" id="ville" placeholder="Ville" required> </div> <div class="col-md-3 mb-3" > <label for="pays" >Pays</label> <input type="text" class="form-control" id="pays" placeholder="Pays" required > </div> <div> <div class="form-row" > <div class="col-md-4 mb-3" > <label for="email" >email</label> <input type="email" class="form-control" id="email" placeholder="email" required > </div> <div class="col-md-4 mb-3" > <label for="tel" >Téléphone mobile ou fixe</label> <input type="tel" class="form-control" id="tel" placeholder="Téléphone" required > </div> </div> <div class="form-group mt-3" > <div class="form-check" > <input class="form-check-input" type="checkbox" value="" id="cgu" required > <label class="form-check-label" for="cgu" >J\'accepte les conditions générales d\'utilisation et de vente</label> <div class="invalid-feedback" >Vous devez accepter les CGU pour continuer </div> </div > </div> <a href="./purchase.html" class="btn btn-primary" >Envoyer</a> </form>';
};

/*main*/

let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
let basketTotalItems = JSON.parse(localStorage.getItem("basketLevel"));
if (basketDatas == null) {
    basketDatas = {};
}
let idList = Object.keys(basketDatas);

basketUpDate();

if (!basketTotalItems) {
    basketEmpty();
} else {
    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<h2 class="d-flex justify-content-lg-center mb-3">Détail de votre commande</h2> <div> <div id="basketCollection">');

    showBasket();
    totalAmount();

    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<div class="row"> <div class="col-12 d-flex mb-5 justify-content-end"> <h3 class="text-danger text-italic mt-3"> <span>Montant total de votre panier: </span> <span id="totalAmount"></span> <span> € </span></h3> </div> </div> </div> <div class="d-flex justify-content-center mb-5"> <a href="../index.html" class="btn btn-primary mr-3">Continuer mes achats</a> <a href="#" id="validation" class="btn btn-success"> Valider ma commande </a> </div> </div>');

    document.getElementById("validation").addEventListener("click", () => {
        command();
    });
}