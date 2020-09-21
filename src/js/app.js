const button = document.querySelector('button');
const container = document.querySelector('.container');

const div = `<div class="popover_content">
              <h3 class="popover_title">Popover title</h3>
              <p class="popover_message">And here is some amazing cotent. It's very engaging. Right?</p>
              </div>
              <div class="tr"></div>`

button.addEventListener('click', (e) => {
  e.preventDefault();
  container.insertAdjacentHTML('afterbegin', div);
  const popover = container.querySelector('.popover_content');
  popover.style.display = 'block';
  // setTimeout(()=> popover.remove(), 5000);
})
