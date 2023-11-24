function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Создаем объект с данными пользователя
    var userData = {
        username: username,
        password: password
    };

    // Отправляем данные на бэкенд
    fetch('http://localhost/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            // Вызываем функцию проверки с полученными данными
            checkLogin(data);
        })
        .catch(error => {
            console.error('Ошибка при входе:', error);
        });
}

// Функция проверки входа
function checkLogin(data) {
    if (data.success) {
        alert('Вход успешен');
        // Переадресация в личный кабинет
        window.location.href = 'user_lk.html';
    } else {
        alert('Неверное имя пользователя или пароль');
    }
}
