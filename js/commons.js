//===================================================================
//variables

let urlList = ["http://localhost:3000/api/teddies", "http://localhost:3000/api/cameras", "http://localhost:3000/api/furniture"];

let groupList = ["peluches", "photo", "meubles"];

//===================================================================
//requests

function getDatas(url) {
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                const response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        request.open("GET", url);
        request.send();
    })
}