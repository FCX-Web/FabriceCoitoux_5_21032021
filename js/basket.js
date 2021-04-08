//====================================================================
//panier

basketHeader(basket.length, "../html/basket.html");

//====================================================================
//liste des produits
let itemDatas = [];
let basketDatas = [];
itemDatas.push([localStorage.getItem("itemStorage")]);
basketDatas.push([localStorage.getItem("basketStorage")]);
basketDatas.push([itemDatas]);
localStorage.setItem("basketStorage", basketDatas);
console.log(itemDatas);
console.log(basketDatas);

// for (let i = 0; i < basketDatas.length; i++) {
//     // console.log(basketDatas[i]);
//     document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="../images/teddy_1.jpg" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">Nom du produit</h5> <p class="card-text">Personnalisation</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire: <span class="font-weight-bold">800€</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input type="number" class="form-control"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p class="card-text font-weight-bold">Total: 1600€</p> <a href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> </div>');
// };