window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  function level(index) {
    window.open(`/levels/${index}/`)
  }

  function user(id) {
    window.open(`/users/${id}/`)
  }

let mainList = document.getElementById('main')
let extendedList = document.getElementById('extended')
let legacyList = document.getElementById('legacy')

function showList(type) {
  mainList.style.display = 'none'
  extendedList.style.display = 'none'
  legacyList.style.display = 'none'

  type.style.display = 'block'
}

function search() {

  const searchValue = document.getElementById('search-bar').value.toLowerCase();
  const levelElements = document.querySelectorAll('.level');

  levelElements.forEach(level => {
    const nameElement = level.querySelector('.name');
    const authorElement = level.querySelector('.author')
    const nameText = nameElement ? nameElement.textContent.toLowerCase() : '';
    const authorText = authorElement ? authorElement.textContent.toLowerCase() : '';

    if (nameText.includes(searchValue) || authorText.includes(searchValue)) {
      level.style.display = '';
    } else {
      level.style.display = 'none';
    }
  });
  
}

function copyId(level_id) {
  navigator.clipboard.writeText(level_id);
  document.getElementById('copied').style.opacity = '100'
  setTimeout(() => {
    document.getElementById('copied').style.opacity = '0'
  }, 1000);
}