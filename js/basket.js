let numberOfItems = document.getElementById("basketLevel").childElementCount - 1;

// let numberOfItems = 0;

//====================================================================
//panier

function basketLevelMention(items) {
    if (numberOfItems !== 0) {
        document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-secondary">    Panier <span class="badge bg-danger">' + numberOfItems + '</span></button>');
    } else {
        document.getElementById('buttonBasket').insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-secondary">    Panier <span class="badge bg-secondary">(vide)</span></button>');
    }
};

basketLevelMention(numberOfItems);

localStorage.setItem("basketItems", numberOfItems);

document.getElementById('test').insertAdjacentHTML('beforebegin', '<h2>' + localStorage.getItem('basketItems') + '</h2');