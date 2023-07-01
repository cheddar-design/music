const synth = new Tone.Synth().toDestination();

const newBtn = document.querySelector('.new');
const playBtn = document.querySelector('.play');
const revealBtn = document.querySelector('.reveal');
const key = document.querySelector('.key');
const scaleBtn = document.querySelector('.submitScale');
const scaleText = document.querySelector('.scale');
const chordBtn = document.querySelector('.submitChord');
const chordText = document.querySelector('.chord');

const noteKeys = [{
  name: 'C',
}, {
  name: 'C#',
  flat: 'Db',
}, {
  name: 'D',
}, {
  name: 'D#',
  flat: 'Eb'
}, {
  name: 'E',
}, {
  name: 'F',
}, {
  name: 'F#',
  flat: 'Gb'
}, {
  name: 'G',
}, {
  name: 'G#',
  flat: 'Ab'
}, {
  name: 'A',
}, {
  name: 'A#',
  flat: 'Bb'
}, {
  name: 'B',
}]

const chords = [{
  name: 'maj',
  notes: [{
    index: 0,
    shift: 0,
  }, {
    index: 2,
    shift: 0,
  }, {
    index: 4,
    shift: 0,
  }]
}, {
  name: 'min',
  notes: [{
    index: 0,
    shift: 0,
  }, {
    index: 2,
    shift: -1,
  }, {
    index: 4,
    shift: 0,
  }]
}, {
  name: 'dim',
  notes: [{
    index: 0,
    shift: 0,
  }, {
    index: 2,
    shift: 0,
  }, {
    index: 4,
    shift: -1,
  }]
}, {
  name: 'aug',
  notes: [{
    index: 0,
    shift: 0,
  }, {
    index: 2,
    shift: 0,
  }, {
    index: 4,
    shift: 1,
  }]
} ]

function scale(shift) {
  const scale = [0, 2, 4, 5, 7, 9, 11];
  return scale.map(x => (x + shift) > 11 ? x + shift - 12 : x + shift);
}

let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let noteList = [];
let currentScale = scale(Math.floor(Math.random() * 11));
scaleText.innerText = notes[currentScale[0]];
let currentChordScale = scale(Math.floor(Math.random() * 11));
let currentChord = chords[Math.floor(Math.random() * (chords.length - 1))];
chordText.innerText = `${notes[currentChordScale[0]]} ${currentChord.name}`;

function fillNotes() {
  for (let i = 0; i < 12; i++) {
    const j = randomNote();
    noteList.push(notes[j])
    notes.splice(j, 1);
  }
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
}

fillNotes()

function randomNote() {
  return Math.floor(Math.random() * (notes.length - 1));
}

key.innerText = noteList.shift();

playBtn.addEventListener("click", () => {
  synth.triggerAttackRelease(key.innerText + '4', '8n');
});

newBtn.addEventListener('click', () => {
  key.classList = 'text key hide';
  if (noteList.length == 0) {
    fillNotes()
  }
  key.innerText = noteList.shift();
})

revealBtn.addEventListener('click', () => {
  key.classList.toggle('hide');
})

scaleBtn.addEventListener('click', () => {
  let answer = document.getElementById('scale').value;
  answer = answer.split(',').map(x => x.trim().toUpperCase());
  answer = answer.map(x => notes.indexOf(x));
  if (JSON.stringify(answer) == JSON.stringify(currentScale)) {
    currentScale = scale(Math.floor(Math.random() * (11)));
    scaleText.innerText = notes[currentScale[0]];
    document.getElementById('scale').value = '';
  }
})

chordBtn.addEventListener('click', () => {
  let answer = document.getElementById('chord').value;
  answer = answer.split(',').map(x => x.trim().toUpperCase());
  answer = answer.map(x => notes.indexOf(x));
  let indexes = currentChord.notes.map(x => x.index)
  indexes = indexes.map(x => currentChordScale[x]);
  for (let i = 0; i < indexes.length; i++) {
    indexes[i] = indexes[i] + currentChord.notes[i].shift;
  }
  console.log(answer)
  console.log(indexes)
  if (JSON.stringify(answer) == JSON.stringify(indexes)) {
    currentChordScale = scale(Math.floor(Math.random() * 11));
    currentChord = chords[Math.floor(Math.random() * (chords.length - 1))];
    chordText.innerText = `${notes[currentChordScale[0]]} ${currentChord.name}`;
    document.getElementById('chord').value = '';
  }
})