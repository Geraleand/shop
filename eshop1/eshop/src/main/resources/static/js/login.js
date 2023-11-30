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
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Если токен получен, сохраняем его в localStorage
                localStorage.setItem('token', data.token);

                // Перенаправляем пользователя в личный кабинет
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