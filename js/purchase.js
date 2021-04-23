//====================================================================
/*order confirmation*/

basketUpDate();

//data recovery
let amount = JSON.parse(localStorage.getItem("amountStorage"));
let cdNumber = JSON.parse(localStorage.getItem("serverResponse"));
document.getElementById("amountValidated").innerHTML = parseInt(amount) / 100 + " €";
document.getElementById("commandNumber").innerHTML = cdNumber;

console.log(cdNumber);

//reinitialization of the localstorage
let basketDatas = [];
let basketTotalItems = 0;
amount = 0;

localStorage.setItem("basketStorage", JSON.stringify(basketDatas));
localStorage.setItem("basketLevel", JSON.stringify(basketTotalItems));
localStorage.setItem("amountStorage", JSON.stringify(amount));

//basket update
basketUpDate();