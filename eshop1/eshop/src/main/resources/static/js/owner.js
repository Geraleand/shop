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
    if (pageName === "addManager") {
        // Создаем элемент формы и добавляем его в контент страницы
        var formElement = document.createElement("form");
        formElement.id = "addManagerForm";

        formElement.innerHTML = `
            <h2>Добавление менеджера</h2>
            <label for="login">Логин:</label>
            <input type="text" id="login" name="firstName" required>
            <br>
            <label for="firstName">Фамилия:</label>
            <input type="text" id="firstName" name="firstName" required>
            <br>
            <label for="lastName">Имя:</label>
            <input type="text" id="lastName" name="lastName" required>
            <br>
            <label for="phone">Телефон:</label>
            <input type="text" id="phone" name="phone" required>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="button" onclick="registerUser()">Добавить</button>
        `;
        pageContent.appendChild(formElement);
    } else if (pageName === "income") {
        // Создаем элемент формы и добавляем его в контент страницы
        var formElement = document.createElement("form");
        formElement.id = "incomeForm";

        formElement.innerHTML = `
            <h2>Получение данных о прибыли</h2>

            <label for="startDate">Дата начала:</label>
            <input type="date" id="startDate" required>
            <br>

            <label for="endDate">Дата окончания:</label>
            <input type="date" id="endDate" required>
            <br>

            <button type="button" onclick="getIncome()">Получить прибыль</button>

            <div id="incomeResult"></div>
        `;
        pageContent.appendChild(formElement);
    } else if (pageName === "top") {
        // Создаем элемент для отображения топа продаваемых товаров
        var topProductsElement = document.createElement("div");
        topProductsElement.innerHTML = "<h2>Топ самых продаваемых товаров</h2>";

        // Получаем данные о топе с сервера
        fetch('http://localhost:8080/analytics/most-valuable-products')
            .then(response => response.json())
            .then(mostValuableProducts => {
                // Создаем элементы для отображения списка товаров
                var productsListElement = document.createElement("ul");

                mostValuableProducts.forEach(product => {
                    var productItem = document.createElement("li");
                    productItem.textContent = `Название: ${product.productName}, Категория: ${product.categoryName}, Прибыль: ${product.income}`;
                    productsListElement.appendChild(productItem);
                });

                // Добавляем список товаров на страницу
                topProductsElement.appendChild(productsListElement);
            })
            .catch(error => {
                console.error('Ошибка при получении топа продаваемых товаров:', error);
                alert('Произошла ошибка при получении топа продаваемых товаров.');
            });

        // Добавляем элемент на страницу
        pageContent.appendChild(topProductsElement);
    }
}

function registerUser() {
    // Получение данных из формы
    const login = document.getElementById('login').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Создание объекта для отправки на сервер
    const managerData = {
        login: login,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
    };

    // Отправка данных на сервер
    fetch('http://localhost:8080/manager/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(managerData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Сервер ответил:', data);
            alert('Менеджер успешно добавлен!');
            // Дополнительные действия после успешного добавления
        })
        .catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
            alert('Произошла ошибка при добавлении менеджера.');
        });
}

// Ваш JavaScript-код
function getIncome() {
    // Получение данных из полей ввода
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Отправка данных на сервер
    fetch(`http://localhost:8080/analytics/${startDate}/${endDate}`)
        .then(response => response.json())
        .then(data => {
            console.log('Сервер ответил:', data);

            // Отображение данных о прибыли на странице
            const incomeResultElement = document.getElementById('incomeResult');
            incomeResultElement.innerHTML = `<p>Прибыль: ${data}</p>`;
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            alert('Произошла ошибка при получении данных о прибыли.');
        });
}