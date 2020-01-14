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

var accordionList = new Vue({
  el: '.accordion'
});