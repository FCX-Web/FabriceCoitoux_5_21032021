//====================================================================
/*basket management*/


//=======================================================================
/* basketStorage as array of object*/

/*function*/

//update of the total amount of the basket
let totalAmount = () => {
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
    let amount = 0;
    for (let i = 0; i < basketDatas.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (basketDatas[i].itemId) {
                        case elt._id:
                            amount += elt.price * parseInt(basketDatas[i].itemQuantity, 10);
                            break;
                    };
                };
                document.getElementById("totalAmount").innerHTML = amount / 100;
                localStorage.setItem("amountStorage", JSON.stringify(amount));
            });
        };
    };
};

//change of basket quantities
let changeItemQuantity = (price, i, quantity) => {
    let numberOfItems = JSON.parse(localStorage.getItem("basketLevel"));
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));

    numberOfItems = parseInt(numberOfItems, 10) - parseInt(basketDatas[i].itemQuantity, 10) + parseInt(quantity, 10);
    basketDatas[i].itemQuantity = parseInt(quantity, 10);
    document.getElementById("quantity-" + i).setAttribute("value", parseInt(quantity, 10));
    document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * parseInt(quantity, 10)) / 100 + " €";

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

    if (window.confirm("Confirmez-vous la suppression de cet article ?", "", "")) {
        document.getElementById("item-" + i).remove();
        basketDatas.splice(i, 1);
        localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
        let numberOfItems = 0;
        for (let k = 0; k < basketDatas.length; k++) {
            numberOfItems += parseInt(basketDatas[k].itemQuantity, 10);
        }
        localStorage.setItem("basketLevel", JSON.stringify(numberOfItems));

        if (!numberOfItems) {
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
    for (let i = 0; i < basketDatas.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case basketDatas[i].itemId:
                            document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketDatas[i].itemChoiceOption + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '"  class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketDatas[i].itemQuantity + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketDatas[i].itemQuantity) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

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
    document.getElementById("basketsection").innerHTML = '<div class="container mb-5"> <h2>Vos Coordonnées</h2> <p class="fs-6">(Tous les champs doivent être complétés)</p> <form> <div class="form-row"> <div class="col-md-4 mb-3"> <label for="prenom">Prénom</label> <input type="text" class="form-control text-capitalize" id="prenom" placeholder="ex : monprénom" required></div> <div class="col-md-4 mb-3"> <label for="nom">Nom</label> <input type="text" class="form-control text-uppercase" id="nom" placeholder="monnom" required> </div> </div> <div class="form-row"> <div class="col-md-6 mb-3"> <label for="adresse">Adresse</label> <input type="text" class="form-control" id="adresse" placeholder="ex : 50 rue icietlà" required> </div> </div > <div class="form-row"> <div class="col-md-3 mb-3"> <label for="codepostal">Code postal</label> <input type="tel" class="form-control" id="codepostal" placeholder="ex : 01790" required pattern="[0-9]{5}"> </div> <div class="col-md-6 mb-3"> <label for="ville">Ville</label> <input type="text" class="form-control text-uppercase" id="ville" placeholder="ex : orinoco city " required></div> </div> <div class="form-row" > <div class="col-md-4 mb-3" > <label for="email" >email</label> <input type="email" class="form-control" id="email" placeholder="ex : monemail@pasta.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"> </div> <div class="col-md-4 mb-3" > <label for="tel" >Téléphone mobile</label> <input type="tel" class="form-control" id="tel" placeholder="ex : 01 23 45 67 89" required pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"> </div> </div> <div class="form-group mt-3" > <div class="form-check" > <input class="form-check-input" type="checkbox" value="" id="cgu" required > <label class="form-check-label" for="cgu" >J\'accepte les conditions générales d\'utilisation et de vente</label></div > </div> <a id="sendForm" class="btn btn-primary" class="text-light" href="./purchase.html">Envoyer</button> </form>';

    document.getElementById("sendForm").addEventListener("click", () => {
        formValidation();
    });
};

//order validation form datas
let formValidation = () => {
    let firstName = document.getElementById("prenom").value;
    let lastName = document.getElementById("nom").value;
    let address = document.getElementById("adresse").value;
    let city = document.getElementById("ville").value;
    let email = document.getElementById("email").value;

    let cp = document.getElementById("codepostal").value;
    let tel = document.getElementById("tel").value;


    if (window.confirm("Merci de vérifier vos informations avant de valider : \n\n" + firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.toUpperCase() + "\n" + address + "\n" + cp + " " + city + "\nEmail : " + email + "\nTél : " + tel, "", "")) {
        let products = [];
        let contact = { firstName, lastName, address, city, email };
        // for (let elt of basketDatas) {
        //     products.push(elt.itemId);
        // }
        products.push(basketDatas[0].itemId);
        let dataTransfer = { contact, products };

        for (let url of urlList) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                    const response = JSON.parse(this.responseText);
                    localStorage.setItem("serverResponse", JSON.stringify(response.orderId));
                }
            };
            request.open("POST", url + "/order");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(dataTransfer));
        }

    }

};

//================================================================//
/*main*/

let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
let basketTotalItems = JSON.parse(localStorage.getItem("basketLevel"));


basketUpDate();

if (!basketTotalItems) {
    basketEmpty();
} else {
    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<h2 class="d-flex justify-content-lg-center mb-3">Détail de votre commande</h2> <div> <div id="basketCollection">');

    showBasket();

    document.getElementById("basketsection").insertAdjacentHTML("beforeend", '<div class="row"> <div class="col-12 d-flex mb-5 justify-content-end"> <h3 class="text-danger text-italic mt-3"> <span>Montant total de votre panier: </span> <span id="totalAmount"></span> <span> € </span></h3> </div> </div> </div> <div class="d-flex justify-content-center mb-5"> <a href="../index.html" class="btn btn-primary mr-3">Continuer mes achats</a> <a href="#" id="validation" class="btn btn-success"> Valider ma commande </a> </div> </div>');

    totalAmount();

    document.getElementById("validation").addEventListener("click", () => {
        command();
    });
}