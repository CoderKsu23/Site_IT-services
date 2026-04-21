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



document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.input_range');

  sliders.forEach(slider => {
    const wrapper = slider.closest('.wrapper_range');
    const tooltip = wrapper.querySelector('.range_tooltip');

    const THUMB_WIDTH = 20; 

    function update() {
      const min = +slider.min;
      const max = +slider.max;
      const val = +slider.value;

      const trackWidth = slider.offsetWidth;
      const usableWidth = trackWidth - THUMB_WIDTH;
      
      const percent = ((val - min) / (max - min)) * 100;

      const thumbPosition = (percent / 100) * usableWidth + (THUMB_WIDTH / 2);

      tooltip.style.left = `${thumbPosition}px`;
      tooltip.textContent = val;
    }

    slider.addEventListener('input', update);
    slider.addEventListener('pointerdown', () => wrapper.classList.add('dragging'));
    window.addEventListener('pointerup', () => wrapper.classList.remove('dragging'));
    window.addEventListener('resize', update);

    update();
  });
});

const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
preferredCountries: ["ru", "us", "gb"],
separateDialCode: true, 
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});