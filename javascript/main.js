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
var loginBtn = document.querySelector('#login-modal input[type=text]')
console.log(loginBtn)