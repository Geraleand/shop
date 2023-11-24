function registerUser() {
    var login = document.getElementById("login").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
    }

    // Создаем объект с данными пользователя
    var userData = {
        login: login,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password
    };

    // Отправляем данные на бэкенд
    fetch('http://localhost/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Успешно зарегистрирован:', data);
            // Можно выполнить дополнительные действия после успешной регистрации
        })
        .catch(error => {
            console.error('Ошибка при регистрации:', error);
        });
}