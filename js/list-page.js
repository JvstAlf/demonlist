async function levelPage() {
  const path = window.location.pathname;
  const match = path.match(/\/(\d+)\//);
  if (!match) return;

  const index = parseInt(match[1], 10);
  const levelIndex = index - 1;

  const points = ["350", "331.71", "313.42", "291.70", "271.78", "253.53", "236.80", "221.47", "207.42", "194.54", "182.73", "171.91", "161.99", "152.89", "144.56", "136.92", "129.92", "123.50", "117.62", "112.23", "110.81", "109.39", "107.99", "106.61", "105.24", "103.88", "102.54", "101.21", "99.89", "98.58", "97.29", "96.01", "94.75", "93.49", "92.25", "89.95", "87.73", "85.58", "83.51", "81.51", "79.58", "77.72", "75.92", "74.19", "72.52", "70.90", "69.34", "67.83", "66.38", "64.98", "63.62", "62.31", "61.05", "59.83", "58.66", "57.60", "56.47", "55.37", "54.30", "53.26", "52.25", "51.26", "50.30", "49.37", "48.46", "47.57", "46.71", "45.87", "45.06", "44.26", "43.49", "42.74", "42.01", "41.30", "40.60", "39.93", "39.27", "38.63", "38.01", "37.41", "36.82", "36.24", "35.69", "35.14", "34.61", "34.10", "33.60", "33.11", "32.64", "32.18", "31.73", "31.29", "30.87", "30.45", "30.05", "29.66", "29.28", "28.91", "28.55", "28.19", "27.85", "27.52", "27.19", "26.88", "26.57", "26.27", "25.98", "25.70", "25.42", "25.16", "24.90", "24.64", "24.39", "24.15", "23.92", "23.69", "23.47", "23.26", "23.05", "22.84", "22.64", "22.45", "22.26", "22.08", "21.90", "21.73", "21.56", "21.39", "21.23", "21.08", "20.92", "20.78", "20.63", "20.49", "20.36", "20.23", "20.10", "19.97", "19.85", "19.73", "19.62", "19.50", "19.39", "19.29", "19.18", "19.08", "18.99", "18.89", "18.80", "18.71"];

  const url = `https://pointercrate.com/api/v2/demons/listed/?after=${levelIndex}&limit=1`;
  const response = await fetch(url);
  const [level] = await response.json();

  const fullInfoUrl = `https://pointercrate.com/api/v2/demons/${level.id}`
  const fullInfo = await fetch(fullInfoUrl)
  const demonInfo = await fullInfo.json();

  const demon = document.getElementById(`level-info${index}`);
  if (!demon) return;

  const levelApiCacheKey = `gdbrowser-level-${level.level_id}`;
  let levelAPI;

  const cached = localStorage.getItem(levelApiCacheKey);
  if (cached) {
    levelAPI = JSON.parse(cached);
  } else {
    const levelAPIresponse = await fetch(`https://gdbrowser.com/api/level/${level.level_id}`);
    levelAPI = await levelAPIresponse.json();
    localStorage.setItem(levelApiCacheKey, JSON.stringify(levelAPI));
  }

  const fragment = document.createDocumentFragment();

  const title = document.createElement('div');
  title.classList.add('level-title');

  const previous = document.createElement('p');
  previous.classList.add('next');
  previous.textContent = '<';
  previous.onclick = () => window.location.href = `../${index - 1}/`;

  const next = document.createElement('p');
  next.classList.add('next');
  next.textContent = '>';
  next.onclick = () => window.location.href = `../${index + 1}/`;

  const levelName = document.createElement('p');
  levelName.classList.add('level-name');
  levelName.textContent = level.name;

  const authorName = document.createElement('p');
  authorName.classList.add('author-name');
  authorName.textContent = 'by ' + level.publisher.name;
  authorName.onclick = () => user(level.publisher.id);
  
const creators = demonInfo.data.creators
  .filter(c => c.id !== demonInfo.data.publisher.id)
  .map(c => c.name)
  .join(", ");

  const more = document.createElement('abbr')
  more.textContent = ' and more'
  more.classList.add('more')
  more.setAttribute('data', creators)


  const description = document.createElement('div');
  description.classList.add('level-description');
  description.textContent = levelAPI.description;

  if (index === 1) {
    previous.style.opacity = 0;
    previous.style.pointerEvents = 'none';
  }

  title.append(previous, levelName, next);

  const iframe = document.createElement('iframe');
  const embedId = level.video.split('=')[1];
  iframe.src = `https://www.youtube.com/embed/${embedId}`;
  iframe.loading = 'lazy';

  const levelInfo = document.createElement('div');
  levelInfo.classList.add('level-info');

  const verifier = document.createElement('div');
  const verifierName = document.createElement('p');
  verifierName.textContent = level.verifier.name;
  verifierName.onclick = () => user(level.verifier.id);
  verifier.append('verified by:', verifierName);

  const levelPoints = document.createElement('div');
  const levelPoints100 = document.createElement('p');
  levelPoints100.textContent = points[index - 1];
  levelPoints.append('Points (100%):', levelPoints100);

  const levelPoints2 = document.createElement('div');
  const levelPointsLeast = document.createElement('p');
  levelPointsLeast.textContent = (points[index - 1] / 10).toFixed(2);
  levelPoints2.append(`Points (${level.requirement}%):`, levelPointsLeast);

  levelInfo.append(verifier, levelPoints);

  if (index < 76) {
  const levelPoints2 = document.createElement('div');
  const levelPointsLeast = document.createElement('p');
  levelPointsLeast.textContent = (points[index - 1] / 10).toFixed(2);
  levelPoints2.append(`Points (${level.requirement}%):`, levelPointsLeast);
  levelInfo.append(levelPoints2);
  }

  const thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail-level');
  thumbnail.style.backgroundImage = `url('https://tjcsucht.net/levelthumbs/${level.level_id}.png')`;

  const details = document.createElement('div');

  const createDetail = (imgSrc, valueText, onClick = null) => {
    const detail = document.createElement('div');
    detail.classList.add('level-details');

    const img = document.createElement('img');
    img.src = imgSrc;

    const val = document.createElement('p');
    val.textContent = valueText;
    if (onClick) {
      val.style.cursor = 'pointer';
      val.onclick = onClick;
    }

    detail.append(img, val);
    return detail;
  };

  const songUrl = `http://newgrounds.com/audio/listen/${levelAPI.songID}`;

  details.append(
    createDetail('../../img/time.png', levelAPI.length),
    createDetail('../../img/download.png', levelAPI.downloads),
    createDetail('../../img/like.png', levelAPI.likes),
    createDetail('../../img/song.png', levelAPI.songName, () => window.open(songUrl))
  );

  thumbnail.append(details);

  const recordsDiv = document.createElement('div');
  recordsDiv.classList.add('records')

  const required = document.createElement('p')
  if(index < 76) {
    required.textContent = `${level.requirement}% or better required to qualify`;
  } else {
    required.textContent = `100% required to qualify`;
  }
  
  required.classList.add('required')

function createCell(tag, text) {
  const cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

const recordsTable = document.createElement('table');

const recordsInfoRow = document.createElement('tr');
['RECORD HOLDER', 'PROGRESS', 'VIDEO'].forEach(headerText => {
  recordsInfoRow.appendChild(createCell('th', headerText));
});

function createCell(tag, content, isLink = false) {
  const cell = document.createElement(tag);
  if (isLink) {
    const link = document.createElement('a');
    link.href = content;
    link.textContent = 'Video';
    link.target = '_blank';
    cell.appendChild(link);
  } else {
    cell.textContent = content;
  }
  return cell;
}

recordsTable.appendChild(recordsInfoRow);

const records = demonInfo.data.records;

records.forEach(record => {

  function createCellWithFlagAndName(flagEl, nameText) {
  const cell = document.createElement('td');
  cell.setAttribute('onclick', `user(${record.player?.id})`)
  cell.setAttribute('style', 'cursor: pointer;')
  flagEl.classList.add('flag')
  cell.appendChild(flagEl);
  cell.appendChild(document.createTextNode(nameText));
  return cell;
  }

  const row = document.createElement('tr');

  const youtubeIcon = document.createElement('img');
  youtubeIcon.setAttribute('src', '../../img/youtube.png');
  youtubeIcon.style.cursor = 'pointer';
  youtubeIcon.setAttribute('alt', 'Video');
  youtubeIcon.onclick = () => window.open(record.video, '_blank');

  const flagSpan = document.createElement('span');
  flagSpan.classList.add('fi', `fi-${record.nationality?.country_code?.toLowerCase() || 'xx'}`);

  const playerName = record.player?.name || 'Unknown';
  const progress = record.progress + '%';

  row.appendChild(createCellWithFlagAndName(flagSpan, playerName));
  row.appendChild(createCell('td', progress));

  const videoCell = document.createElement('td');
  videoCell.appendChild(youtubeIcon);
  row.appendChild(videoCell);

  recordsTable.appendChild(row);
});

recordsDiv.append('RECORDS', required)
recordsDiv.append(recordsTable)

  if(demonInfo.data.creators.length === 1 && level.publisher.id === demonInfo.data.creators[0].id) {
    console.log('no creators other than publisher')
  } else {
    authorName.append(more)
  }

  fragment.append(title, authorName, description, iframe, levelInfo, thumbnail, recordsDiv);
  demon.appendChild(fragment);
}

levelPage();
