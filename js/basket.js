//====================================================================
//panier

// basketHeader("../html/basket.html");

//====================================================================
//liste des produits

//========================================================================
//méthode array


// basketDatas = localStorage.getItem("basketStorage").split(",");

// let basketView = []
// let iterDatas = (basketDatas.length / 3);

// for (let i = 0; i < iterDatas; i++) {
//     let itemTemp = [];
//     for (let k = 0; k < 3; k++) {
//         itemTemp.push(basketDatas[k]);
//     }
//     basketView.push([itemTemp]);
//     basketDatas.splice(0, 3);
// }

// let basketUpDate = () => {
//     // let basketView = localStorage.getItem("basketStorage");
//     let numberOfItems = 0;
//     for (let i = 0; i < iterDatas; i++) {
//         numberOfItems += Number(basketView[i][0][2]);
//     }
//     localStorage.setItem("basketLevel", numberOfItems);
//     basketHeader("../html/basket.html");
// }


// let changeItemQuantity = (price, i, quantity) => {
//     let numberOfItems = localStorage.getItem("basketLevel");
//     numberOfItems = numberOfItems - basketView[i][0][2] + quantity;
//     basketView[i][0][2] = quantity;
//     document.getElementById("quantity-" + i).setAttribute("value", quantity);
//     document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * basketView[i][0][2]) / 100 + " €";
//     basketUpDate();
// }

// let removeItem = (i) => {
//     document.getElementById("item-" + i).remove();
//     basketView.splice(i, 1);
//     localStorage.setItem("basketStorage", basketView);
//     basketUpDate();
// }

// let showBasket = () => {
//     let sum = 0;
//     for (let i = 0; i < iterDatas; i++) {
//         for (let k in urlList) {
//             getDatas(urlList[k]).then((response) => {
//                 for (elt of response) {
//                     switch (elt._id) {
//                         case basketView[i][0][0]:
//                             document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketView[i][0][1] + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '" class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketView[i][0][2] + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketView[i][0][2]) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

//                             sum += Number(basketView[i][0][2]);

//                             // basketUpDate();

//                             document.getElementById("quantity-" + i).addEventListener("change", () => {
//                                 changeItemQuantity(document.getElementById("eltPrice-" + i).innerHTML * 100, i, document.getElementById("quantity-" + i).value);
//                             });

//                             document.getElementById(i).addEventListener("click", () => {
//                                 removeItem(document.getElementById(i).id);
//                             });


//                             break;
//                     };
//                 }
//             });
//         }
//     };
// };

// let basketManager = () => {
//     showBasket();
//     basketUpDate();
// };

// console.log(basketView);

// basketManager();

//========================================================================
//méthode objet


// let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));

let basketDatas = {};
localStorage.setItem("basketStorage", JSON.stringify(basketDatas));

basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
console.log(basketDatas);

// if (basketDatas == null) {
//     basketDatas = {};
//     console.log(basketDatas);
// } else {
//     let x = JSON.parse(basketDatas);
//     console.log(x);
// }

let itemDatas = JSON.parse(localStorage.getItem("itemStorage"));
console.log(itemDatas);

let basketView = []
let iterDatas = (basketDatas.length / 3);

for (let i = 0; i < iterDatas; i++) {
    let itemTemp = [];
    for (let k = 0; k < 3; k++) {
        itemTemp.push(basketDatas[k]);
    }
    basketView.push([itemTemp]);
    basketDatas.splice(0, 3);
}

let basketUpDate = () => {
    // let basketView = localStorage.getItem("basketStorage");
    let numberOfItems = 0;
    for (let i = 0; i < iterDatas; i++) {
        numberOfItems += Number(basketView[i][0][2]);
    }
    localStorage.setItem("basketLevel", numberOfItems);
    basketHeader("../html/basket.html");
}


let changeItemQuantity = (price, i, quantity) => {
    let numberOfItems = localStorage.getItem("basketLevel");
    numberOfItems = numberOfItems - basketView[i][0][2] + quantity;
    basketView[i][0][2] = quantity;
    document.getElementById("quantity-" + i).setAttribute("value", quantity);
    document.getElementById("totalPrice-" + i).innerHTML = "Total: " + (price * basketView[i][0][2]) / 100 + " €";
    basketUpDate();
}

let removeItem = (i) => {
    document.getElementById("item-" + i).remove();
    basketView.splice(i, 1);
    localStorage.setItem("basketStorage", basketView);
    basketUpDate();
}

let showBasket = () => {
    let sum = 0;
    for (let i = 0; i < iterDatas; i++) {
        for (let k in urlList) {
            getDatas(urlList[k]).then((response) => {
                for (elt of response) {
                    switch (elt._id) {
                        case basketView[i][0][0]:
                            document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div id="item-' + i + '" class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + elt.imageUrl + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + elt.name + '</h5> <p class="card-text">' + basketView[i][0][1] + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire : <span  id="eltPrice-' + i + '" class="font-weight-bold">' + elt.price / 100 + '</span> <span> €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input id="quantity-' + i + '" type="number" class="form-control"   value="' + basketView[i][0][2] + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p id="totalPrice-' + i + '" class="card-text font-weight-bold">Total: ' + (elt.price * basketView[i][0][2]) / 100 + ' €</p> <a id="' + i + '" href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> <div class="mb-3"> <span class="ml-5">Référence : </span> <span id="productId" class="card-text">' + elt._id + '</span> </div></div>');

                            sum += Number(basketView[i][0][2]);

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

let basketManager = () => {
    showBasket();
    basketUpDate();
};

basketManager();