var nav = new Vue({
  el: '.nav',
  data() {
    return {
      currentLink: 0,
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
          link: '#technologies'
        },
        {
          name: 'Вопросы',
          link: '#questions'
        }
      ]
    };
  },
  mounted() {
    const startScroll = window.pageYOffset || document.documentElement.scrollTop;
    document.addEventListener('DOMContentLoaded', () => {
      this.setCurrentLink(startScroll);
      this.fadeIcons(startScroll);
    });
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      this.setCurrentLink(scroll);
      this.fadeIcons(scroll);
    });
  },
  methods: {
    setCurrentLink(scroll) {
      for (let i = 0; i < this.links.length; i++) {
        const scrollEl = document.querySelector(this.links[i].link).offsetTop;
        if (scroll > (scrollEl - 50)) {
          this.currentLink = i;
        }
      }
    },
    fadeIcons(scroll) {
      const scrollFooter = document.body.offsetHeight - document.documentElement.clientHeight - 30;
      const icons = document.querySelector('.footer__socials');
      icons.className = (scroll > scrollFooter) ? 'footer__socials footer__socials_show' : 'footer__socials';
    }
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
    showToggle(e) {
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
  el: '.access',
  data() {
    return {
      height: 'auto'
    };
  },
  mounted() {
    setInterval(() => {
      const wrapper = document.querySelector('.access__wrapper');
      const accordion = wrapper.querySelector('.accordion');
      this.height = `${accordion.clientHeight >= wrapper.clientHeight ? wrapper.clientHeight + 'px' : 'auto'}`;
    }, 100);
  }
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
  mounted() {
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

var slider = {
  data() {
    return {
      currentSlide: 0,
      lastCurrentSlide: 0,
      slidesCount: 0,
      navWidth: 0,
      left: 0,
      draggble: false,
      transitionDuration: '0s'
    };
  },
  mounted() {
    const item = document.querySelectorAll(this.classes.item);
    const count = document.querySelector('.screenshots__count-slides');
    this.slidesCount = count ? count.innerHTML : item.length;
    this.navWidth = document.querySelector(this.classes.activeNavItem).clientWidth;
    this.left = document.querySelector('.main').offsetLeft + document.querySelector(this.classes.nav).offsetLeft;

    this.dragHandle();
  },
  methods: {
    slide(e) {
      if ((e.screenX > this.left) && (e.screenX < (this.left + this.slidesCount * this.navWidth))) {
        const x = e.screenX - this.left;
        this.currentSlide = Math.abs(Math.floor(x / this.navWidth));
      }
    },
    dragHandle() {
      let el = document.querySelector(this.classes.wrapper);
      let mc = new Hammer(el);
      mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
      mc.on('panstart', () => {
        this.lastCurrentSlide = this.currentSlide;
        this.draggble = true;
        this.transitionDuration = '0s';
      })
      mc.on('panleft panright', (e) => {
        const x = this.lastCurrentSlide - (e.deltaX / el.clientWidth);
        this.currentSlide = Math.min((this.slidesCount - 1), Math.max(0, x));
      });
      mc.on('panend', (e) => {
        const sign = Math.sign(e.deltaX);
        this.transitionDuration = '1s';
        const round = Math.round(this.currentSlide - ((sign * 1) / 2));
        this.currentSlide = Math.min((this.slidesCount - 1), Math.max(0, round));
        setTimeout(() => {
          this.transitionDuration = '0s';
        }, 1000);
      });
      mc.on('panend', () => {
        this.draggble = false;
      });
      mc.on('tap', () => {
        this.currentSlide = Math.min(this.slidesCount - 1, this.currentSlide + 1);
      })
    }
  },
  watch: {
    currentSlide() {
      if (!this.draggble) {
        this.transitionDuration = '1s';
        setTimeout(() => {
          this.transitionDuration = '0s';
        }, 1000);
      } else {
        this.transitionDuration = '0s';
      }
    }
  }
}

var screenshots = new Vue({
  el: '.screenshots',
  mixins: [slider],
  data() {
    return {
      classes: {
        wrapper: '.screenshots',
        activeNavItem: '.screenshots__nav-item-active',
        nav: '.screenshots__nav'
      }
    }
  }
});

var results = new Vue({
  el: '.results',
  mixins: [slider],
  data() {
    return {
      classes: {
        wrapper: '.results__wrapper',
        item: '.results__item',
        activeNavItem: '.results__nav-item-active',
        nav: '.results__nav'
      }
    }
  }
});

const showSidebar = () => {
  const nav = document.querySelector('.sidebar__nav');
  const footer = document.querySelector('.sidebar__footer');
  const inner = document.querySelector('.sidebar__inner');

  nav.classList.toggle('sidebar__nav_show');
  footer.classList.toggle('sidebar__footer_show');
  inner.classList.toggle('sidebar__inner_show');
}

{
  const macbook = document.querySelector('.screenshots__macbook');
  macbook.style.height = `${macbook.clientWidth * 0.57}px`;

  window.addEventListener('resize', () => {
    macbook.style.height = `${macbook.clientWidth * 0.57}px`;
  });
}
