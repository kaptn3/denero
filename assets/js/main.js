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
})