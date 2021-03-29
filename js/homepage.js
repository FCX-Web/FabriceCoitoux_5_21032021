    function getItemFeatures(url, id, tag, feature) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                for (let i of response) {
                    var para = document.createElement(tag);
                    if (feature === "name") {
                        var node = document.createTextNode(i.name);
                    } else {
                        var node = document.createTextNode(i.description);
                    }
                    para.appendChild(node);
                    document.getElementById(id).appendChild(para);
                }
            }
        };
        request.open("GET", url);
        request.send();
    }

    // for (let j in urlList) {
    //     getItemFeatures(urlList[j], "test", "h2", "name");
    // };