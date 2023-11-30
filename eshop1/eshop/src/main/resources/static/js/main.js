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

function incrementQuantity(card, availableQuantity) {
    var quantityInput = card.querySelector('.quantity-input');
    var currentValue = parseInt(quantityInput.value, 10);

    if (currentValue < availableQuantity) {
        quantityInput.value = currentValue + 1;
    }
}

function decrementQuantity(card) {
    var quantityInput = card.querySelector('.quantity-input');
    var currentValue = parseInt(quantityInput.value, 10);

    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
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
function sendOrderToServer(orderData, token) {
    // код для отправки данных на сервер
    fetch('http://localhost:8080/purchase/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Добавляем токен в заголовки запроса
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

// Функция для обработки оформления заказа
function checkout() {
    // Пытаемся получить токен из localStorage
    var token = localStorage.getItem('token');

    // Проверяем, есть ли токен
    if (token) {
        // Пользователь авторизован

        console.log('Пользователь авторизован');

        // код для оформления заказа
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Генерируем номер заказа
        var orderNumber = generateOrderNumber();

        // Отправляем данные на сервер
        var orderData = {
            orderNumber: orderNumber,
            cart: cart,
            // username: username // Убираем использование куки username
            // Дополнительные данные заказа, если необходимо
        };

        // Отправляем данные на сервер, включая токен
        sendOrderToServer(orderData, token);

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

document.addEventListener('DOMContentLoaded', function () {
    // эндпоинт, который возвращает данные о продуктах
    const apiUrl = '/products/get';

    // Получаем контейнер, в который будем добавлять карточки товаров
    const productContainer = document.getElementById('product-container');

    // Выполняем запрос к бэкенду для получения данных о продуктах
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            // Создаем карточки товаров для каждого продукта
            products.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Функция для создания карточки товара
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');

        // Верхняя часть карточки (изображение)
        const cardTop = document.createElement('div');
        cardTop.classList.add('card__top');

        const imageLink = document.createElement('a');
        imageLink.classList.add('card__image');
        imageLink.href = '#';

        const productImage = document.createElement('img');
        productImage.classList.add('basket__image');
        productImage.src = `data:image/jpeg;base64,${product.photo}`;
        productImage.alt = product.name;

        imageLink.appendChild(productImage);
        cardTop.appendChild(imageLink);
        card.appendChild(cardTop);

        // Нижняя часть карточки (цена, название, кнопка добавить в корзину и т.д.)
        const cardBottom = document.createElement('div');
        cardBottom.classList.add('card__bottom');

        const price = document.createElement('div');
        price.classList.add('card__price');
        price.textContent = product.price; // Замените на поле, содержащее цену продукта

        const titleLink = document.createElement('a');
        titleLink.classList.add('card__title');
        titleLink.href = '#';
        titleLink.textContent = product.name;

        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container');

        const decrementButton = document.createElement('button');
        decrementButton.classList.add('quantity-btn');
        decrementButton.textContent = '-';
        // Добавьте обработчик события для уменьшения количества товара
        decrementButton.addEventListener('click', function() {
            decrementQuantity(card);
        });

        const quantityInput = document.createElement('input');
        quantityInput.classList.add('quantity-input');
        quantityInput.value = '1';

        const incrementButton = document.createElement('button');
        incrementButton.classList.add('quantity-btn');
        incrementButton.textContent = '+';
        // Добавьте обработчик события для увеличения количества товара
        incrementButton.addEventListener('click', function() {
            incrementQuantity(card, product.availableCount); // Передаем availableCount из данных продукта
        });

        const addButton = document.createElement('button');
        addButton.classList.add('card__add');
        addButton.textContent = 'В корзину';
        // Добавьте обработчик события для добавления товара в корзину
        addButton.addEventListener('click', function() {
            addToCart(card);
        });

        quantityContainer.appendChild(decrementButton);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(incrementButton);

        cardBottom.appendChild(price);
        cardBottom.appendChild(titleLink);
        cardBottom.appendChild(quantityContainer);
        cardBottom.appendChild(addButton);

        card.appendChild(cardBottom);

        return card;
    }
});
