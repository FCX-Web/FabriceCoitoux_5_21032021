//====================================================================
//liste des produits

// let basketUpDate = () => {
//     let numberOfItems = 0;
//     for (let i = 0; i < idList.length; i++) {
//         numberOfItems += Number(basketDatas[idList[i]].itemQuantity);
//     }
//     localStorage.setItem("basketLevel", numberOfItems);
//     basketHeader("../html/basket.html");
// }

let totalAmount = () => {


    let sum = 0;
    for (let i = 0; i < idList.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case idList[i]:
                            sum += elt.price * Number(basketDatas[idList[i]].itemQuantity);
                            break;
                    };
                };
                document.getElementById("totalAmount").innerHTML = sum / 100;
            });
        };
    };
};

let basketUpDate = () => {
    let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
    if (basketDatas == null) {
        basketDatas = {};
    }
    let idList = Object.keys(basketDatas);
    let numberOfItems = 0;
    for (let i = 0; i < idList.length; i++) {
        numberOfItems += Number(basketDatas[idList[i]].itemQuantity);
    }
    localStorage.setItem("basketLevel", numberOfItems);
    basketHeader("../html/basket.html");
}


let changeItemQuantity = (price, i, quantity) => {
    let numberOfItems = localStorage.getItem("basketLevel");
    numberOfItems = numberOfItems - basketDatas[idList[i]].itemQuantity + quantity;
    basketDatas[idList[i]].itemQuantity = quantity;
    document.getElementById("quantity-" + i).setAttribute("value", quantity);
    document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * basketDatas[idList[i]].itemQuantity) / 100 + " €";
    localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
    totalAmount();
    basketUpDate();
}

let removeItem = (i) => {
    if (window.confirm("Confirmez-vous la suppression de cet article ?", "", "")) {
        document.getElementById("item-" + i).remove();
        delete basketDatas[idList[i]];
        idList = Object.keys(basketDatas);
        localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
        let numberOfItems = 0;
        for (let i = 0; i < idList.length; i++) {
            numberOfItems += Number(basketDatas[idList[i]].itemQuantity);
        }
        localStorage.setItem("basketLevel", numberOfItems);
        // basketHeader("../html/basket.html");
        totalAmount();
        basketUpDate();
    }
}

let showBasket = () => {
    let sum = 0;
    for (let i = 0; i < idList.length; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case idList[i]:
                            document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketDatas[idList[i]].itemChoiceOption + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '" class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketDatas[idList[i]].itemQuantity + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketDatas[idList[i]].itemQuantity) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

                            sum += elt.price * basketDatas[idList[i]].itemQuantity;
                            document.getElementById("totalAmount").innerHTML = sum / 100;

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


//=======================================================================
//main

let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
if (basketDatas == null) {
    basketDatas = {};
}
let idList = Object.keys(basketDatas);

basketUpDate();
showBasket();