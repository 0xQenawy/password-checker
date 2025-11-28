
//WORD LISTS FOR PASSPHRASES

const wordLists = {
  nouns: [
    'Ocean', 'Mountain', 'River', 'Forest', 'Desert', 'Island', 'Valley', 'Canyon',
    'Tiger', 'Eagle', 'Wolf', 'Dragon', 'Phoenix', 'Lion', 'Falcon', 'Panther',
    'Thunder', 'Lightning', 'Storm', 'Rainbow', 'Sunset', 'Sunrise', 'Moonlight',
    'Crystal', 'Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Silver', 'Gold',
    'Castle', 'Tower', 'Bridge', 'Palace', 'Temple', 'Garden', 'Meadow', 'Harbor',
    'Galaxy', 'Planet', 'Star', 'Comet', 'Nebula', 'Aurora', 'Eclipse', 'Horizon',
    'Music', 'Dance', 'Song', 'Melody', 'Rhythm', 'Harmony', 'Symphony', 'Jazz',
    'Book', 'Story', 'Legend', 'Mystery', 'Adventure', 'Journey', 'Quest', 'Dream'
  ],
  
  verbs: [
    'Runs', 'Jumps', 'Flies', 'Swims', 'Climbs', 'Dances', 'Sings', 'Plays',
    'Creates', 'Builds', 'Dreams', 'Explores', 'Discovers', 'Conquers', 'Shines',
    'Glows', 'Sparkles', 'Flows', 'Soars', 'Blazes', 'Radiates', 'Emerges'
  ],
  
  adjectives: [
    'Brave', 'Swift', 'Mighty', 'Noble', 'Wise', 'Bright', 'Bold', 'Great',
    'Silent', 'Golden', 'Silver', 'Mystic', 'Ancient', 'Hidden', 'Sacred',
    'Wild', 'Free', 'Pure', 'Strong', 'Calm', 'Fierce', 'Gentle', 'Happy'
  ],
  
  colors: [
    'Blue', 'Red', 'Green', 'Purple', 'Orange', 'Yellow', 'Pink', 'Violet',
    'Crimson', 'Azure', 'Emerald', 'Amber', 'Indigo', 'Scarlet', 'Jade'
  ]
};

const storyTemplates = [
  ['noun', 'verb', 'adjective', 'noun'],
  ['adjective', 'noun', 'verb', 'noun'],
  ['noun', 'verb', 'color', 'noun'],
  ['color', 'noun', 'verb', 'adjective']
];


//RANDOM PASSWORD CHARACTER SETS

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = 'il1Lo0O';

//DOM ELEMENTS


const generatedPassword = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');

const tabBtns = document.querySelectorAll('.tab-btn');
const passphraseOptions = document.getElementById('passphraseOptions');
const randomOptions = document.getElementById('randomOptions');

const passphraseStyleRadios = document.querySelectorAll('input[name="passphraseStyle"]');
const customWordSection = document.getElementById('customWordSection');
const customWordInput = document.getElementById('customWord');
const wordCountSlider = document.getElementById('wordCount');
const wordCountValue = document.getElementById('wordCountValue');
const capitalizeWordsCheckbox = document.getElementById('capitalizeWords');
const addNumbersCheckbox = document.getElementById('addNumbers');
const addSymbolsCheckbox = document.getElementById('addSymbols');

const randomLengthSlider = document.getElementById('randomLength');
const randomLengthValue = document.getElementById('randomLengthValue');
const randomUppercaseCheckbox = document.getElementById('randomUppercase');
const randomLowercaseCheckbox = document.getElementById('randomLowercase');
const randomNumbersCheckbox = document.getElementById('randomNumbers');
const randomSymbolsCheckbox = document.getElementById('randomSymbols');
const excludeSimilarCheckbox = document.getElementById('excludeSimilar');

let currentMode = 'passphrase'; 

// 4. UTILITY FUNCTIONS

function getRandomItem(array) {
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  return array[randomArray[0] % array.length];
}

function getRandomNumber(min, max) {
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  return min + (randomArray[0] % (max - min + 1));
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const j = randomArray[0] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 5. PASSPHRASE GENERATION

function generatePassphrase() {
  const style = document.querySelector('input[name="passphraseStyle"]:checked').value;
  const wordCount = parseInt(wordCountSlider.value);
  const capitalize = capitalizeWordsCheckbox.checked;
  const includeNumbers = addNumbersCheckbox.checked;
  const includeSymbols = addSymbolsCheckbox.checked;
  
  let words = [];
  
  if (style === 'custom') {
    // Mix user's word with random words
    words = generateCustomPassphrase(wordCount, capitalize);
  } else if (style === 'random') {
    // Completely random words
    words = generateRandomWordsPassphrase(wordCount, capitalize);
  } else if (style === 'story') {
    // Story-style passphrase
    words = generateStoryPassphrase(capitalize);
  }
  
  // Build the passphrase with SIMPLE, CONSISTENT pattern
  let passphrase = '';
  const mainSeparator = includeSymbols ? getRandomItem(['-', '_']) : '-';
  
  // Pattern: Word-Word-Word-Number! (consistent and memorable)
  for (let i = 0; i < words.length; i++) {
    passphrase += words[i];
    
    if (i < words.length - 1) {
      // Always use the SAME separator for consistency
      passphrase += mainSeparator;
    }
  }
  
  // Add ONE number at the end (not scattered)
  if (includeNumbers) {
    passphrase += mainSeparator + getRandomNumber(2, 99);
  }
  
  // Add ONE final symbol if enabled
  if (includeSymbols) {
    const endSymbols = ['!', '@', '#'];
    passphrase += getRandomItem(endSymbols);
  }
  
  return passphrase;
}

function generateCustomPassphrase(wordCount, capitalize) {
  const customWord = customWordInput.value.trim();
  const words = [];
  
  // Get random words
  for (let i = 0; i < wordCount; i++) {
    words.push(getRandomItem(wordLists.nouns));
  }
  
  // If user provided a word, insert it at a random position
  if (customWord.length > 0) {
    const insertPosition = getRandomNumber(0, words.length - 1);
    const formattedCustomWord = capitalize 
      ? customWord.charAt(0).toUpperCase() + customWord.slice(1).toLowerCase()
      : customWord;
    words[insertPosition] = formattedCustomWord;
  }
  
  return words.map(word => {
    if (capitalize && !word.includes(customWord)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
}

function generateRandomWordsPassphrase(wordCount, capitalize) {
  const words = [];
  const allWords = [...wordLists.nouns, ...wordLists.adjectives];
  
  for (let i = 0; i < wordCount; i++) {
    let word = getRandomItem(allWords);
    if (!capitalize) {
      word = word.toLowerCase();
    }
    words.push(word);
  }
  
  return words;
}

function generateStoryPassphrase(capitalize) {
  const template = getRandomItem(storyTemplates);
  const words = [];
  
  for (const type of template) {
    let word;
    if (type === 'noun') {
      word = getRandomItem(wordLists.nouns);
    } else if (type === 'verb') {
      word = getRandomItem(wordLists.verbs);
    } else if (type === 'adjective') {
      word = getRandomItem(wordLists.adjectives);
    } else if (type === 'color') {
      word = getRandomItem(wordLists.colors);
    }
    
    if (!capitalize) {
      word = word.toLowerCase();
    }
    
    words.push(word);
  }
  
  return words;
}


//RANDOM PASSWORD GENERATION

function generateRandomPassword() {
  const length = parseInt(randomLengthSlider.value);
  const useUppercase = randomUppercaseCheckbox.checked;
  const useLowercase = randomLowercaseCheckbox.checked;
  const useNumbers = randomNumbersCheckbox.checked;
  const useSymbols = randomSymbolsCheckbox.checked;
  const excludeSimilar = excludeSimilarCheckbox.checked;

  let charset = '';
  let requiredChars = [];

  if (useUppercase) {
    let upper = UPPERCASE;
    if (excludeSimilar) {
      upper = upper.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    charset += upper;
    requiredChars.push(upper);
  }

  if (useLowercase) {
    let lower = LOWERCASE;
    if (excludeSimilar) {
      lower = lower.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    charset += lower;
    requiredChars.push(lower);
  }

  if (useNumbers) {
    let nums = NUMBERS;
    if (excludeSimilar) {
      nums = nums.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    charset += nums;
    requiredChars.push(nums);
  }

  if (useSymbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS);
  }

  if (charset.length === 0) {
    alert('Please select at least one character type!');
    return null;
  }

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  let ensuredChars = '';
  if (requiredChars.length > 0) {
    for (let i = 0; i < requiredChars.length; i++) {
      const charSet = requiredChars[i];
      const randomIndex = array[i] % charSet.length;
      ensuredChars += charSet[randomIndex];
    }
  }

  let password = '';
  for (let i = ensuredChars.length; i < length; i++) {
    const randomIndex = array[i] % charset.length;
    password += charset[randomIndex];
  }

  return shuffleString(ensuredChars + password);
}

function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const j = randomArray[0] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}


//COPY TO CLIPBOARD

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied!';
    copyBtn.style.background = '#10ac84';
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = '';
    }, 2000);
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy';
      }, 2000);
    } catch (err) {
      alert('Failed to copy. Please copy manually.');
    }
    
    document.body.removeChild(textarea);
  }
}

//EVENT LISTENERS

// Tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    
    // Update active tab
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show/hide options
    if (tab === 'passphrase') {
      currentMode = 'passphrase';
      passphraseOptions.style.display = 'block';
      randomOptions.style.display = 'none';
    } else {
      currentMode = 'random';
      passphraseOptions.style.display = 'none';
      randomOptions.style.display = 'block';
    }
  });
});

// Show/hide custom word input based on style
passphraseStyleRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'custom') {
      customWordSection.style.display = 'block';
    } else {
      customWordSection.style.display = 'none';
    }
  });
});

// Update slider values
wordCountSlider.addEventListener('input', () => {
  wordCountValue.textContent = wordCountSlider.value;
});

randomLengthSlider.addEventListener('input', () => {
  randomLengthValue.textContent = randomLengthSlider.value;
});

// Generate button
generateBtn.addEventListener('click', () => {
  let password;
  
  if (currentMode === 'passphrase') {
    password = generatePassphrase();
  } else {
    password = generateRandomPassword();
  }
  
  if (password) {
    generatedPassword.value = password;
    generatedPassword.select();
  }
});

// Copy button
copyBtn.addEventListener('click', () => {
  const password = generatedPassword.value;
  if (password && password !== "Click 'Generate' to create") {
    copyToClipboard(password);
  } else {
    alert('Generate a password first!');
  }
});

// Prevent all checkboxes from being unchecked (random mode)
const randomCheckboxes = [
  randomUppercaseCheckbox, 
  randomLowercaseCheckbox, 
  randomNumbersCheckbox, 
  randomSymbolsCheckbox
];

randomCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const checkedCount = randomCheckboxes.filter(cb => cb.checked).length;
    if (checkedCount === 0) {
      checkbox.checked = true;
      alert('At least one character type must be selected!');
    }
  });
});


//INITIALIZATION

window.addEventListener('DOMContentLoaded', () => {
  // Generate initial passphrase
  const password = generatePassphrase();
  if (password) {
    generatedPassword.value = password;
  }
  
  console.log('Password & Passphrase Generator v2.0 initialized');
  console.log('Now with memorable passphrase support!');
});