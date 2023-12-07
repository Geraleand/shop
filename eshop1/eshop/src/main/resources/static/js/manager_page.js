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

        // Добавляем переменную для хранения id категории
        var selectedCategoryId = 1;

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

            // Сохраняем id выбранной категории при изменении значения
            categorySelect.addEventListener('change', function () {
                selectedCategoryId = this.value;
            });
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
            const productData = {
                name: productName,
                photo: productPhoto,
                availableCount: parseInt(productQuantity),
                categoryId: selectedCategoryId,
                categoryName: productCategory,
                supplier: productSupplier,
                article: productCode,
                price: parseFloat(productPrice)
            };
            sendProductData(productData)
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
            <img src="data:image/jpeg;base64,${product.outputPhoto}" alt="${product.name}">
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
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
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

            // Добавляем переменную для хранения id категории
            var selectedCategoryId;

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

                    // Если категория совпадает с категорией товара, устанавливаем атрибут selected
                    if (category.id === product.categoryId) {
                        option.selected = true;
                    }

                    categorySelect.appendChild(option);
                });

                // Добавляем выпадающий список в форму
                formElement.appendChild(categorySelect);

                // Сохраняем id выбранной категории при изменении значения
                categorySelect.addEventListener('change', function () {
                    selectedCategoryId = this.value;
                });
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
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(productData)
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
                var productName = document.getElementById('productName').value;
                var productCode = document.getElementById('productCode').value;
                var productPhoto = document.getElementById('productPhoto').files[0];
                var productPrice = document.getElementById('productPrice').value;
                var productQuantity = document.getElementById('productQuantity').value;
                var productSupplier = document.getElementById('productSupplier').value;
                var productCategory = document.getElementById('productCategory').value;

                // Создание объекта товара
                const productData = {
                    name: productName,
                    photo: productPhoto,
                    availableCount: parseInt(productQuantity),
                    categoryId: selectedCategoryId,
                    categoryName: productCategory,
                    supplier: productSupplier,
                    article: productCode,
                    price: parseFloat(productPrice)
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
            return fetch('http://localhost:8080/purchase/unpaid/list', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
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
        <p>Номер покупки: ${purchase.id}</p>
        <p>Логин пользователя: ${purchase.username}</p>
        <p>Статус оплаты: ${purchase.isPaid ? 'Оплачен' : 'Не оплачен'}</p>
    `;

            // Переключатель статуса оплаты
            const paymentStatusToggle = document.createElement('input');
            paymentStatusToggle.type = 'checkbox';
            paymentStatusToggle.id = `paymentStatusToggle-${purchase.id}`; // Уникальный идентификатор для каждого чекбокса

            // Добавление label для стилизации и отображения текста рядом с чекбоксом
            const paymentStatusLabel = document.createElement('label');
            paymentStatusLabel.textContent = 'Оплата пришла';
            paymentStatusLabel.htmlFor = `paymentStatusToggle-${purchase.id}`;

            // Установка начального значения чекбокса в зависимости от статуса
            paymentStatusToggle.checked = purchase.isPaid;

            // Добавление элементов в страницу
            purchaseDetailsElement.appendChild(paymentStatusLabel);
            purchaseDetailsElement.appendChild(paymentStatusToggle);

            // Очистка содержимого страницы и добавление элементов
            pageContent.innerHTML = "";
            pageContent.appendChild(purchaseDetailsElement);

            // Локальный массив для хранения изменений статуса оплаты
            const changesToSave = [];

            // Обработчик события для чекбокса
            paymentStatusToggle.addEventListener('change', () => {
                changesToSave.push({ id: purchase.id, isPaid: paymentStatusToggle.checked });
            });

            // Добавляем кнопку для сохранения изменений
            const saveChangesButton = document.createElement('button');
            saveChangesButton.textContent = 'Сохранить изменения';
            saveChangesButton.addEventListener('click', () => saveChanges());
            purchaseDetailsElement.appendChild(saveChangesButton);

            // Функция для отправки изменений на сервер
            function saveChanges() {
                // Отправка списка покупок на сервер для обновления статуса оплаты
                fetch('http://localhost:8080/purchase/unpaid/pay', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(changesToSave),
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
            }
        }

// Получение неоплаченных покупок и отображение их списка
        getUnpaidPurchases()
            .then(unpaidPurchases => {
                // Создание элементов для отображения списка покупок
                const purchasesListElement = document.createElement('div');
                purchasesListElement.innerHTML = "<h3>Неоплаченные покупки:</h3>";

                unpaidPurchases.forEach(purchase => {
                    const purchaseItem = document.createElement('div');
                    purchaseItem.textContent = `Покупка #${purchase.id}, Логин: ${purchase.username}`;

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

function sendProductData(productData) {
    var formData = new FormData()
    formData.append("name", productData.name);
    formData.append("photo", productData.photo);
    formData.append("availableCount", productData.availableCount);
    formData.append("categoryId", productData.categoryId);
    formData.append("categoryName", productData.categoryName);
    formData.append("supplier", productData.supplier);
    formData.append("article", productData.article);
    formData.append("price", productData.price)

    fetch('http://localhost:8080/products/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: formData
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