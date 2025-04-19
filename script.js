// Splash screen removal
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.remove();
  }, 3000);
});

let voices = [];
let currentWordIndex = 0;
let words = [];
let isReading = false;
const synth = window.speechSynthesis;
const textInput = document.getElementById("textInput");

function populateVoices() {
  voices = synth.getVoices();
  const select = document.getElementById("voiceSelect");
  select.innerHTML = "";
  voices.forEach((v, i) => {
    let opt = document.createElement("option");
    opt.textContent = v.name;
    opt.value = i;
    select.appendChild(opt);
  });
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function startReading() {
  words = textInput.value.trim().split(/\s+/);
  if (words.length === 0) return;
  currentWordIndex = 0;
  isReading = true;
  updateWordCounter();
  speakWord();
}
// Replace punctuation for speech
function replacePunctuation(word) {
  return word.replace(/,/g, ' comma')
             .replace(/\./g, ' period')
             .replace(/-/g, ' hyphen')
             .replace(/"/g, ' double quote')
             .replace(/'/g, ' apostrophe')
             .replace(/\?/g, ' question mark')
             .replace(/!/g, ' exclamation mark')
             .replace(/:/g, ' colon')
             .replace(/;/g, ' semicolon')
             .replace(/\(/g, ' open parenthesis')
             .replace(/\)/g, ' close parenthesis');
}


function speakWord() {
  if (!isReading || currentWordIndex >= words.length) return;
  synth.cancel();
  let word = words[currentWordIndex];
  word = replacePunctuation(word); // <-- run punctuation replacement here
  let utter = new SpeechSynthesisUtterance(word);
  utter.voice = voices[document.getElementById("voiceSelect").value];
  utter.rate = 1;
  synth.speak(utter);
}

// Update word counter
function updateWordCounter() {
  document.getElementById("wordCounter").textContent =
    `${words.length - currentWordIndex} words remaining`;
}

document.getElementById("startBtn").addEventListener("click", startReading);

// Replace punctuation for speech
function replacePunctuation(word) {
  return word.replace(/,/g, ' comma')
             .replace(/\./g, ' period')
             .replace(/-/g, ' hyphen')
             .replace(/"/g, ' double quote')
             .replace(/'/g, ' apostrophe')
             .replace(/\?/g, ' question mark')
             .replace(/!/g, ' exclamation mark')
             .replace(/:/g, ' colon')
             .replace(/;/g, ' semicolon')
             .replace(/\(/g, ' open parenthesis')
             .replace(/\)/g, ' close parenthesis');
}

// Highlight current word in textarea


// Update word counter

// WASD key controls
document.addEventListener("keydown", (e) => {
  // Only work if we are reading AND textarea is NOT focused
  if (!isReading) return;
  if (document.activeElement === textInput) return;

  if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
    e.preventDefault();  // prevent default behavior of these keys
  }

  switch (e.key.toLowerCase()) {
    case "w":
      spellWord();
      break;
    case "a":
      if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordCounter();
        speakWord();
      }
      break;
    case "d":
      if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateWordCounter();
        speakWord();
      }
      break;
    case "s":
      speakWord();
      break;
  }
});

// Menu toggle
document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});

// Dark Mode toggle
document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Theme switching
document.getElementById("themeSelect").addEventListener("change", (e) => {
  document.body.className = "";
  document.body.classList.add(e.target.value);
});

// Help button
document.getElementById("helpBtn").addEventListener("click", () => {
  alert("W = Spell Word\nA = Previous Word\nS = Speak Word\nD = Next Word");
});

// About modal
document.getElementById("aboutBtn").addEventListener("click", () => {
  document.getElementById("aboutModal").style.display = "block";
});
document.getElementById("closeAbout").addEventListener("click", () => {
  document.getElementById("aboutModal").style.display = "none";
});

function saveNotes() {
  let noteContent = document.getElementById("noteArea").value;
  localStorage.setItem("savedNote", noteContent);
  alert("Note Saved!");
}

function loadNotes() {
  let savedNote = localStorage.getItem("savedNote");
  if (savedNote) {
    document.getElementById("noteArea").value = savedNote;
    alert("Note Loaded!");
  } else {
    alert("No saved note found.");
  }
}


// Start button
document.getElementById("startBtn").addEventListener("click", startReading);

// ParticlesJS init
particlesJS.load('particles-js', 'https://raw.githubusercontent.com/VinayakVispute/particle-effect/main/particles.json', function() {
  console.log('particles.json loaded...');
});




function playClick() {
  document.getElementById("clickSound").play();
}
tsParticles.load("tsparticles", {
  fpsLimit: 30,
  particles: {
    number: { value: 15},
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 250,
      color: "#ffffff",
      opacity: 0.5
    },
    move: { enable: true, speed: 1},
    size: { value: 2 }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 150 },
      push: { quantity: 1 }
    }
  }
});
function updateWordCount() {
  let text = document.getElementById("noteArea").value.trim();
  let words = text === "" ? 0 : text.split(/\s+/).length;
  document.getElementById("wordCount").textContent = `Words Remaining: ${words}`;
}



switchTheme("theme-textured");  // or whatever your theme class is
// Spell current word
function spellWord() {
  if (currentWordIndex >= words.length) return;
  let spelling = words[currentWordIndex].split("").join(", ");
  let spellUtter = new SpeechSynthesisUtterance(spelling);
  spellUtter.voice = voices[document.getElementById("voiceSelect").value];
  spellUtter.rate = parseFloat(document.getElementById("spellRateSlider").value);
  synth.cancel();
  synth.speak(spellUtter);
}