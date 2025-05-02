const textArea = document.getElementById("text");
const voiceSelect = document.getElementById("voices");
const speakButton = document.getElementById("speak");

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = ''; // Clear any existing voices
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}


loadVoices();

speakButton.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(textArea.value);
  const selectedVoice = voiceSelect.value;
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
  speechSynthesis.speak(utterance);
});