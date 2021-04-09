//====================================================================
//panier

basketHeader(basket.length, "../html/basket.html");

//====================================================================
//liste des produits

basketDatas = localStorage.getItem("basketStorage").split(",");
console.log(basketDatas);
console.log(basketDatas.length);

let basketView = []
let iterDatas = (basketDatas.length / 6);

for (let i = 0; i < iterDatas; i++) {
    let itemTemp = [];
    for (let k = 0; k < 6; k++) {
        itemTemp.push(basketDatas[k]);
    }
    basketView.push([itemTemp]);
    basketDatas.splice(0, 6);
}

console.log(basketView);

for (let i = 0; i < iterDatas; i++) {
    document.getElementById("basketCollection").insertAdjacentHTML("beforeend", '<div class="card mb - 3"> <div class="row g-0"> <div class="col-md-1 align-self-center"> <img src="' + basketView[i][0][3] + '" class = "d-block w-100" alt="..."> </div> <div class="col-md-3"> <div class="card-body"> <h5 class="card-text">' + basketView[i][0][1] + '</h5> <p class="card-text">' + basketView[i][0][2] + '</p></div> </div> <div class="col-md-3"> <div class="card-body"> <p class="card-text">Prix unitaire: <span class="font-weight-bold">' + basketView[i][0][4] + ' €</span></p> </div> </div> <div class="col-md-3"> <div class="card-body"> <div class="input-group mb-3"> <span class="input-group-text">Quantité</span> <input type="number" class="form-control" value="' + basketView[i][0][5] + '"> </div> </div> </div> <div class="col-md-2 align-self-end"> <div class="card-body"> <p class="card-text font-weight-bold">Total: A CALCULER</p> <a href="#" class="btn btn-warning">Supprimer</a> </div> </div> </div> </div>');
};