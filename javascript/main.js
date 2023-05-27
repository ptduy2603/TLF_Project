
var emailinput = document.querySelectorAll('#login-modal input[type=text]')
console.log('email input: ', emailinput)


// Slide show

let slideIndex = 0;
slideshow = document.getElementById('content-slide');
let numberOfSlides = 3;
let changeSlideTime = 2000
function showSlide(i = 0) {
    i = i % numberOfSlides;
    slideshow.setAttribute('style', `
        background-image: url("../assets/images/surgery${i + 1}.jpg");
    `);

    setTimeout(() => {
        showSlide(i + 1);
    }, changeSlideTime);
}

showSlide();


// Login modal
var signupModal = document.getElementById('signup-modal');
var loginModal = document.getElementById('login-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == signupModal) {
        signupModal.style.display = "none";
    } else if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

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




// Login function
var loginBtn = document.querySelector('#login-modal button[type=submit]');
console.log(loginBtn);
loginBtn.addEventListener('click', (event) => {
    var phonenumInput = document.querySelector('#login-modal #phonenum-input')
    var passwordInput = document.querySelector('#login-modal #password-input')


    var url = `https://wda-2023-tlf.onrender.com/v1/auth/login`
    var options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            "phone" : phonenumInput.value,
            "password" : passwordInput.value
        })
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            console.log(res['accessToken']);
            document.cookie = 'accessToken=' + res['accessToken'];
            window.location.href = './html/patient_logined_page.html';
        })
})
