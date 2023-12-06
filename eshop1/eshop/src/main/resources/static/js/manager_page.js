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

        // Получаем категории с сервера и заполняем выпадающий список
        getProductCategories().then(categories => {
            var categorySelect = document.createElement("select");
            categorySelect.id = "productCategory";
            categorySelect.name = "productCategory";
            categorySelect.required = true;

            categories.forEach(category => {
                var option = document.createElement("option");
                option.value = category.id.toString(); // Преобразуем в строку, чтобы соответствовать Long в ProductDTO
                option.text = category.name;
                categorySelect.appendChild(option);
            });

            // Добавляем выпадающий список в форму
            formElement.appendChild(categorySelect);
        });

        formElement.innerHTML = `
        <h2>Ввод нового товара в базу данных</h2>
        <label for="productName">Название товара:</label>
        <input type="text" id="productName" name="productName" required><br>

        <label for="productCode">Артикул:</label>
        <input type="text" id="productCode" name="productCode" required><br>

        <label for="productPhoto">Фото:</label>
        <input type="file" id="productPhoto" name="productPhoto"><br>

        <label for="productPrice">Цена:</label>
        <input type="number" id="productPrice" name="productPrice" step="0.01" required><br>

        <label for="productQuantity">Количество:</label>
        <input type="number" id="productQuantity" name="productQuantity" step="1" required><br>

        <label for="productSupplier">Поставщик:</label>
        <input type="text" id="productSupplier" name="productSupplier" required><br>

        <button type="submit">Добавить товар</button>
    `;

        // Добавляем обработчик события для формы
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();

            // Получение данных из формы
            var productName = document.getElementById('productName').value;
            var productCode = document.getElementById('productCode').value;
            var productPhoto = document.getElementById('productPhoto').files[0];
            var productPrice = document.getElementById('productPrice').value;
            var productQuantity = document.getElementById('productQuantity').value;
            var productSupplier = document.getElementById('productSupplier').value;
            var productCategory = document.getElementById('productCategory').value;

            // Создание объекта товара
            const formData = new FormData();
            formData.append('name', productName);
            formData.append('article', productCode);
            formData.append('photo', productPhoto);
            formData.append('price', parseFloat(productPrice));
            formData.append('availableCount', parseInt(productQuantity));
            formData.append('supplier', productSupplier);
            formData.append('categoryId', parseInt(productCategory));
            formData.append('categoryName', ''); // Может потребоваться в зависимости от сервера

            // Отправка данных на сервер
            sendProductData(formData);

            alert('Товар успешно добавлен!');
            this.reset();
        });

        pageContent.appendChild(formElement);
    } else if (pageName === "updateProduct") {
        pageContent.innerHTML = "<h2>Коррекция значений товара в базе данных</h2>";
        // Добавьте функцию для получения списка товаров из базы данных
        function getProducts() {
            return fetch('http://localhost:8080/products/list')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Не удалось получить список товаров с сервера');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Ошибка при получении списка товаров:', error);
                    alert('Произошла ошибка при получении списка товаров.');
                });
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
            // Отправляем запрос на сервер для удаления товара по артикулу
            fetch(`http://localhost:8080/product/delete/${productId}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    // Обработка ответа от сервера
                    console.log('Сервер ответил:', data);
                    alert('Товар успешно удален!');
                    showProductThumbnails(); // Обновляем список товаров после удаления
                })
                .catch(error => {
                    // Обработка ошибок при отправке запроса на сервер
                    console.error('Ошибка при удалении товара:', error);
                    alert('Произошла ошибка при удалении товара.');
                });
        }


        // Добавьте функцию для отображения формы редактирования товара
        function showEditForm(product) {
            const pageContent = document.getElementById("pageContent");
            pageContent.innerHTML = "<h2>Редактирование товара</h2>";

            const formElement = document.createElement("form");
            formElement.id = "editProductForm";

            // Получаем категории с сервера и заполняем выпадающий список
            getProductCategories().then(categories => {
                const categorySelect = document.createElement("select");
                categorySelect.id = "productCategory";
                categorySelect.name = "productCategory";
                categorySelect.required = true;

                categories.forEach(category => {
                    const option = document.createElement("option");
                    option.value = category.id;
                    option.text = category.name;
                    categorySelect.appendChild(option);
                });

                // Выбираем текущую категорию товара
                categorySelect.value = product.categoryId; // Используйте атрибут categoryId или другой, который соответствует вашей модели

                // Добавляем выпадающий список в форму
                formElement.appendChild(categorySelect);
            });

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
    <input type="number" id="productQuantity" name="productQuantity" step="1" value="${product.availableCount}" required><br>

    <label for="productSupplier">Поставщик:</label>
    <input type="text" id="productSupplier" name="productSupplier" value="${product.supplier}" required><br>

    <button type="submit" id="editProductButton">Сохранить изменения</button>
    <button type="button" id="deleteProductButton">Удалить товар
    <i class="fas fa-trash"></i>
    </button>
  `;


            function sendProductUpdate(productData) {
                fetch('http://localhost:8080/product/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Обработка ответа от сервера
                        console.log('Сервер ответил:', data);
                        alert('Изменения сохранены!');
                    })
                    .catch(error => {
                        // Обработка ошибок при отправке на сервер
                        console.error('Ошибка при отправке данных на сервер:', error);
                        alert('Произошла ошибка при сохранении изменений.');
                    });
            }

            // Добавьте обработчик события для сохранения изменений
            formElement.addEventListener('submit', function (event) {
                event.preventDefault();

                // Получение данных из формы
                var productData = {
                    name: document.getElementById('productName').value,
                    article: document.getElementById('productCode').value,
                    photo: document.getElementById('productPhoto').value, // Здесь могут быть изменения
                    price: parseFloat(document.getElementById('productPrice').value),
                    quantity: parseInt(document.getElementById('productQuantity').value),
                    supplier: document.getElementById('productSupplier').value,
                    // Добавьте другие поля, если они есть
                };

                // Отправка данных на сервер
                sendProductUpdate(productData);
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


    } else if (pageName === "addCategory") {
        pageContent.innerHTML = "<h2>Добавление новой категории</h2>";
        // Создаем элемент формы и добавляем его в контент страницы
        var formElement = document.createElement("form");
        formElement.id = "addCategoryForm";

        formElement.innerHTML = `
        <label for="newCategoryName">Название новой категории:</label>
        <input type="text" id="newCategoryName" name="newCategoryName" required><br>

        <button type="submit">Добавить категорию</button>
    `;

        // Добавляем обработчик события для формы
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();

            // Получение данных из формы
            var newCategoryName = document.getElementById('newCategoryName').value;

            // Отправка новой категории на сервер
            sendNewCategory(newCategoryName);

            alert('Новая категория успешно добавлена!');
            this.reset();
        });

        pageContent.appendChild(formElement);
    } else if (pageName === "updateStatus") {
        pageContent.innerHTML = "<h2>Обновление статуса оплаты</h2>";

        // Функция для получения неоплаченных покупок из базы данных
        function getUnpaidPurchases() {
            return fetch('http://localhost:8080/purchase/unpaid/list')
                .then(response => response.json())
                .catch(error => {
                    console.error('Ошибка при получении покупок:', error);
                    throw error;
                });
        }

        // Функция для отображения покупки и формы обновления статуса оплаты
        function showPurchaseDetails(purchase) {
            // Создание элемента для отображения информации о покупке
            const purchaseDetailsElement = document.createElement('div');
            purchaseDetailsElement.innerHTML = `
            <p>Номер покупки: ${purchase.purchaseId}</p>
            <p>Логин пользователя: ${purchase.username}</p>
            <p>Статус оплаты: ${purchase.isPaid ? 'Оплачен' : 'Не оплачен'}</p>
        `;

            // Переключатель статуса оплаты
            const paymentStatusToggle = document.createElement('input');
            paymentStatusToggle.type = 'checkbox';
            paymentStatusToggle.id = `paymentStatusToggle-${purchase.purchaseId}`; // Уникальный идентификатор для каждого чекбокса

            // Добавление label для стилизации и отображения текста рядом с чекбоксом
            const paymentStatusLabel = document.createElement('label');
            paymentStatusLabel.textContent = 'Оплата пришла';
            paymentStatusLabel.htmlFor = `paymentStatusToggle-${purchase.purchaseId}`;

            // Установка начального значения чекбокса в зависимости от статуса
            paymentStatusToggle.checked = purchase.status === 'Оплачен';

            // Обновленный обработчик события для чекбокса
            paymentStatusToggle.addEventListener('change', () => {
                purchase.isPaid = paymentStatusToggle.checked;
                const purchaseIds = [purchase.id];

                // Отправка списка идентификаторов на сервер для обновления статуса
                fetch('http://localhost:8080/purchase/unpaid/pay', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(purchaseIds),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Сервер ответил:', data);
                        alert('Изменения сохранены!');
                    })
                    .catch(error => {
                        console.error('Ошибка при отправке данных на сервер:', error);
                        alert('Произошла ошибка при сохранении изменений.');
                    });
            });

            // Добавление элементов в страницу
            purchaseDetailsElement.appendChild(paymentStatusLabel);
            purchaseDetailsElement.appendChild(paymentStatusToggle);
            purchaseDetailsElement.appendChild(saveChangesButton);

            // Очистка содержимого страницы и добавление элементов
            pageContent.innerHTML = "";
            pageContent.appendChild(purchaseDetailsElement);
        }

        // Получение неоплаченных покупок и отображение их списка
        getUnpaidPurchases()
            .then(unpaidPurchases => {
                // Создание элементов для отображения списка покупок
                const purchasesListElement = document.createElement('div');
                purchasesListElement.innerHTML = "<h3>Неоплаченные покупки:</h3>";

                unpaidPurchases.forEach(purchase => {
                    const purchaseItem = document.createElement('div');
                    purchaseItem.textContent = `Покупка #${purchase.purchaseId}, Логин: ${purchase.username}`;

                    // Добавление обработчика события для отображения деталей покупки
                    purchaseItem.addEventListener('click', () => showPurchaseDetails(purchase));

                    purchasesListElement.appendChild(purchaseItem);
                });

                pageContent.appendChild(purchasesListElement);
            })
            .catch(error => {
                console.error('Ошибка при получении покупок:', error);
                alert('Произошла ошибка при получении покупок.');
            });
        }
    }

function sendProductData(formData) {
    fetch('http://localhost:8080/products/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            article: formData.get('article'),
            photo: null, // Здесь нужно указать бинарные данные, если отправляете изображение
            price: parseFloat(formData.get('price')),
            availableCount: parseInt(formData.get('availableCount')),
            supplier: formData.get('supplier'),
            categoryId: parseInt(formData.get('categoryId')),
            categoryName: '', // Может потребоваться в зависимости от сервера
        })
    })
        .then(response => response.json())
        .then(data => {
            // Обработка ответа от сервера
            console.log('Сервер ответил:', data);
            alert('Товар успешно добавлен!');
            // Очищаем форму
            document.getElementById('addProductForm').reset();
        })
        .catch(error => {
            // Обработка ошибок при отправке на сервер
            console.error('Ошибка при отправке данных на сервер:', error);
            alert('Произошла ошибка при добавлении товара.');
        });
}

function getProductCategories() {
    return fetch('http://localhost:8080/category/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось получить список категорий с сервера');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Ошибка при получении списка категорий:', error);
            alert('Произошла ошибка при получении списка категорий.');
        });
}


function sendNewCategory(newCategoryName) {
    // Отправка данных на сервер
    fetch('http://localhost:8080/category/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ categoryName: newCategoryName })
    })
        .then(response => response.json())
        .then(data => {
            // Обработка ответа от сервера
            console.log('Сервер ответил:', data);

        })
        .catch(error => {
            // Обработка ошибок при отправке на сервер
            console.error('Ошибка при отправке данных на сервер:', error);
            alert('Произошла ошибка при добавлении категории.');
        });
}