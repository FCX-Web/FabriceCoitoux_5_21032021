//====================================================================
//panier

basketHeader(basketTotalItems, "../html/basket.html");

//====================================================================
//fiche produit

let productDatas = localStorage.getItem("product").split("-");

console.log(productDatas);
console.log(productDatas[2]);

let custom = customList[productDatas[2]];

console.log(custom);



getDatas(productDatas[0], "").then((response) => {
    for (elt of response) {
        switch (elt._id) {
            case productDatas[1]:
                document.getElementById("productImage").setAttribute("src", elt.imageUrl);
                document.getElementById("productName").innerHTML = elt.name;
                document.getElementById("productDescription").innerHTML = elt.description;

                if (custom === "lenses") {
                    for (let i = 0; i < elt.lenses.length; i++) {
                        document.getElementById("productCustom").insertAdjacentHTML("beforeend", "<option>" + elt.lenses[i] + "</option>");
                    }
                } else if (custom === "colors") {
                    for (let i = 0; i < elt.colors.length; i++) {
                        document.getElementById("productCustom").insertAdjacentHTML("beforeend", "<option>" + elt.colors[i] + "</option>");
                    }
                } else {
                    for (let i = 0; i < elt.varnish.length; i++) {
                        document.getElementById("productCustom").insertAdjacentHTML("beforeend", "<option>" + elt.varnish[i] + "</option>");
                    }
                }

                document.getElementById("productPrice").innerHTML = elt.price;
                document.getElementById("productId").innerHTML = elt._id;

                break;
        }
    }
});