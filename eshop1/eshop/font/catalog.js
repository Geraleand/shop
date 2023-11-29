$(document).ready(function () {
    // Загрузка данных о товарах с сервера
    $.get("/api/products", function (products) {
        // Перебор массива товаров и создание карточек
        products.forEach(function (product) {
            var card = '<div class="card">' +
                '<div class="card__top">' +
                '<a href="#" class="card__image">' +
                '<img class="basket__image" src="' + product.photo + '" alt="' + product.title + '"/>' +
                '</a>' +
                '</div>' +
                '<div class="card__bottom">' +
                '<div class="card__price">' + product.price + '</div>' +
                '<a href="#" class="card__title">' + product.title + '</a>' +
                '<div class="quantity-container">' +
                '<button class="quantity-btn" onclick="decrementQuantity(this.parentNode.parentNode.parentNode)">-</button>' +
                '<input type="text" class="quantity-input" value="1" />' +
                '<button class="quantity-btn" onclick="incrementQuantity(this.parentNode.parentNode.parentNode)">+</button>' +
                '</div>' +
                '<button class="card__add">В корзину</button>' +
                '</div>' +
                '</div>';
            // Добавление карточки в контейнер
            $("#product-container").append(card);
        });
    });
});