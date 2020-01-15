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

var screenshots = new Vue({
  el: '.screenshots',
  data() {
    return {
      currentSlide: 0,
      slidesCount: 0,
      navWidth: 0,
      left: 0
    }
  },
  mounted() {
    const item = document.querySelectorAll('.screenshots__item');
    this.slidesCount = item.length;
    this.navWidth = document.querySelector('.screenshots__nav-item-active').clientWidth;
    this.left = document.querySelector('.main').offsetLeft + document.querySelector('.screenshots__box').offsetLeft;
  },
  methods: {
    slide(e) {
      if ((e.screenX > this.left) && (e.screenX < (this.left + this.slidesCount * this.navWidth))) {
        const x = e.screenX - this.left;
        this.currentSlide = Math.abs(Math.floor(x / this.navWidth));
      }
    }
  },
  watch: {
    currentSlide() {
      const titles = document.querySelectorAll('.screenshots__title');
      for (let m = 0; m < titles.length; m++) {
        titles[m].style.opacity = (this.currentSlide === m) ? 1 : 0;
      }
    }
  }
});