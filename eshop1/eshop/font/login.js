function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Создаем объект с данными аутентификации
    var authData = {
        username: username,
        password: password
    };

    // Отправляем данные на бэкенд
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })
        .then(response => {
            if (response.ok) {
                // Если статус ответа 200, перенаправляем пользователя в личный кабинет
                setCookie("username", username, 1);
                window.location.href = 'user_lk.html';
            } else {
                // Если есть ошибка, выводим сообщение об ошибке
                alert('Неверное имя пользователя или пароль');
            }
        })
        .catch(error => {
            console.error('Ошибка при аутентификации:', error);
        });
}

// Функция для установки cookie
function setCookie(name, value, daysToExpire) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    var cookieString = name + "=" + encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = cookieString;
}