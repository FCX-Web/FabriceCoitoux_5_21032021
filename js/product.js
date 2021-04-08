//====================================================================
//panier

basketHeader(basket.length, "../html/basket.html");

//====================================================================
//fiche produit

let productDatas = localStorage.getItem("productStorage").split("-");
// let productDatas = JSON.parse(localStorage.getItem("productStorage")).split("-");
let custom = customList[productDatas[2]];

getDatas(productDatas[0]).then((response) => {
    for (elt of response) {
        switch (elt._id) {
            case productDatas[1]:
                document.getElementById("productImage").setAttribute("src", elt.imageUrl);
                document.getElementById("productName").innerHTML = elt.name;
                document.getElementById("productDescription").innerHTML = elt.description;

                for (let i = 0; i < elt[custom].length; i++) {
                    document.getElementById("productCustom").insertAdjacentHTML("beforeend", '<option value="' + elt[custom][i] + '">' + elt[custom][i] + "</option>");
                }

                document.getElementById("productPrice").innerHTML = elt.price / 100 + ",00";
                document.getElementById("productId").innerHTML = elt._id;
                break;
        };
    }
});
//addenventListener
let sendToBasket = () => {
    let goToBasket = confirm("Voulez-vous ajouter cette référence au panier ?");
    if (goToBasket) {

        let itemId = document.getElementById("productId").innerHTML;
        let itemName = document.getElementById("productName").innerHTML;
        let itemChoiceOption = document.getElementById("productCustom").value;
        let itemImage = document.getElementById("productImage").src;
        let itemPrice = document.getElementById("productPrice").innerHTML;
        let itemQuantity = document.getElementById("idQuantity").value;

        let itemDatas = [];

        if (itemDatas === null) {
            itemDatas = [];
        }
        itemDatas.push([itemId, itemName, itemChoiceOption, itemImage, itemPrice, itemQuantity]);

        console.log(itemDatas);

        localStorage.setItem("itemStorage", itemDatas);
        // localStorage.setItem("basketStorage", JSON.stringify(itemDatas));

    } else {
        document.location.reload();
        console.log("Transaction abandonnée");
    }
};