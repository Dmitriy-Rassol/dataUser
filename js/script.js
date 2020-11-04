'use strict';

const user = document.querySelector('.user'),
    btnCheckIn = document.querySelector('.btn-checkin'),
    btnLogIn = document.querySelector('.btn-login'),
    btnLogOut = document.querySelector('.btn-logout'),
    dataList = document.querySelector('.data-list');

let data = JSON.parse(localStorage.getItem('todoData')) || [];
let months =[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Майя',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];
let dateAll = new Date();
let dateDay = dateAll.getDate() + ' ' + months[dateAll.getMonth()] + ' ' + dateAll.getFullYear()
let dateTime = dateAll.getHours() + ':' + dateAll.getMinutes() + ':' + dateAll.getSeconds();

const render = function() {
    dataList.textContent = '';
    data.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('data-item');
        index = index + 1;
        li.innerHTML = 
        '<span class="text-data">' + index + ' Имя: ' + item.name +
        ', Фамилия: ' + item.surname +
        ', Дата регистрации: ' + item.date +
        '</span>' +
		'<button class="btn-delete"></button>'
        ;

        dataList.append(li);

        const btnDelete = li.querySelector('.btn-delete');
        btnDelete.addEventListener('click', function(){
            data.splice(item, 1);
            render();
        });
    });
    localStorage.setItem('todoData', JSON.stringify(data));
};

function checkIn () {
    let userName;
    let login;
    let password;
    let spaces;
    do {
        userName = prompt('Введите имя и фамилию');
        userName = userName.replace(/ +/g, ' ').trim();
        spaces = userName.split(" ").length - 1;
        console.log(spaces);
        if (spaces !== 1 ) {
            alert('Введите только имя и фамилию');
        }
    }
    while (!isNaN(userName) || userName === '' || spaces !== 1);

    do {
        login = prompt('Введите Логин').trim();
    }
    while (login === '');

    do {
        password = prompt('Введите пароль').trim();
    }
    while (password === '');

    let splitName = userName.split(' ');

    const newUser = {
        name: splitName[0],
        surname: splitName[1],
        login: login,
        password: password,
        date: dateDay + ' в ' +  dateTime
    };    
    data.push(newUser);
    console.log(data);
    render();
}
function logIn() {
    let login = prompt('Введите логин').trim();
        let password = prompt('введите пароль').trim();
        data.find((item, index) => {           
            if ( item.login === login && item.password === password) {
                user.textContent = 'Привет, ' + item.name;
                btnLogIn.classList.add('hidden');
                btnLogOut.classList.remove('hidden');
                
                return;
                } else if (index === data.length-1) {
                    alert('Неверный логин или пароль');
                }
            }
        );
        render();
}

function logOut() {
    user.textContent = 'Привет, Аноним ';
    btnLogIn.classList.remove('hidden');
    btnLogOut.classList.add('hidden');
    render();
}

btnCheckIn.addEventListener('click', checkIn);
btnLogIn.addEventListener('click', logIn);
btnLogOut.addEventListener('click', logOut);
render();
