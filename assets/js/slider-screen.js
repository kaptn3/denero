{
  var flkty = new Flickity('.screenshots__macbook macbook__top', {
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  on: {
    dragStart() {
      screenshotsBox.removeEventListener('click', nextSlide, false);
    },
    change() {
      const index = flkty.selectedSlide.parent.selectedIndex;
      for (let i = 0; i < img.length; i++) {
        if (i !== index) {
          img[i].style.opacity = '0';
          img[i].style.display = 'none';
        } else {
          img[index].style.opacity = '1';
          img[index].style.display = 'block';
        }
      }
    },
    settle() {
      screenshotsBox.addEventListener('click', nextSlide, false);
    },
    scroll(progress) {
      var dragItem = document.querySelector(".results__nav-item-active");
      if (flkty) {
        //flkty.resize();
        const count = flkty.slides.length;
        dragItem.style.transform = `translateX(${progress * 100 * (count - 1)}%)`;
      }
    }
  }
});

function nextSlide() {
  flkty.next();
}

var screenshotsBox = document.querySelector('.results__wrapper');
screenshotsBox.addEventListener('click', nextSlide, false);

var img = document.querySelectorAll('.results__website-screen');
var dragItem = document.querySelector(".results__nav-item-active");
var container = document.querySelector(".results__nav");

var active = false;
var currentX;
var initialX;
var xOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);
document.body.addEventListener("touchend", dragEnd, false);
document.body.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);
document.body.addEventListener("mouseup", dragEnd, false);
document.body.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
  } else {
    initialX = e.clientX - xOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
  flkty.options.freeScroll = true;
}

function dragEnd(e) {
  initialX = currentX;
  active = false;
  flkty.options.freeScroll = false;
  flkty.startAnimation();
}

function drag(e) {
  if (active) {
    e.preventDefault();
      
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
    } else {
      currentX = e.clientX - initialX;
    }
    xOffset = currentX;
    setTranslate(currentX, dragItem, e);
  }
}

function setTranslate(xPos, el, e) {
  const fullWidth = flkty.slideableWidth;
  const count = flkty.slides.length;
  flkty.x = -1 * (fullWidth / count / 2) - xPos * (count - 1);
  flkty.dragEnd();
}
}