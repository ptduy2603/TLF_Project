const viewMoreBtn = document.querySelector('.view-more-btn');
const modalElemnt = document.querySelector('.modal');
const modalCloseIcon = document.querySelector('.modal__close-icon');
const scheduleElement = document.querySelector('.schedule__table input')
const scheduleDate = document.querySelector('.schedule__date');

viewMoreBtn.onclick = function(event)
{
    modalElemnt.classList.add('active');
}

modalCloseIcon.onclick = function(e)
{
    modalElemnt.classList.remove('active');
}

// change date in schedule 
scheduleElement.onchange = function(event)
{
    let date = new Date(event.target.value);
    scheduleDate.innerText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
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
