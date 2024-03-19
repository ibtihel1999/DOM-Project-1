const items = [
    { id: 'item1', name: 'Chaise', price: 100, quantity: 0,imageLink: 'https://www.zenhome.tn/813-medium_default/chaise-oscar-.jpg'},
    { id: 'item2', name: 'lit', price: 1200, quantity: 0,imageLink:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7htEmfFI_YkoP8GsiwtpEPeILTC1qCpQMiw&usqp=CAU'},
    { id: 'item3', name: 'armoire', price: 1500, quantity: 0,imageLink:'https://www.matelas.tn/wp-content/uploads/2020/09/armoire-4-portes-beige-chene-tunisie.jpg'},
    { id: 'item4', name: 'tapis', price: 150, quantity: 0,imageLink:"https://www.femmexpat.com/wp-content/uploads/2022/04/bien-choisir-son-tapis.png"},
];

const cartElement = document.getElementById('cart');
const totalElement = document.getElementById('total');

function renderCart() {
    cartElement.innerHTML = ''; 
    let total = 0;

    for (const item of items) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.id = item.id;

        const imgElement = document.createElement('img');
        imgElement.src = item.imageLink;
        imgElement.alt = item.name;

        const itemNameElement = document.createElement('span');
        itemNameElement.textContent = item.name;

        const quantityIncBtn = createButton('+', () => adjustQuantity(item.id, 1));
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        const quantityDecBtn = createButton('-', () => adjustQuantity(item.id, -1));

        const deleteBtn = createButton('Delete', () => deleteItem(item.id));

        const itemPriceElement = document.createElement('span');
        itemPriceElement.textContent = `DT ${(item.price * item.quantity).toFixed(2)}`;

        total += item.price * item.quantity;

        itemElement.appendChild(imgElement);
        itemElement.appendChild(itemNameElement);
        itemElement.appendChild(quantityIncBtn);
        itemElement.appendChild(quantityDisplay);
        itemElement.appendChild(quantityDecBtn);
        itemElement.appendChild(deleteBtn);
        itemElement.appendChild(itemPriceElement);

        cartElement.appendChild(itemElement);
    }

    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: DT ${total.toFixed(2)}`;
    cartElement.appendChild(totalElement);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function adjustQuantity(itemId, amount) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + amount);
        renderCart();
    }
}

function toggleLike(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.liked = !item.liked;
        renderCart();
    }
}

function deleteItem(itemId) {
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        renderCart();
    }
}

renderCart();