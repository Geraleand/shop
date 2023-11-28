document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    updateTotalPrice();
});


function displayCartItems() {
    var cartItemsContainer = document.getElementById("cartItems");
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    cart.forEach(function (item) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        var productImage = document.createElement("img");
        productImage.src = item.image; // Используем свойство image для пути к изображению
        productImage.alt = item.name;

        var productInfo = document.createElement("div");
        productInfo.innerHTML = `<p>${item.name}</p><p>Цена: ${item.price} руб.</p><p>Количество: ${item.quantity}</p>`;

        var removeButton = document.createElement("button");
        removeButton.innerText = "Удалить";
        removeButton.addEventListener("click", function () {
            removeFromCart(item.name);
        });

        cartItem.appendChild(productImage);
        cartItem.appendChild(productInfo);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });
}

function updateTotalPrice() {
    var totalContainer = document.getElementById("totalPrice");
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var totalPrice = cart.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    totalContainer.innerText = totalPrice + " руб.";
}

function removeFromCart(productName) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var updatedCart = cart.filter(function (item) {
        return item.name !== productName;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    displayCartItems();
    updateTotalPrice();
}


