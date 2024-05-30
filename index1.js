const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const exampleEl = document.getElementById("example");
const audioEl = document.getElementById("audio");
const historyListEl = document.getElementById("history-list");

let searchHistory = [];

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      exampleEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      
      const example = result[0].meanings[0].definitions[0].example || "N/A";
      exampleEl.innerText = example;

      const phonetics = result[0].phonetics.find(p => p.audio);
      if (phonetics) {
        audioEl.src = phonetics.audio;
        audioEl.style.display = "inline-flex";
      } else {
        audioEl.style.display = "none";
      }
    }
    addToHistory(word);
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `An error occurred, please try again later.`;
  }
}

function addToHistory(word) {
  if (!searchHistory.includes(word)) {
    searchHistory.push(word);
    const li = document.createElement("li");
    li.textContent = word;
    li.addEventListener('click', () => fetchAPI(word));
    historyListEl.appendChild(li);
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

function speakText(title, meaning) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(`Word Title: ${title}. Meaning: ${meaning}`);
  synth.speak(utterance);
}


async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      exampleEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      
      const example = result[0].meanings[0].definitions[0].example || "N/A";
      exampleEl.innerText = example;

      const phonetics = result[0].phonetics.find(p => p.audio);
      if (phonetics) {
        audioEl.src = phonetics.audio;
        audioEl.style.display = "inline-flex";
        speakText(result[0].meanings[0].definitions[0].definition); // Speak the definition
      } else {
        audioEl.style.display = "none";
      }
    }
    addToHistory(word);
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `An error occurred, please try again later.`;
  }
}

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
speakText(titleEl.innerText, meaningEl.innerText);
