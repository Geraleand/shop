document.addEventListener("DOMContentLoaded", function() {
    // Получаем элемент ввода и кнопку отмены
    var searchInput = document.getElementsByName("search")[0];
    var clearSearchButton = document.querySelector(".search-cancel");

    // Добавляем обработчик события клика на кнопку отмены
    clearSearchButton.addEventListener("click", function() {
        // Очищаем значение поля ввода
        searchInput.value = "";
    });
});

function incrementQuantity(card) {
    var quantityInput = card.querySelector('.quantity-input');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity(card) {
    var quantityInput = card.querySelector('.quantity-input');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}
// Определение функции для добавления товара в корзину
function addToCart(cardElement) {
    var quantityInput = cardElement.querySelector(".quantity-input");
    var quantity = parseInt(quantityInput.value);
    var productName = cardElement.querySelector(".card__title").innerText;
    var productPrice = parseInt(cardElement.querySelector(".card__price").innerText);
    var productImage = cardElement.querySelector(".basket__image").src; // Получаем путь к изображению

    console.log("Product Image:", productImage);

    // Создание объекта товара
    var product = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        image: productImage
    };

    // Получение текущего содержимого корзины из localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Проверка, есть ли уже такой товар в корзине
    var existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // Если товар уже есть в корзине, обновляем количество
        existingProduct.quantity += quantity;
    } else {
        // Если товара еще нет в корзине, добавляем его
        cart.push(product);
    }

    // Сохранение обновленной корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновление количества товаров в иконке корзины в шапке
    updateCartIcon();
}

// Определение функции для обновления количества товаров в иконке корзины
function updateCartIcon() {
    var cartIcon = document.querySelector(".num-cart-product");
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.innerText = totalQuantity;
}

// Ожидание загрузки документа
document.addEventListener("DOMContentLoaded", function () {
    // Привязка функций к кнопкам "В корзину" на каждой карточке товара
    var addToCartButtons = document.querySelectorAll(".card__add");
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            addToCart(button.closest(".card"));
        });
    });

    // Обновление количества товаров в иконке корзины при загрузке страницы
    updateCartIcon();
});

// Функция для генерации случайного номера заказа
function generateOrderNumber() {
    var lastOrderNumber = parseInt(localStorage.getItem("lastOrderNumber")) || 0;
    var orderNumber = lastOrderNumber + 1;
    localStorage.setItem("lastOrderNumber", orderNumber);
    return orderNumber;
}

// Функция для обработки оформления заказа
function checkout() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Отправка данных на сервер (замените URL на ваш)
    var serverURL = "http://localhost:8080/basket";
    var orderData = {
        orderNumber: generateOrderNumber(),
        items: cart
    };

    // Замените это на реальный код отправки данных на сервер
    fetch(serverURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
        .then(response => response.json())
        .then(data => {
            // Обработка успешного ответа от сервера
            console.log("Order submitted successfully:", data);
            // Дополнительные действия по вашему выбору
        })
        .catch(error => {
            // Обработка ошибки при отправке на сервер
            console.error("Error submitting order:", error);
            // Дополнительные действия по вашему выбору
        });

    // Выводим номер заказа
    alert("Заказ успешно оформлен. Номер заказа: " + orderNumber);

    // Очищаем корзину
    clearCart();

    // Перезагружаем страницу (или выполните другие действия по вашему выбору)
    location.reload();
}

// Функция для очистки корзины
function clearCart() {
    localStorage.removeItem("cart");
    // Дополнительные действия, если необходимо
    // Например, обновление отображения корзины на странице
    displayCartItems();
}

