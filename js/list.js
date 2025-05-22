async function main() {
  const responseTop75 = await fetch("https://pointercrate.com/api/v2/demons/listed/?limit=75");
  const responseTop150 = await fetch("https://pointercrate.com/api/v2/demons/listed?after=75&limit=75")

  const legacyUrls = [
    "https://pointercrate.com/api/v2/demons/listed?after=150&limit=100",
    "https://pointercrate.com/api/v2/demons/listed?after=250&limit=100",
    "https://pointercrate.com/api/v2/demons/listed?after=350&limit=100",
    "https://pointercrate.com/api/v2/demons/listed?after=450&limit=100",
    "https://pointercrate.com/api/v2/demons/listed?after=550&limit=100"
  ]

  const responses = await Promise.all(legacyUrls.map(url => fetch(url)));
  const legacyData = await Promise.all(responses.map(res => res.json()));

  const legacy = legacyData.flat();

  const top75 = await responseTop75.json();
  const top150 = await responseTop150.json();

  const thumbnailUrl = 'https://tjcsucht.net/levelthumbs/'

  const countTop75 = top75.length;
  const countTop150 = top150.length;
  const countLegacy = legacy.length;

  for(let i = 0; i < countTop75; i++){

    let level = document.createElement('div')
    level.classList.add('level')
    level.setAttribute('onclick', `openLevel(${i+1})`)

    document.getElementById('main').append(level)

    let img = document.createElement('a')
    img.setAttribute('href', top75[i].video)
    img.setAttribute('target', '_blank')
    img.classList.add('link')

    level.append(img)

    let thumbnail = document.createElement('img')
    thumbnail.setAttribute('src', top75[i].thumbnail)

    let play = document.createElement('img')
    play.setAttribute('src', '../img/thumbnail.png')
    play.classList.add('play')

    img.append(thumbnail)
    img.append(play)

    let info = document.createElement('div')
    info.classList.add('info')

    let textInfo = document.createElement('div')
    textInfo.classList.add('text-info')

    level.append(info)

    info.append(textInfo)

    let name = document.createElement('p')
    name.classList.add('name')
    name.setAttribute('onclick', `level(${i+1})`)
    name.innerHTML = `#${top75[i].position} - ${top75[i].name}`

    textInfo.append(name)

    let author = document.createElement('p')
    author.classList.add('author', 'gold-text')
    author.setAttribute('onclick', `user(${top75[i].publisher.id})`)
    author.innerHTML = `by ${top75[i].publisher.name}`

    textInfo.append(author)

    let view = document.createElement('img')
    view.setAttribute('src', '../img/view.png')
    view.classList.add('view')
    view.setAttribute('onclick', `level(${i+1})`)

    info.append(view)

    let thumbnailBg = document.createElement('div')

    thumbnailBg.classList.add('thumbnail')
    thumbnailBg.setAttribute('style', `background-image: url(${thumbnailUrl}${top75[i].level_id}.png)`)

    let levelId = document.createElement('p')

    levelId.textContent =top75[i].level_id
    levelId.classList.add('levelid', 'gold-text')
    levelId.setAttribute('onclick', `copyId(${top75[i].level_id})`)

    thumbnailBg.append(levelId)

    level.append(thumbnailBg)

const names = document.querySelectorAll('.name')

if (names.length >= 1) names[0].classList.add('top1');
if (names.length >= 2) names[1].classList.add('top2');
if (names.length >= 3) names[2].classList.add('top3');
}

//////////////////////////////////////////////////

for (let j = 0; j < countTop150; j++) {
    let level150 = document.createElement('div');
    level150.classList.add('level');
    level150.setAttribute('onclick', `openLevel(${j+76})`);

    document.getElementById('extended').append(level150);

    let img150 = document.createElement('a');
    img150.setAttribute('href', top150[j].video);
    img150.setAttribute('target', '_blank');
    img150.classList.add('link');

    level150.append(img150);

    let thumbnail150 = document.createElement('img');
    thumbnail150.setAttribute('src', top150[j].thumbnail);

    let play150 = document.createElement('img');
    play150.setAttribute('src', '../img/thumbnail.png');
    play150.classList.add('play');

    img150.append(thumbnail150);
    img150.append(play150);

    let info150 = document.createElement('div');
    info150.classList.add('info');

    let textInfo150 = document.createElement('div');
    textInfo150.classList.add('text-info');

    level150.append(info150);
    info150.append(textInfo150);

    let name150 = document.createElement('p');
    name150.classList.add('name');
    name150.setAttribute('onclick', `level(${j+76})`);
    name150.innerHTML = `#${top150[j].position} - ${top150[j].name}`;
    textInfo150.append(name150);

    let author150 = document.createElement('p');
    author150.classList.add('author', 'gold-text');
    author150.setAttribute('onclick', `user(${top150[j].publisher.id})`);
    author150.innerHTML = `by ${top150[j].publisher.name}`;
    textInfo150.append(author150);

    let view150 = document.createElement('img');
    view150.setAttribute('src', '../img/view.png');
    view150.classList.add('view');
    view150.setAttribute('onclick', `level(${j+76})`);
    info150.append(view150);

    let thumbnailBg150 = document.createElement('div');
    thumbnailBg150.classList.add('thumbnail');
    thumbnailBg150.setAttribute('style', `background-image: url(${thumbnailUrl}${top150[j].level_id}.png)`);

    level150.append(thumbnailBg150);

}

for (let k = 0; k < countLegacy; k++) {
    
  let levelLegacy = document.createElement('div');
    levelLegacy.classList.add('level');
    levelLegacy.setAttribute('onclick', `openLevel(${k+151})`);

    document.getElementById('legacy').append(levelLegacy);

    let imgLegacy = document.createElement('a');
    imgLegacy.setAttribute('href', legacy[k].video);
    imgLegacy.setAttribute('target', '_blank');
    imgLegacy.classList.add('link');

    levelLegacy.append(imgLegacy);

    let thumbnailLegacy = document.createElement('img');
    thumbnailLegacy.setAttribute('src', legacy[k].thumbnail);

    let playLegacy = document.createElement('img');
    playLegacy.setAttribute('src', '../img/thumbnail.png');
    playLegacy.classList.add('play');

    imgLegacy.append(thumbnailLegacy);
    imgLegacy.append(playLegacy);

    let infoLegacy = document.createElement('div');
    infoLegacy.classList.add('info');

    let textinfoLegacy = document.createElement('div');
    textinfoLegacy.classList.add('text-info');

    levelLegacy.append(infoLegacy);
    infoLegacy.append(textinfoLegacy);

    let nameLegacy = document.createElement('p');
    nameLegacy.classList.add('name');
    nameLegacy.setAttribute('onclick', `level(${k+151})`);
    nameLegacy.innerHTML = `#${legacy[k].position} - ${legacy[k].name}`;
    textinfoLegacy.append(nameLegacy);

    let authorLegacy = document.createElement('p');
    authorLegacy.classList.add('author', 'gold-text');
    authorLegacy.setAttribute('onclick', `user(${legacy[k].publisher.id})`);
    authorLegacy.innerHTML = `by ${legacy[k].publisher.name}`;
    textinfoLegacy.append(authorLegacy);

    let viewLegacy = document.createElement('img');
    viewLegacy.setAttribute('src', '../img/view.png');
    viewLegacy.classList.add('view');
    viewLegacy.setAttribute('onclick', `level(${k+151})`);
    infoLegacy.append(viewLegacy);

    let thumbnailBgLegacy = document.createElement('div');
    thumbnailBgLegacy.classList.add('thumbnail');
    thumbnailBgLegacy.setAttribute('style', `background-image: url(${thumbnailUrl}${legacy[k].level_id}.png)`);

    levelLegacy.append(thumbnailBgLegacy);

}

const levels = document.querySelectorAll('.level')

levels.forEach((level, index) => {
  if(index % 2 === 0) {
    return
  } else {
    level.classList.add('level-light')
  }
  })

}

main();