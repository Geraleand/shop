function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Создаем объект с данными аутентификации
    var authData = {
        username: username,
        password: password
    };


    // Отправляем данные на бэкенд
    fetch('http://localhost:8080/api/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        // body: formData
        body: JSON.stringify(authData)
    })
        // .then(response => {
            // if (response.ok) {
            //     // Если статус ответа 200, перенаправляем пользователя в личный кабинет
            //     window.location.href = 'user_lk.html';
            // } else {
            //     // Если есть ошибка, выводим сообщение об ошибке
            //     alert('Неверное имя пользователя или пароль');
            // }
        // })

        .then(response => {response.json()})
        .then(data => {
            localStorage.setItem("eshop_access_token", data.accessToken);
            localStorage.setItem("eshop_refresh_token", data.resreshToken);
        })
        .catch(error => {
            console.error('Ошибка при аутентификации:', error);
        });
}