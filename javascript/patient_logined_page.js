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
const prescriptionSortLable = $('.prescription-sort-option');

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
