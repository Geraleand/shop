document.addEventListener("DOMContentLoaded", function() {
    // Получаем элемент ввода и кнопку отмены
    var searchInput = document.getElementsByName("search")[0];
    var clearSearchButton = document.querySelector(".search-cancel");

    if (clearSearchButton) {
        // Добавляем обработчик события клика на кнопку отмены
        clearSearchButton.addEventListener("click", function () {
            // Очищаем значение поля ввода
            searchInput.value = "";
        });
    }
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

    var cart = []
    // Получение текущего содержимого корзины из localStorage
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== undefined) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

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

// Инициализация текущего номера заказа при загрузке страницы
var currentOrderNumber = parseInt(localStorage.getItem("currentOrderNumber")) || 1;

// Функция для генерации автоинкрементированного номера заказа
function generateOrderNumber() {
    // Увеличиваем номер заказа и сохраняем в localStorage
    localStorage.setItem("currentOrderNumber", ++currentOrderNumber);
    return currentOrderNumber;
}

// Функция для отправки данных на сервер
function sendOrderToServer(orderData) {
    // код для отправки данных на сервер
    fetch('http://localhost:8080/basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
        .then(response => response.json())
        .then(data => {
            // Обработка ответа от сервера (если необходимо)
            console.log('Сервер ответил:', data);
        })
        .catch(error => {
            // Обработка ошибок при отправке на сервер
            console.error('Ошибка при отправке данных на сервер:', error);
        });
}


// Функция для получения значения куки по имени
function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return match ? match[1] : null;
}

// Функция для обработки оформления заказа
function checkout() {

    // Пытаемся получить значение куки с именем 'username'
    var username = getCookie("username");
    // Проверяем, есть ли значение куки
    if (username) {
        // Пользователь авторизован
        console.log('Пользователь ' + username + ' авторизован');
        // код для оформления заказа
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Генерируем номер заказа
        var orderNumber = generateOrderNumber();

        var username = getCookie("username");

        // Отправляем данные на сервер
        var orderData = {
            orderNumber: orderNumber,
            cart: cart,
            username: username
            // Дополнительные данные заказа, если необходимо
        };
        sendOrderToServer(orderData);

        // Выводим номер заказа
        alert("Заказ успешно оформлен. Номер заказа: " + orderNumber);

        // Очищаем корзину
        clearCart();

    } else {
        // Перенаправляем пользователя на страницу входа
        window.location.href = 'login.html';
        return;
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}

// Функция для получения значения cookie по имени
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }
    return null;
}