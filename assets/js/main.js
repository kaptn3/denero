var nav = new Vue({
  el: '.nav',
  data: {
    links: [
      {
        name: 'Что делаем',
        link: '#intro'
      },
      {
        name: 'Результаты',
        link: '#results'
      },
      {
        name: 'Подход',
        link: '#access'
      },
      {
        name: 'Технологии',
        link: '#tehnologies'
      },
      {
        name: 'Вопросы',
        link: '#questions'
      }
    ]
  }
});

Vue.component('accordion', {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    showToggle() {
      this.isOpen = !this.isOpen;
    }
  },
  template: `
  <li class="accordion__item">
    <h3
      @click="showToggle"
      class="accordion__title"
    >
      {{ title }}
      <i
        class="accordion__icon"
        :class="{ 'accordion__icon_open': isOpen }"
      ></i>
    </h3>
    <div
      class="accordion__text"
      :class="{ 'accordion__text_show': isOpen }"
    >
      <slot/>
    </div>
  </li>
  `
});

var accessSection = new Vue({
  el: '.accordion'
});

var questions = new Vue({
  el: '.questions'
});

var form = new Vue({
  el: '.form',
  data() {
    return {
      contact: '',
      name: '',
      message: '',
      nameError: '',
      contactError: '',
      messageError: '',
      contactType: 'email'
    };
  },
  watch: {
    contact() {
      if (this.contact.charAt(0) === '+' && this.contact.charAt(1) === '7') {
        this.contactType = 'tel';
      } else if (this.contact.charAt(0) === '8') {
        this.contactType = 'tel';
      } else {
        this.contactType = 'email';
      }
    }
  },
  methods: {
    checkForm(e) {
      this.nameError = '';
      this.contactError = '';
      this.messageError = '';

      if (this.contactType === 'tel') {
        if (
          (this.contact.charAt(0) === '+' && this.contact.charAt(1) === '7' && this.contact.length !== 12) || 
          (this.contact.length !== 11 && this.contact.charAt(0) === '8')) {
          this.contactError = 'Что-то не то: проверьте цифры в телефонном номере';
        }
      } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.contact)) {
          this.contactError = 'Что-то не то: проверьте правильность email';
        }
      }

      if (!this.name) {
        this.nameError = 'Введите имя';
      }

      if (!this.contact) {
        this.contactError = 'Введите телефон или email';
      }

      if (!this.message) {
        this.messageError = 'Введите задачу';
      }

      if (!this.nameError && !this.contactError && !this.messageError) {
        return true;
      }

      e.preventDefault();
    }
  }
});

let labels = document.querySelectorAll('.form__label');
for (let i = 0; i < labels.length; i++) {
  let placeholder = labels[i].querySelector('.form__input-text');
  let input = labels[i].querySelector('.form__input');
  if (placeholder && input) {
    placeholder.addEventListener('click', () => {
      placeholder.classList.add('form__input-text_focus');
      input.focus();
    });

    input.addEventListener('blur', () => {
      if (input.value.length === 0) {
        placeholder.classList.remove('form__input-text_focus');
      }
    });
  }
}

const slideBox = (box, position, className, count) => {
  let navActive = document.querySelector(className);
  box.style.transform = `translateX(-${position * 100}%)`;
  navActive.style.left = `${position * (100 / count)}%`;
}

{
  let box = document.querySelector('.screenshots__box');
  let items = document.querySelectorAll('.screenshots__item');
  let nav = document.querySelector('.screenshots__nav');
  nav.innerHTML += `<div class='screenshots__nav-item-active' style='width: ${100 / items.length}%'></div>`;

  for (let i = 0; i < items.length; i++) {
    nav.innerHTML += `<div class='screenshots__nav-item' style='width: ${100 / items.length}%'></div>`;
  }
  const navItems = document.querySelectorAll('.screenshots__nav-item');
  for (let k = 0; k < navItems.length; k++) {
    navItems[k].addEventListener('click', () => {
      slideBox(box, k, '.screenshots__nav-item-active', navItems.length);
    });
  }
}