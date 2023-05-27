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