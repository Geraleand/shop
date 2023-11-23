document.addEventListener('DOMContentLoaded', function () {
    // Ваш JavaScript-код здесь
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var dateString = day + ' ' + getMonthName(month) + ' ' + year;
    var timeString = hours + ' часов ' + minutes + ' минут';

    document.getElementById('currentDate').textContent = dateString;
    document.getElementById('currentTime').textContent = timeString;

    function getMonthName(monthNumber) {
        var months = [
            'января', 'февраля', 'марта', 'апреля',
            'мая', 'июня', 'июля', 'августа',
            'сентября', 'октября', 'ноября', 'декабря'
        ];
        return months[monthNumber - 1];
    }
});

function showPage(pageName) {
    // Получаем элемент, в который будем вставлять контент страницы
    var pageContent = document.getElementById("pageContent");

    // Очищаем содержимое
    pageContent.innerHTML = "";

    // В зависимости от выбранного пункта меню добавляем нужный контент
    if (pageName === "addProduct") {
        // Создаем элемент формы и добавляем его в контент страницы
        var formElement = document.createElement("form");
        formElement.id = "addProductForm";

        formElement.innerHTML = `
            <h2>Ввод нового товара в базу данных</h2>
            <label for="productName">Название товара:</label>
            <input type="text" id="productName" name="productName" required><br>

            <label for="productCode">Артикул:</label>
            <input type="text" id="productCode" name="productCode" required><br>

            <label for="productPhoto">Фото:</label>
            <input type="file" id="productPhoto" name="productPhoto"><br>

            <label for="productPrice">Цена:</label>
            <input type="number" id="productPrice" name="productPrice" step="1" required><br>

            <label for="productQuantity">Количество:</label>
            <input type="number" id="productQuantity" name="productQuantity" step="1" required><br>

            <label for="productSupplier">Поставщик:</label>
            <input type="text" id="productSupplier" name="productSupplier" required><br>

            <button type="submit">Добавить товар</button>
        `;

        // Добавляем обработчик события для формы
        formElement.addEventListener('submit', function(event) {
            event.preventDefault();
            // Добавьте код для обработки данных формы

            // Проверка на целые числа в полях "Цена" и "Количество"
            var price = parseInt(document.getElementById('productPrice').value, 10);
            var quantity = parseInt(document.getElementById('productQuantity').value, 10);

            if (isNaN(price) || isNaN(quantity) || price % 1 !== 0 || quantity % 1 !== 0) {
                alert('Введите числовые значения в поля цена и количество.');
                return;
            }

            alert('Товар успешно добавлен!');
            this.reset();
        });
        pageContent.appendChild(formElement);

    } else if (pageName === "updateProduct") {
        pageContent.innerHTML = "<h2>Коррекция значений товара в базе данных</h2>";
        // Добавьте функцию для получения списка товаров из базы данных
        function getProducts() {
            return Promise.resolve([
                {
                    name: 'Товар 1',
                    article: '12345',
                    photo: 'image/1.jpg',
                    price: 100,
                    quantity: 50,
                    supplier: 'Поставщик 1'
                },
                {
                    name: 'Товар 2',
                    article: '67890',
                    photo: 'image/2.jpg',
                    price: 150,
                    quantity: 30,
                    supplier: 'Поставщик 2'
                },
            ]);
        }

        // Добавьте функцию для создания миниатюры товара
        function createProductThumbnail(product) {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('product-thumbnail');

            thumbnail.innerHTML = `
            <img src="${product.photo}" alt="${product.name}">
            <p>${product.name}</p>
            <p>Артикул: ${product.article}</p>
            <p>Цена: ${product.price}</p>
            `;

            // Добавьте обработчик события для отображения формы при клике
            thumbnail.addEventListener('click', () => showEditForm(product));

            return thumbnail;
        }

        // Добавьте функцию для отображения миниатюр товаров
        function showProductThumbnails(products) {
            const pageContent = document.getElementById("pageContent");
            pageContent.innerHTML = "<h2>Коррекция существующего товара</h2>";

            const thumbnailsContainer = document.createElement('div');
            thumbnailsContainer.classList.add('thumbnails-container');

            products.forEach(product => {
                const thumbnail = createProductThumbnail(product);
                thumbnailsContainer.appendChild(thumbnail);
            });

            pageContent.appendChild(thumbnailsContainer);

            // Добавьте кнопку "Назад"
            const backButton = document.createElement('button');
            backButton.textContent = 'Назад';
            backButton.addEventListener('click', showProductThumbnails);
            pageContent.appendChild(backButton);
            }

        // Добавьте функцию для удаления товара
        function deleteProduct(productId) {
            // Здесь добавьте код для удаления товара из базы данных
            // В этом примере, просто выведем сообщение об успешном удалении
            alert('Товар удален');
        }

        // Добавьте функцию для отображения формы редактирования товара
        function showEditForm(product) {
            const pageContent = document.getElementById("pageContent");
            pageContent.innerHTML = "<h2>Редактирование товара</h2>";

            const formElement = document.createElement("form");
            formElement.id = "editProductForm";

            formElement.innerHTML = `
    <label for="productName">Название товара:</label>
    <input type="text" id="productName" name="productName" value="${product.name}" required><br>

    <label for="productCode">Артикул:</label>
    <input type="text" id="productCode" name="productCode" value="${product.article}" required><br>

    <label for="productPhoto">Фото:</label>
    <input type="file" id="productPhoto" name="productPhoto" value="${product.photo}"><br>

    <label for="productPrice">Цена:</label>
    <input type="number" id="productPrice" name="productPrice" step="1" value="${product.price}" required><br>

    <label for="productQuantity">Количество:</label>
    <input type="number" id="productQuantity" name="productQuantity" step="1" value="${product.quantity}" required><br>

    <label for="productSupplier">Поставщик:</label>
    <input type="text" id="productSupplier" name="productSupplier" value="${product.supplier}" required><br>

    <button type="submit" id="editProductButton">Сохранить изменения</button>
    <button type="button" id="deleteProductButton">Удалить товар
    <i class="fas fa-trash"></i>
    </button>
  `;


            // Добавьте обработчик события для сохранения изменений
            formElement.addEventListener('submit', function (event) {
                event.preventDefault();
                // Добавьте код для сохранения изменений в базу данных
                alert('Изменения сохранены!');
            });

            // Добавьте обработчик события для кнопки "Удалить товар"
            const deleteButton = formElement.querySelector('#deleteProductButton');
            deleteButton.addEventListener('click', () => {
                const confirmDelete = confirm('Вы уверены, что хотите удалить этот товар?');
                if (confirmDelete) {
                    deleteProduct(product.id); // Замените "product.id" на идентификатор товара из вашей базы данных
                    alert('Товар удален');
                    formElement.reset(); // Очистка формы после удаления
                }
            });

            pageContent.appendChild(formElement);

            // Добавьте кнопку "Назад" к миниатюрам
            const backButton = document.createElement('button');
            backButton.textContent = 'Назад';
            backButton.addEventListener('click', () => showProductThumbnails(getProducts()));
            pageContent.appendChild(backButton);
        }



        // При загрузке страницы вызовите функцию для отображения миниатюр товаров
        getProducts().then(products => showProductThumbnails(products));


    } else if (pageName === "updateStatus") {
        pageContent.innerHTML = "<h2>Обновление статуса оплаты</h2>";
        // Добавьте код для обновления товара
    }
}

