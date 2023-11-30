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
    if (pageName === "updateData") {
        fetch('http://localhost:8080/user/update', {
            method: 'GET',
            credentials: 'include' // Включаем передачу куки
        })
            .then(response => response.json())
            .then(userDTO => {
                // Создаем форму для ввода данных
                var updateForm = document.createElement("form");

                // Создаем и заполняем поля ввода
                createAndPopulateInputField(updateForm, "Логин:", "text", userDTO.username);
                createAndPopulateInputField(updateForm, "Почта:", "email", userDTO.email);
                createAndPopulateInputField(updateForm, "Фамилия:", "text", userDTO.lastName);
                createAndPopulateInputField(updateForm, "Имя:", "text", userDTO.firstName);
                createAndPopulateInputField(updateForm, "Телефон:", "tel", userDTO.phone);

                // Создаем кнопку "Сохранить изменения"
                var saveButton = document.createElement("button");
                saveButton.innerHTML = "Сохранить изменения";

                // Добавляем кнопку на страницу
                updateForm.appendChild(saveButton);

                // Добавляем форму на страницу
                pageContent.appendChild(updateForm);

                // Добавляем обработчик события для кнопки "Сохранить изменения"
                saveButton.addEventListener("click", function() {
                    // Здесь вы можете написать логику для сохранения изменений в базе данных
                    // например, отправить данные на сервер с использованием AJAX
                    // после успешного сохранения вы можете обновить страницу или выполнить другие действия
                    alert("Изменения сохранены!");
                });
            })
            .catch(error => console.error('Error:', error));
    } else if (pageName === "updatePassword") {

    } else if (pageName === "myOrder") {

    }
}

function createAndPopulateInputField(form, label, type, value) {
    var inputLabel = document.createElement("label");
    inputLabel.innerHTML = label;
    var inputField = document.createElement("input");
    inputField.type = type;
    inputField.value = value;
    form.appendChild(inputLabel);
    form.appendChild(inputField);
}
