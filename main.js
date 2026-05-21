// Для меню в адаптации для мобильной версии
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

//Для калькулятора
document.addEventListener('DOMContentLoaded', () => {
  const sliderLabels = {
    difficulty: {
      map: {
        1: 'Простая сложность',
        2: 'Средняя сложность',
        3: 'Сложная сложность'
      }
    },
    period: {
      map: (val) => {
        if (val === 1) return '1 месяц';
        if (val <= 4) return `${val} месяца`;
        if (val <= 20) return `${val} месяцев`;
        if (val === 21) return '21 месяц';
        if (val <= 23) return `${val} месяца`;
        if (val === 24) return '24+ месяца';
      }
    },
    integrations: {
      map: (val) => {
        if (val === 0) return 'Без интеграций';
        if (val === 1) return '1 интеграция';
        if (val <= 4) return `${val} интеграции`;
        if (val <= 9) return `${val} интеграций`;
        return '10+ интеграций';
      }
    }
  };

  const sliders = document.querySelectorAll('.input_range');
  const THUMB_WIDTH = 20; 
  sliders.forEach(slider => {
    const id = slider.id;
    const wrapper = slider.closest('.wrapper_range');
    const tooltip = wrapper.querySelector('.range_tooltip');
    const labelEl = wrapper.querySelector('.change_level_range');
    const config = sliderLabels[id];


    function update() {
      const min = +slider.min;
      const max = +slider.max;
      const val = +slider.value;

      if (labelEl) {
        const text = typeof config.map === 'function' ? config.map(val) : (config.map[val] || '');
        labelEl.textContent = text;
      }

      if (tooltip) {
        tooltip.textContent = val;
        const trackWidth = slider.offsetWidth || 0;
        if (trackWidth > 0) {
          const usableWidth = Math.max(0, trackWidth - THUMB_WIDTH);
          const percent = ((val - min) / (max - min)) * 100;
          const thumbPosition = (percent / 100) * usableWidth + (THUMB_WIDTH / 2);
          tooltip.style.left = `${thumbPosition}px`;
        }
      }
    }

    slider.addEventListener('input', update);
    slider.addEventListener('pointerdown', () => wrapper.classList.add('dragging'));
    window.addEventListener('pointerup', () => wrapper.classList.remove('dragging'));
    window.addEventListener('resize', update);

    update();
  });
});


//Для телефонных номеров в секции для заполнения заявки
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
preferredCountries: ["ru", "us", "gb"],
separateDialCode: true, 
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});