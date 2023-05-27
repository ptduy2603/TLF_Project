const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// get elements
const treamentBtnElement = $('.view-more-btn--treament');
const prescriptionBtnElement = $('.view-more-btn--prescription');
const modalCloseElement = $('.modal__close-icon');
const modalElemnt = $('.modal');
const treatmentList = $('.treatment-list');
const prescriptionList = $('.prescription-list');
const modalHeadingElement = $('.modal__heading');
const prescriptionSortOptionBox = $('prescription-sort__box')
const prescriptionSortOptions = $$('.prescription-sort__box-item');
const prescriptionSortLabel = $('.prescription-sort-option');
const phoneNumberElement = $('.contact__phone-number');


// declare variables
var isRedPhoneNum = true;

// handle events
treamentBtnElement.onclick = function(event){
    modalHeadingElement.innerText = "Lịch sử lộ trình điều trị:";
    treatmentList.classList.add('active');
    modalElemnt.classList.add('active');
}

prescriptionBtnElement.onclick = function(event){
    modalHeadingElement.innerText = "Lịch sử dùng thuốc:";
    modalElemnt.classList.add('active');
    prescriptionList.classList.add('active');
}

modalCloseElement.onclick = function(event)
{
    treatmentList.classList.remove('active');
    prescriptionList.classList.remove('active');
    modalElemnt.classList.remove('active');
}

prescriptionSortOptions.forEach((option) => {
    option.onclick = function(event)
    {
        prescriptionSortOptions.forEach((option) => {
            option.classList.remove('active');
        })
        prescriptionSortLable.innerText = this.innerText;
        this.classList.add('active');
        prescriptionSortOptionBox.classList.remove('active');
    }
})

// Readmore
var readmoreBtns = document.getElementsByClassName('myBtn');
for (let i = 0; i < readmoreBtns.length; i++) {

    readmoreBtns[i].addEventListener('click', (event) => {
        var dots = event.target.parentElement.getElementsByClassName('dots')[0];
        var moreText = event.target.parentElement.getElementsByClassName('more')[0];

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            event.target.innerHTML = "Xem thêm";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            event.target.innerHTML = "Thu gọn";
            moreText.style.display = "inline";
        }
    })
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

