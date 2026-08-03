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
function initAllPhoneInputs() {
    const phoneInputs = document.querySelectorAll('.phone-input');

    phoneInputs.forEach(input => {
        if (!input.classList.contains('iti-applied')) {
            
            window.intlTelInput(input, {
                preferredCountries: ["ru", "us", "gb"],
                separateDialCode: true, 
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            });
            
            input.classList.add('iti-applied');
        }
    });
}


// Для модального окна
let scrollPosition = 0;

function lockScroll() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;

    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
}
function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.paddingRight = '';
    
    window.scrollTo(0, scrollPosition);
}

async function loadGlobalModal() {
    if (document.getElementById('modal')) return;

    try {
        const response = await fetch('modal.html');
        const html = await response.text();
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        initAllPhoneInputs();

        initModalLogic();
    } catch (error) {
        console.error('Ошибка загрузки модального окна:', error);
    }
}

function initModalLogic() {
    const modal = document.getElementById('modal');
    const form = document.getElementById('requestForm');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        const modalId = btn.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            lockScroll();
            modal.showModal();
        }
        });   
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.close();
        unlockScroll();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
            unlockScroll();
        }
    });

    modal.addEventListener('close', () => {
        unlockScroll();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAllPhoneInputs();
    loadGlobalModal();
});

// Для плавного скролла к конкретной части сайта
document.querySelectorAll('.scroll-to').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;
        
        const header = document.querySelector('.header');
        const offset = header ? header.offsetHeight + 20 : 20;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;
        
        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (elapsed < duration) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    });
});

// Функция автоматического расширения формы для заполнения
function autoResizeTextarea(textarea) {

    textarea.style.height = 'auto';
    
    const newHeight = textarea.scrollHeight;
    const maxHeight = parseInt(getComputedStyle(textarea).maxHeight);
    
    if (newHeight <= maxHeight) {
        textarea.style.height = newHeight + 'px';
        textarea.classList.remove('overflow');
    } else {
        textarea.style.height = maxHeight + 'px';
        textarea.classList.add('overflow');
    }
}
document.querySelectorAll('.auto-resize').forEach(textarea => {
    textarea.addEventListener('input', () => {
        autoResizeTextarea(textarea);
    });

    if (textarea.value) {
        autoResizeTextarea(textarea);
    }
});

