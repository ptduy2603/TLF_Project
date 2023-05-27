const viewMoreBtn = document.querySelector('.view-more-btn');
const modalElement = document.querySelector('.modal');
const modalCloseIcon = document.querySelector('.modal__close-icon');
const scheduleElement = document.querySelector('.schedule__table input')
const scheduleDate = document.querySelector('.schedule__date');
const phoneNumberElement = document.querySelector('.contact__phone-number');
const prescriptionContainElemnt = document.querySelector('.modal__prescription');
const formElement = document.querySelector('.modal__form')
const formShowBtn = document.querySelector('.header__create-record-btn');
const formCloseBtn = document.querySelector('.form__btn-close');

// declare variables
var isRedPhoneNum = true;

viewMoreBtn.onclick = function(event)
{
    prescriptionContainElemnt.classList.add('active');
    modalElement.classList.add('active');
}

modalCloseIcon.onclick = function(e)
{
    prescriptionContainElemnt.classList.remove('active');
    modalElement.classList.remove('active');
}

// change date in schedule 
scheduleElement.onchange = function(event)
{
    let date = new Date(event.target.value);
    scheduleDate.innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// change color of phone number 
function changeColorPhoneNum(){
    setInterval(() => {
        if(isRedPhoneNum)
            phoneNumberElement.style.color = 'var(--primary-color-1)';
        else 
            phoneNumberElement.style.color = 'red';
        isRedPhoneNum = !isRedPhoneNum;
    }, 1000)
}
changeColorPhoneNum();

formShowBtn.onclick = function(event)
{
    modalElement.classList.add('active');
    formElement.classList.add('active');
}

formCloseBtn.onclick = function(event)
{
    modalElement.classList.remove('active');
    formElement.classList.remove('active');
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


var logoutBtn = document.getElementById('logout-btn');
logoutBtn.onclick = function () {
    deleteAllCookies();
    window.location.href = "../index.html"
}

const host = 'https://wda-2023-tlf.onrender.com';
var accessToken = getCookie('accessToken');
var userId = getCookie('userId');

function getUser() {
    var url = host + '/v1/user/' + userId;
    var options = {
        headers: {
            'token': 'Bearer ' + accessToken
        }
    }
    return fetch(url, options)
        .then(res => res.json())
}

getUser()
    .then(userResponse => {
        var userAvatar = document.getElementsByClassName('header__user-avatar')[0];
        var username = document.getElementsByClassName('header__user-name')[0];

        console.log(userAvatar, username, userResponse)

        userAvatar.setAttribute('src', userResponse['avatar']);
        username.innerHTML = userResponse['username']
    })