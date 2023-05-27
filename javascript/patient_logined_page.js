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
    var url = host + '/v1/treatment/';
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

const prescriptions = [
    {
        "userID": "6471c1ad15560519a06103be",
        "prescriptionDay": "2023-05-28T00:00:00.000Z",
        "drugs": [
            {
                "name": "Paracetamol",
                "amount": 3,
                "time": "2023-05-28T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92a6"
            },
            {
                "name": "Dextromethorphan",
                "amount": 4,
                "time": "2023-05-28T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92a7"
            },
            {
                "name": "Dextromethorphan",
                "amount": 4,
                "time": "2023-05-28T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92a8"
            }
        ],
        "totalCost": 20000,
        "treatmentID": "646f8f7bbef3e55a07abb4bd",
        "_id": "6471fcb67d0b8972a4bd92a5",
        "createdAt": "2023-05-27T12:51:02.835Z",
        "updatedAt": "2023-05-27T12:51:02.835Z",
        "__v": 0
    },
    {
        "userID": "5f3782b7a3b742001fdf8a76",
        "prescriptionDay": "2023-06-10T00:00:00.000Z",
        "drugs": [
            {
                "name": "Amoxicillin",
                "amount": 1,
                "time": "2023-06-10T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92a9"
            },
            {
                "name": "Loratadine",
                "amount": 2,
                "time": "2023-06-10T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92aa"
            }
        ],
        "totalCost": 150000,
        "treatmentID": "646f8f7bbef3e55a07abb4be",
        "_id": "6471fcb67d0b8972a4bd92a7",
        "createdAt": "2023-06-09T14:25:40.835Z",
        "updatedAt": "2023-06-09T14:25:40.835Z",
        "__v": 0
    },
    {
        "userID": "5f3782b7a3b742001fdf8a76",
        "prescriptionDay": "2023-06-15T00:00:00.000Z",
        "drugs": [
            {
                "name": "Ibuprofen",
                "amount": 5,
                "time": "2023-06-15T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92ab"
            },
            {
                "name": "Diphenhydramine",
                "amount": 2,
                "time": "2023-06-15T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92ac"
            },
            {
                "name": "Cough Syrup",
                "amount": 3,
                "time": "2023-06-15T00:00:00.000Z",
                "_id": "6471fcb67d0b8972a4bd92ad"
            }
        ],
        "totalCost": 80000,
        "treatmentID": "646f8f7bbef3e55a07abb4bf",
        "_id": "6471fcb67d0b8972a4bd92a8",
        "createdAt": "2023-06-09T14:25:40.835Z",
        "updatedAt": "2023-06-09T14:25:40.835Z",
        "__v": 0
    }
]

const b = [
    {
        "_id": "646f8f7bbef3e55a07abb4bd",
        "userID": ObjectId("6471c1ad15560519a06103b"),
        "treatmentDay": "2023-05-25T00:00:00.000Z",
        "symptom": "Hắt hơi, sổ mũi hoặc nghẹt mũi, đau họng, ho, mệt mỏi",
        "diagnosis": "Cảm lạnh",
        "status": true,
        "createdAt": "2023-05-25T16:40:27.690Z",
        "updatedAt": "2023-05-25T16:40:27.690Z",
        "__v": 0
    },
    {
        "_id": "646f8f7bbef3e55a07abb4be",
        "userID": ObjectId("6471c1ad15560519a06103b"),
        "treatmentDay": "2023-05-26T00:00:00.000Z",
        "symptom": "Đau đầu nhức nhối, mệt mỏi",
        "diagnosis": "Mất ngủ",
        "status": true,
        "createdAt": "2023-05-26T09:15:42.218Z",
        "updatedAt": "2023-05-26T09:15:42.218Z",
        "__v": 0
    },
    {
        "_id": "646f8f7bbef3e55a07abb4bf",
        "userID": ObjectId("6471c1ad15560519a06103b"),
        "treatmentDay": "2023-05-27T00:00:00.000Z",
        "symptom": "Đau bụng, tiêu chảy",
        "diagnosis": "Viêm đại tràng",
        "status": true,
        "createdAt": "2023-05-27T14:20:59.731Z",
        "updatedAt": "2023-05-27T14:20:59.731Z",
        "__v": 0
    },
    {
        "_id": "646f8f7bbef3e55a07abb4c0",
        "userID": ObjectId("6471c1ad15560519a06103b"),
        "treatmentDay": "2023-05-28T00:00:00.000Z",
        "symptom": "Sốt, mệt mỏi",
        "diagnosis": "Viêm họng",
        "status": true,
        "createdAt": "2023-05-28T10:55:17.911Z",
        "updatedAt": "2023-05-28T10:55:17.911Z",
        "__v": 0
    }
]