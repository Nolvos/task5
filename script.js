const stories = [
  {
    title: 'The Lion and the Rabbit',
    content: `Once there was a Lion in the jungle`,
  },
  {
    title: 'The Hunter and the Pigeons',
    content: `One day a hunter sets a net to catch birds`,
  },
  // Add more stories in a similar format
];

let currentStoryIndex = 0;

function displayNextStory() {
  const storyCard = document.getElementById('story-card');
  const storyTitle = document.getElementById('story-title');
  const storyContent = document.getElementById('story-content');

  storyTitle.innerText = stories[currentStoryIndex].title;
  storyContent.innerText = stories[currentStoryIndex].content;

  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
}

// Display the first story initially
displayNextStory();

// Initialize speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

document.getElementById('startRecording').addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  console.log('Spoken text:', spokenText);
  document.getElementById('spokenText').innerText = `Spoken Text: ${spokenText}`;
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

async function checkAccuracy() {
    const spokenText = document.getElementById('spokenText').innerText.split(':')[1].trim().toLowerCase();
    console.log('Spoken text:', spokenText);

    const storyContent = stories[currentStoryIndex].content.toLowerCase();
    console.log('Story content:', storyContent);

    const spokenWords = spokenText.split(' ');
    console.log('Spoken words:', spokenWords);

    const storyWords = storyContent.split(' ');
    console.log('Story words:', storyWords);

    let matchedWords = 0;

    // Count the number of words that match between spoken text and story content (case-insensitive)
    for (const spokenWord of spokenWords) {
        const normalizedSpokenWord = spokenWord.toLowerCase();
        if (storyWords.includes(normalizedSpokenWord)) {
            matchedWords++;
        }
    }

    const totalWords = Math.max(spokenWords.length, storyWords.length);  // Take the maximum number of words
    const accuracy = (matchedWords / totalWords) * 100;
    console.log('Matched words:', matchedWords);
    console.log('Total words:', totalWords);
    console.log('Accuracy:', accuracy);

    // Display the opposite story accuracy
    const oppositeAccuracy = 100 - accuracy;

    document.getElementById('accuracyResult').innerText = `Accuracy Result: ${oppositeAccuracy.toFixed(2)}%`;
}
