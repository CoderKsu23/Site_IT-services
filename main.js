const menuBtn = document.querySelector('.menu_btn');
const menuBtnIcon = document.querySelector('.menu_btn i');
const downMenu = document.querySelector('.dropdown_menu');

menuBtn.onclick = function () {
    downMenu.classList.toggle('open');

    const isOpen = downMenu.classList.contains('open')
    menuBtnIcon.classList = isOpen ?
    'fa-solid fa-xmark' :
    'fa-solid fa-bars'
}


const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
preferredCountries: ["ru", "us", "gb"],
separateDialCode: true, 
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});