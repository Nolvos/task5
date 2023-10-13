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
  const storyContent = stories[currentStoryIndex].content.toLowerCase();

  // Fetch accuracy using the updated API URL
  const response = await fetch('https://task5-omega.vercel.app/api/check_accuracy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ spokenText, storyContent })
  });

  if (response.ok) {
    const result = await response.json();
    const accuracy = result.accuracy.toFixed(2);
    document.getElementById('accuracyResult').innerText = `Accuracy Result: ${accuracy}%`;
  } else {
    console.error('Failed to check accuracy:', response.statusText);
  }
}
