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

console.log('1', treamentBtnElement)
// handle events
treamentBtnElement.onclick = function (event) {
    console.log('ok')
    modalHeadingElement.innerText = "Lịch sử lộ trình điều trị:";
    treatmentList.classList.add('active');
    modalElemnt.classList.add('active');
}

prescriptionBtnElement.onclick = function (event) {
    console.log('ok')
    modalHeadingElement.innerText = "Lịch sử dùng thuốc:";
    modalElemnt.classList.add('active');
    prescriptionList.classList.add('active');
}

modalCloseElement.onclick = function (event) {
    treatmentList.classList.remove('active');
    prescriptionList.classList.remove('active');
    modalElemnt.classList.remove('active');
}

prescriptionSortOptions.forEach((option) => {
    option.onclick = function (event) {
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

// Get cookie to login
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const host = 'https://wda-2023-tlf.onrender.com';
var accessToken = getCookie('accessToken');
var userId = getCookie('userId');

console.log(accessToken, userId);

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

function getPatientRecord() {
    var url = host + '/v1/patientRecord/' + userId;
    var options = {
        headers: {
            'token': 'Bearer ' + accessToken
        }
    }
    return fetch(url, options)
        .then(res => res.json())
}

function getAllTreatments() {
    var url = host + '/v1/treatment/patient/' + userId;
    var options = {
        headers: {
            'token': 'Bearer ' + accessToken
        }
    }
    return fetch(url, options)
        .then(res => res.json())
}

function getAllPrescriptions() {
    var url = host + '/v1/prescription/all/' + userId;
    var options = {
        headers: {
            'token': 'Bearer ' + accessToken
        }
    }
    return fetch(url, options)
        .then(res => res.json())
}

function createTreatmentElementList(treatmentList, treatmentElementList, limit = -1) {
    var html = ''; 
    if (limit == -1) limit = treatmentList.length;
    else limit = Math.min(limit, treatmentList.length);


    for (let i = 0; i < limit; i++) {
        var date = new Date(Date.parse(treatmentList[i]['treatmentDay']));
        var day = date.getUTCDate();
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();

        var treatmentNode = `
            <div class="treament" id="treatment-template" style="display: block">
                <div>
                    <div id="treament-date">
                        Ngày ghi nhận: <span>${day}/${month}/${year}</span>
                    </div>
                    <div id="treament-symptom">
                        Triệu chứng: <span>${treatmentList[i]["symptom"]}</span>
                    </div>
                    <div id="treament-diagnose">
                        Chẩn đoán: <span>${treatmentList[i]["diagnosis"]}</span>
                    </div>
                </div>
                <div>
                    <div id="treament-done">
                        ${treatmentList[i]["diagnosis"] ? "Đã" : "Chưa"} điều trị
                    </div>
                    
                </div>
                <p class="treament-detail">Xem chi tiết</p>
            </div>

        `;

        html += treatmentNode;

    }
    treatmentElementList.innerHTML = html;
}

function createPrescriptionElementList(prescriptionList, prescriptionElementList, limit = -1) {
    var html = '';
    if (limit == -1) limit = prescriptionList.length;
    else limit = Math.min(limit, prescriptionList.length);
    for (let i = 0; i < limit; i++) {
        var date = new Date(Date.parse(prescriptionList[i]['prescriptionDay']));
        var day = date.getUTCDate();
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();

        var prescriptionNode = `
                <div class="prescription">
                <div>
                    <div id="prescription-date">
                        Ngày dùng thuốc: <span>${day}/${month}/${year}</span>
                    </div>
                    <div id="prescription-time">
                        Thời gian duy trì: <span>${prescriptionList[i]['maintainingTime']}</span>
                    </div>
                    <div id="prescription-price">
                        Chi phí: <span>${prescriptionList[i]['totalCost']}</span>
                    </div>
                </div>
                
                <p class="prescription-detail">Xem chi tiết</p>
            </div>

        `;

        html += prescriptionNode;

    }
    prescriptionElementList.innerHTML = html;
}


getUser()
    .then(userResponse => {
        var patientName = document.getElementById('patient-name');
        var patientBirthday = document.getElementById('patient-birthday');
        var patientCID = document.getElementById('patient-id');
        var patientInsurance = document.getElementById('patient-insurance');    // To do
        var patientAvatar = document.getElementById('patient-avatar');
        var userAvatar = document.getElementsByClassName('header__user-avatar')[0];
        var username = document.getElementsByClassName('header__user-name')[0];



        userAvatar.setAttribute('src', userResponse['avatar']);
        username.innerHTML = userResponse['username']

        getPatientRecord()
            .then(patientRecordRespose => {
                patientName.innerHTML = patientRecordRespose['data']['name'];

                var date = new Date(Date.parse(patientRecordRespose['data']['age']));
                var day = date.getUTCDate();
                var month = date.getUTCMonth() + 1;
                var year = date.getUTCFullYear();

                patientBirthday.innerHTML = `${day}/${month}/${year}`;
                patientCID.innerHTML = patientRecordRespose['data']['CID'];
                patientInsurance.innerHTML = patientRecordRespose['data']['insurance'];
                patientAvatar.setAttribute('src', patientRecordRespose['data']['avatar']);
            })


        getAllTreatments()
            .then(treatmentsResponse => {
                var treatmentElementLimitList = document.getElementById('treatment-limit-list');
                var treatmentList = treatmentsResponse['data'];
                createTreatmentElementList(treatmentList, treatmentElementLimitList, 3)

                var treatmentElementModalList = document.getElementsByClassName('treatment-list')[0];
                var treatmentList = treatmentsResponse['data'];
                createTreatmentElementList(treatmentList, treatmentElementModalList)
            })

            .catch(err => {
                console.log(err)
            })

        getAllPrescriptions()
            .then(prescriptionsResponse => {
                // console.log(prescriptionsResponse);
                var prescriptionElementLimitList = document.getElementById('prescription-limit-list');
                var prescriptionList = prescriptionsResponse['data'];
                createPrescriptionElementList(prescriptionList, prescriptionElementLimitList, 3)

                var prescriptionElementModalList = document.getElementsByClassName('prescription-list')[0];
                var prescriptionList = prescriptionsResponse['data'];
                createPrescriptionElementList(prescriptionList, prescriptionElementModalList)
            })

            .catch(err => {
                console.log(err)
            })
    })


function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

var logoutBtn = document.getElementById('logout-btn');
logoutBtn.onclick = function () {
    deleteAllCookies();
    window.location.href = "../index.html"
}
