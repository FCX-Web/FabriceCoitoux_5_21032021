let urlList = ["http://localhost:3000/api/teddies", "http://localhost:3000/api/cameras", "http://localhost:3000/api/furniture"];

// class GroupOfItems {
//     constructor(title, dataName) {
//         this.title = title;
//         this.dataName = dataName;
//     }
// }

// let teddies = new GroupOfItems("peluches", "dataTeddies");
// let cameras = new GroupOfItems("photos", "dataCameras");
// let furniture = new GroupOfItems("meubles", "dataFurniture");

function createNode(url, id, tag, feature) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (let elt of response) {
                var tagNode = document.createElement(tag);
                if (feature === "name") {
                    var node = document.createTextNode(elt.name);
                } else {
                    var node = document.createTextNode(elt.description);
                }
                tagNode.appendChild(node);
                document.getElementById(id).appendChild(tagNode);
            }
        }
    };
    request.open("GET", url);
    request.send();
}

//====================================================================
//Carousel


//====================================================================
//Affichage des catégories

// document.getElementById("category").insertAdjacentHTML("afterbegin", ' <div class="col"><div class="card h-100">    <div class="card-body"><h3 id="category_title" class="card-title text-center">Peluches</h3></div><img id="category_img" src="images/teddy_3.jpg" class="card-img-top img-thumbnail" alt="ours en peluche"><div class="card-footer text-center"><a href="#peluches" class="btn btn-light stretched-link"><h4 class="font-weight-bold"">Consulter</h4>   </a></div></div></div> ');

document.getElementById("category").innerHTML = '<div class="col"><div class="card h-100"><div class="card-body"><h3 id="category_title" class="card-title text-center">Peluches</h3></div><img id="category_img" src="images/teddy_3.jpg" class="card-img-top img-thumbnail" alt="ours en peluche"><div class="card-footer text-center"><a href="#peluches" class="btn btn-light stretched-link"><h4 class="font-weight-bold"">Consulter</h4>   </a></div></div></div>';