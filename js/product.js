//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//finaliser compteur panier
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//====================================================================
//panier

basketHeader("../html/basket.html");

//====================================================================
//fiche produit

let urlParams = new URLSearchParams(document.location.search.substring(1));
let itemId = urlParams.get("id");
let itemCategory = urlParams.get("category");
let itemIndex = groupList.indexOf(itemCategory);

let custom = customList[itemCategory];

getDatas(urlList[itemIndex]).then((response) => {
    for (elt of response) {
        switch (elt._id) {
            case itemId:
                document.getElementById("productImage").setAttribute("src", elt.imageUrl);
                document.getElementById("productName").innerHTML = elt.name;
                document.getElementById("productDescription").innerHTML = elt.description;

                for (let i = 0; i < elt[custom].length; i++) {
                    document.getElementById("productCustom").insertAdjacentHTML("beforeend", '<option value="' + elt[custom][i] + '">' + elt[custom][i] + "</option>");
                }

                document.getElementById("productPrice").innerHTML = elt.price / 100;
                document.getElementById("productId").innerHTML = elt._id;
                break;
        };
    }
});

let sendToBasket = () => {
    if (window.confirm("Voulez vous ajouter cette référence au panier ?", "", "")) {
        let itemChoiceOption = document.getElementById("productCustom").value;
        let itemQuantity = document.getElementById("idQuantity").value;
        let itemDatas = [];
        itemDatas.push([itemId, itemChoiceOption, itemQuantity]);

        let basketDatas = [];
        if (localStorage.getItem("basketStorage") == null) {
            basketDatas = [];
        } else {
            basketDatas = localStorage.getItem("basketStorage").split(",");
        }

        let basketAdd = () => {
            basketDatas.unshift(
                itemDatas
            );
        };

        if (basketDatas.length === 1) {
            basketAdd();
            basketDatas.pop();
            localStorage.setItem("basketStorage", basketDatas);
        } else {
            basketAdd();
            localStorage.setItem("basketStorage", basketDatas);
        }

    } else {
        document.location.reload();
    }
};

document.getElementById("addItem").addEventListener("click", () => {
    sendToBasket()
});