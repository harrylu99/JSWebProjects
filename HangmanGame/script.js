const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const getHint = document.getElementById("hint");
const showClue = document.getElementById("clue");
const showClueSmall = document.getElementById('cluesmall');

const words = ['ladygaga', 'javascript', 
'google', 'boolean',
'aotearoa','allblack',
'hello','daenerystargaryen',
'hobbit','muggle',
'mileycyrus','dualipa',
'yellow','girls'
];

const hints = ['A Star Is Born',
'The best programming language in the world',
'When your stuck with an error in programming, throw it to?',
'A simple data type having just two possible values',
'New Zealand',
'The best rugby team in the world',
'Kia ora!',
'Rightful Heir to the Iron Throne, rightful Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, Khaleesi of the Great Grass Sea, The Unburnt, the Breaker of Chains',
'The lord of the ring',
'Who cannot enter platform 9 and 3/4',
'I came here like a wrecking ball',
`Don't pick up the phone`,
'Red mix green',
'Who run the world?',

];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  showClueSmall.innerHTML = ''
  showClue.innerHTML = ''

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();


 // OnClick Function
 check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
 
  // Hint

  hint.onclick = function() {

  let hintIndex = words.indexOf(selectedWord)
  showClueSmall.innerHTML = 'PS: All letters should in the lower case and ignore the space'
  showClue.innerHTML = "Tip: " +  hints[hintIndex]
};



