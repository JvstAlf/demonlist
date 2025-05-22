async function levelPage() {
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

  for(let i = 0; i < countTop75; i++) {
    let demon = document.getElementById(`level-info${i+1}`)

    let title = document.createElement('div')
    title.classList.add('level-title')

    let previous = document.createElement('p')
    previous.classList.add('next')
    previous.textContent = '<'
    previous.setAttribute('onclick', `window.location.href = '../${i}/'`)

    let next = document.createElement('p')
    next.classList.add('next')
    next.textContent = '>'
    next.setAttribute('onclick', `window.location.href = '../${i+2}/'`)

    let levelName = document.createElement('p')
    levelName.classList.add('level-name')
    levelName.textContent = top75[i].name;

    let authorName = document.createElement('p')
    authorName.classList.add('author-name')
    authorName.setAttribute('onclick', `user(${top75[i].publisher.id})`)
    authorName.textContent = 'by ' + top75[i].publisher.name;

    if(i === 0) {
        previous.style.opacity = 0
        previous.style.pointerEvents = 'none'
        title.append(previous)
    } else {
        title.append(previous)
    }
    title.append(levelName)
    title.append(next)

    demon.append(title)
    demon.append(authorName)

    let iframe = document.createElement('iframe')

    let embedId = top75[i].video.split('=')[1];

    iframe.setAttribute('src', `https://www.youtube.com/embed/${embedId}`)
    demon.append(iframe)

    let levelInfo = document.createElement('div')
    levelInfo.classList.add('level-info')

    let verifier = document.createElement('div')
    let verifierName = document.createElement('p')
    verifierName.textContent = top75[i].verifier.name
    verifierName.setAttribute('onclick', `user(${top75[0].verifier.id})`)

    verifier.append('verified by:')
    verifier.append(verifierName)
    levelInfo.append(verifier)

    demon.append(levelInfo)
  }
}

levelPage()