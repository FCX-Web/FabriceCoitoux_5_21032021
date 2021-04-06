//====================================================================
//panier

basketHeader(basketTotalItems, "../html/basket.html");

//====================================================================
//fiche produit

let productDatas = localStorage.getItem("product").split("-");
let custom = customList[productDatas[2]];

getDatas(productDatas[0]).then((response) => {
    for (elt of response) {
        switch (elt._id) {
            case productDatas[1]:
                document.getElementById("productImage").setAttribute("src", elt.imageUrl);
                document.getElementById("productName").innerHTML = elt.name;
                document.getElementById("productDescription").innerHTML = elt.description;

                for (let i = 0; i < elt[custom].length; i++) {
                    document.getElementById("productCustom").insertAdjacentHTML("beforeend", "<option value=" + elt[custom][i] + "</option>");
                }

                document.getElementById("productPrice").innerHTML = elt.price / 100 + ",00";
                document.getElementById("productId").innerHTML = elt._id;

                break;
        }
    }
});