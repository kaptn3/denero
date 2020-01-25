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

      const footer = document.querySelector('.footer');
      footer.style.visibility = this.currentLink >= 3 ? 'visible' : 'hidden';
      footer.style.position = this.currentLink >= 3 ? 'fixed' : 'absolute';
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

var placeholder = {
  
};

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

var modalForm = new Vue({
  el: '.modal__form',
  data() {
    return {
      contact: '',
      name: '',
      website: '',
      nameError: '',
      contactError: '',
      websiteError: '',
    }
  },
  methods: {
    checkForm(e) {
      this.nameError = '';
      this.contactError = '';
      this.websiteError = '';

      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.contact)) {
        this.contactError = 'Что-то не то: проверьте правильность email';
      }

      if (!this.name) {
        this.nameError = 'Введите имя';
      }

      if (!this.contact) {
        this.contactError = 'Введите email';
      }

      if (!this.website) {
        this.websiteError = 'Введите веб-сайт';
      }

      if (!this.nameError && !this.contactError && !this.websiteError) {
        return true;
      }

      e.preventDefault();
    }
  }
});

const showSidebar = () => {
  const width = window.innerWidth;
  if (width < 768) {
    const app = document.querySelector('.app');
    const nav = app.querySelector('.sidebar__nav');
    const footer = app.querySelector('.sidebar__footer');
    const inner = app.querySelector('.sidebar__inner');
    const height = window.innerHeight;

    nav.classList.toggle('sidebar__nav_show');
    footer.classList.toggle('sidebar__footer_show');
    inner.classList.toggle('sidebar__inner_show');
    app.classList.toggle('app_locked');
    inner.style.height = `${height}px`;
  }
}

const macbookSize = () => {
  const macbook = document.querySelector('.screenshots__macbook');
  macbook.style.height = `${macbook.clientWidth * 0.57}px`;

  window.addEventListener('resize', () => {
    macbook.style.height = `${macbook.clientWidth * 0.57}px`;
  });
}

const initPlaceholder = () => {
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
}

const toggleModal = (open) => {
  const modal = document.querySelector('.modal');
  open ? modal.style.display = 'flex' : modal.style.opacity = '0';
  setTimeout(() => {
    open ? modal.style.opacity = '1' : modal.style.display = 'none';
  }, 500);
}

const modalOut = () => {
  const modal = document.querySelector('.modal');

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      toggleModal();
    }
  })
}

const macbookClick = () => {
  const macbooks = document.querySelectorAll('.macbook__top');
  for (let i = 0; i < macbooks.length; i++) {
    let mc = new Hammer(macbooks[i], { touchAction: "pan-y" });
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    mc.on('panstart', () => {
      macbooks[i].style.pointerEvents = 'none';
    });
    mc.on('panend', () => {
      macbooks[i].style.pointerEvents = 'auto';
    });
  }
}

const heightIntroHandle = () => {
  const header = document.querySelector('.main__header');
  if (window.innerWidth < 768) {
    header.style.height = `${window.innerHeight}px`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPlaceholder();
  modalOut();
  macbookSize();
  macbookClick();
  heightIntroHandle();
});