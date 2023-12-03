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
                localStorage.setItem('authority', data.authority);

                // Перенаправляем пользователя в соответствующий личный кабинет
                switch (data.authority) {
                    case 'SELLER':
                        window.location.href = 'manager_lk.html';
                        break;
                    case 'CLIENT':
                        window.location.href = 'user_lk.html';
                        break;
                    case 'ADMIN':
                        window.location.href = 'owner_lk.html';
                        break;
                    default:
                        throw new Error('Неизвестная роль пользователя');
                }

            } else {
                // Если есть ошибка, выводим сообщение об ошибке
                alert('Неверное имя пользователя или пароль');
            }
        })
        .catch(error => {
            console.error('Ошибка при аутентификации:', error);
        });
}