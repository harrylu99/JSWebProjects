
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//Search by song or artise
async function searchSongs(term){
    // fetch(`${apiURL}/suggest/${term}`)
    // .then(res => res.json())
    // .then(data => console.log(data))

    const res = await fetch(`${apiURL}/suggest/${term}`)
    const data = await res.json()

    showData(data)
}


// Show song and artist in DOM
function showData(data) {
    // let output = ''
    // data.data.forEach(song =>{
    //     output += `
    //     <li>
    //     <spam><strong>${song.artist.name}</strong> - ${song.title}</spam>
    //     <button class="btn" data-aritist="${song.artist.name}" data-songtitle="${song.title}">Get into it</button>
    //     </li>`
    // })

    // result.innerHTML = `
    // <ul class=""songs>
    // ${output}
    // </ul>`

  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `
  } else {
    more.innerHTML = ''
  }
}

// Get prev and next songs
  async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  const data = await res.json()

  showData(data)
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
  const data = await res.json()

  const lyrics = data.lyrics.replace(/(\r\n|\r\r|\n\n)/g, '</br>')
  

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`

  more.innerHTML = ''
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = search.value.trim()

  if (!searchTerm) {
    alert('Please tell us your favorite song or artist')
  } else {
    searchSongs(searchTerm)
  }
})

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist')
    const songTitle = clickedEl.getAttribute('data-songtitle')

    getLyrics(artist, songTitle)
  }
})


function onTopClick() {
    window.scrollTo(0,800)
  }

// scroll 100px button would show up
window.onscroll = function() {scrollFunction()};
 
function scrollFunction() {console.log(121);
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
 
// back to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}