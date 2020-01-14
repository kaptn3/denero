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
      messageError: ''
    };
  },
  methods: {
    checkForm(e) {
      if (this.contact && this.name && this.message) {
        return true;
      }

      this.nameError = '';
      this.contactError = '';
      this.messageError = '';

      if (!this.name) {
        this.nameError = 'Введите имя';
      }

      if (!this.contact) {
        this.contactError = 'Введите телефон или email';
      }

      if (!this.message) {
        this.messageError = 'Введите задачу';
      }

      e.preventDefault();
    },

  }
  // Что-то не то: проверьте цифры в телефонном номере
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