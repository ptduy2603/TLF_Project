// Slide show

let slideIndex = 0;
slideshow = document.getElementById('content-slide');
let numberOfSlides = 3;
function showSlide(i = 0) {
    i = i % numberOfSlides;
    slideshow.setAttribute('style', `
        background-image: url("../assets/images/surgery${i + 1}.jpg");
    `);

    setTimeout(() => {
        showSlide(i + 1);
        console.log("OK");
    }, 3000);
}

showSlide();


// Login modal
var modal = document.getElementById('login-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}