let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [{
        id: 1,
        name: 'Sugar(1 kg)',
        image: 'https://tse1.mm.bing.net/th?id=OIP.JELyefbIbJNEBxA5ikK4VAHaDt&pid=Api&P=0&h=180',
        priceOfItem: '40/-',
        price: 40
    },
    {
        id: 2,
        name: 'Green Bell Pepper',
        image: 'Green_bell_pepper.jpg',
        priceOfItem: '62/-',
        price: 62
    },
    {
        id: 3,
        name: 'Fortune oil',
        image: 'fortune_oil.jpg',
        priceOfItem: '599/- per 5L jar',
        price: 599
    },
    {
        id: 4,
        name: 'strawberries(100 per packet)',
        image: 'strawberries.jpg',
        priceOfItem: '249/- per packet',
        price: 249
    },
    {
        id: 5,
        name: 'Bajaj Almond Drops hair oil (650 ml pack of 1)',
        image: 'bajaj_almond_hairoil.jpg',
        priceOfItem: '326/- 650ml',
        price: 326
    },
    {
        id: 6,
        name: 'Almonds',
        image: 'almonds.jpg',

        priceOfItem: '705/- per kg',
        price: 705
    }
];
let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="priceOfItem" style="padding:15px">${value.priceOfItem}</div>
            <button style="background-color: green" onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}