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

    } else if (pageName === "top") {

    }
}
