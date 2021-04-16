//====================================================================
//panier

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

//====================================================================
//fiche produit

basketHeader("../html/basket.html");

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
        let itemDatas = { itemChoiceOption, itemQuantity };
        let basketDatas = JSON.parse(localStorage.getItem("basketStorage"));
        if (basketDatas == null) {
            basketDatas = {};
            basketDatas[itemId] = itemDatas;
            localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
            basketUpDate();
        } else if (itemId in basketDatas && itemChoiceOption == basketDatas[itemId].itemChoiceOption) {
            basketDatas[itemId].itemQuantity = Number(basketDatas[itemId].itemQuantity) + Number(itemQuantity);
            localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
            basketUpDate();
        } else {
            basketDatas[itemId] = itemDatas;
            localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
            basketUpDate();
        }
    }
};

document.getElementById("addItem").addEventListener("click", () => {
    sendToBasket()
});