
// COMMON DATABASES

const commonArabicNames = [
  'mohamed', 'mohammed', 'muhammad', 'ahmed', 'mahmoud', 'mustafa',
  'abdelrahman', 'abdulrahman', 'abdelrhman', 'abdel', 'omar', 'ali', 
  'hassan', 'hussein', 'youssef', 'yousef', 'joseph', 'amr', 'khaled', 
  'khalid', 'ibrahim', 'ismail', 'adam', 'yahya', 'yassin', 'karim', 
  'kareem', 'waleed', 'walid', 'tamer', 'tarek', 'sherif', 'sameh',
  'sara', 'sarah', 'fatima', 'fatma', 'mariam', 'maryam', 'aisha',
  'aya', 'nour', 'noor', 'dina', 'dena', 'hana', 'rana', 'salma',
  'layla', 'leila', 'yasmine', 'jasmine', 'nada', 'reem', 'rim'
];

const commonEnglishNames = [
  'john', 'james', 'robert', 'michael', 'william', 'david', 'richard',
  'joseph', 'thomas', 'charles', 'christopher', 'daniel', 'matthew',
  'anthony', 'donald', 'mark', 'paul', 'steven', 'andrew', 'kenneth',
  'mary', 'patricia', 'jennifer', 'linda', 'barbara', 'elizabeth', 
  'susan', 'jessica', 'sarah', 'karen', 'nancy', 'lisa', 'betty',
  'margaret', 'sandra', 'ashley', 'dorothy', 'kimberly', 'emily'
];

const commonWords = [
  'password', 'admin', 'user', 'login', 'welcome', 'letmein',
  'qwerty', 'abc123', 'password123', 'admin123', '123456',
  'iloveyou', 'princess', 'monkey', 'dragon', 'master',
  'sunshine', 'shadow', 'football', 'baseball', 'superman',
  'trustno1', 'access', 'root', 'test', 'guest'
];

// DOM ELEMENTS

const pw = document.getElementById('pw');
const barFill = document.getElementById('barFill');
const summary = document.getElementById('summary');
const details = document.getElementById('details');
const lengthEl = document.getElementById('length');
const entropyEl = document.getElementById('entropy');
const cracktimeEl = document.getElementById('cracktime');
const charAnalysisEl = document.getElementById('charAnalysis');
const issuesEl = document.getElementById('issues');
const feedbackEl = document.getElementById('feedback');
const toggle = document.getElementById('toggleReveal');


// LEETSPEAK NORMALIZATION

/**
 * Convert leetspeak to normal characters
 * This helps detect names even with symbol substitutions
 */
function normalizeLeetspeak(password) {
  const leetMap = {
    '@': 'a', '4': 'a', 
    '3': 'e', 
    '1': 'i', '!': 'i',
    '0': 'o',
    '$': 's', '5': 's',
    '7': 't',
    '8': 'b',
    '9': 'g'
  };
  
  let normalized = password.toLowerCase();
  for (const [leet, normal] of Object.entries(leetMap)) {
    normalized = normalized.split(leet).join(normal);
  }
  
  return normalized;
}

// ADVANCED PASSWORD ANALYSIS

function advancedPasswordAnalysis(password) {
  const issues = [];
  const recommendations = [];
  let baseScore = 0; 

  const lowerPw = password.toLowerCase();
  const normalizedPw = normalizeLeetspeak(password);

  // Check for names (with leetspeak normalization)

  const foundArabicName = commonArabicNames.find(name => {
  if (name.length <= 3) {
    return normalizedPw === name || normalizedPw === name + '123'; 
  }
  return normalizedPw.includes(name);
});
  
  const foundEnglishName = commonEnglishNames.find(name => 
    normalizedPw.includes(name) || lowerPw.includes(name)
  );
  
  if (foundArabicName) {
    issues.push(`❌ Contains Arabic name: "${foundArabicName}"`);
    recommendations.push('NEVER use names - hackers check these first');
    return { issues, recommendations, finalScore: 0 }; 
  }
  
  if (foundEnglishName) {
    issues.push(`❌ Contains English name: "${foundEnglishName}"`);
    recommendations.push('NEVER use names - extremely predictable');
    return { issues, recommendations, finalScore: 0 }; 
  }

  // Check for common words
  const foundWord = commonWords.find(word => lowerPw.includes(word));
  if (foundWord) {
    issues.push(`❌ Contains common word: "${foundWord}"`);
    recommendations.push('Avoid dictionary words entirely');
    return { issues, recommendations, finalScore: 0 };
  }

  // LENGTH EVALUATION 
  
  if (password.length < 8) {
    issues.push('❌ Too short (minimum 8 characters)');
    recommendations.push('Use at least 12 characters');
    baseScore = 0;
  } else if (password.length >= 8 && password.length < 12) {
    baseScore = 1;
    recommendations.push('Consider 12+ characters for better security');
  } else if (password.length >= 12 && password.length < 16) {
    baseScore = 2;
  } else if (password.length >= 16) {
    baseScore = 3;
  }
  if (password.length > 20) {
    baseScore += 1;
  }

  // CHARACTER DIVERSITY
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const diversityCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  if (diversityCount < 3) {
    if (password.length <= 20) {
        issues.push('⚠️ Lacks character diversity');
        baseScore = Math.max(0, baseScore - 1);}
    if (!hasUpper) recommendations.push('Add uppercase letters (A-Z)');
    if (!hasNumber) recommendations.push('Add numbers (0-9)');
    if (!hasSymbol) recommendations.push('Add symbols (!@#$%^&*)');
  } else if (diversityCount === 4) {
    baseScore = Math.min(4, baseScore + 1); // Bonus for all types
  }
  
  // Repeated characters (aaa, 111)

  if (/(.)\1{2,}/.test(password)) {
    issues.push('⚠️ Contains repeated characters (aaa, 111)');
    baseScore = Math.max(0, baseScore - 1);
    recommendations.push('Avoid repeating characters');
  }

  // Sequential numbers (123, 456, 789)
  if (/012|123|234|345|456|567|678|789|890/.test(password)) {
    issues.push('⚠️ Contains sequential numbers');
    baseScore = Math.max(0, baseScore - 1);
    recommendations.push('Avoid sequential patterns like 123');
  }

  // Keyboard patterns (qwerty, asdf)
  if (/qwer|asdf|zxcv|wasd|qaz|wsx/i.test(password)) {
    issues.push('⚠️ Contains keyboard pattern');
    baseScore = Math.max(0, baseScore - 1);
    recommendations.push('Avoid keyboard patterns (qwerty, asdf)');
  }

  // Year check (1900-2029)
  if (/19\d{2}|20[0-2]\d/.test(password)) {
    issues.push('⚠️ Contains a year (birth year?)');
    baseScore = Math.max(0, baseScore - 1);
    recommendations.push('Avoid dates and birth years');
  }

  // Simple number suffix (password ending with 1-3 digits)
  if (/\d{1,3}$/.test(password)) {
    issues.push('⚠️ Ends with simple numbers');
    baseScore = Math.max(0, baseScore - 1);
    recommendations.push('Avoid adding simple numbers at the end');
  }

  // Only letters or only numbers
  if (/^[a-zA-Z]+$/.test(password)) {
    issues.push('⚠️ Contains only letters');
    baseScore = Math.max(0, baseScore - 1);
  }
  
  if (/^[0-9]+$/.test(password)) {
    issues.push('❌ Contains only numbers');
    return { issues, recommendations, finalScore: 0 };
  }
  
  // If password is just a word with @ or numbers substituted
  if (/@/.test(password) || /[0-9]/.test(password)) {
    const simplified = password.replace(/[@!$0-9]/g, '');
    if (simplified.length >= 5 && /^[a-zA-Z]+$/.test(simplified)) {
      if (normalizedPw !== lowerPw) {
        issues.push('⚠️ Simple character substitution detected');
        baseScore = Math.max(1, baseScore - 1);
        recommendations.push('Use truly random characters instead of substitutions');
      }
    }
  }

  return { 
    issues, 
    recommendations, 
    finalScore: Math.max(0, Math.min(4, baseScore))
  };
}

// CHARACTER ANALYSIS

function getCharacterAnalysis(password) {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const parts = [];
  if (hasLower) parts.push('lowercase');
  if (hasUpper) parts.push('UPPERCASE');
  if (hasNumber) parts.push('numbers');
  if (hasSymbol) parts.push('symbols');

  return parts.length > 0 ? parts.join(', ') : 'None';
}

// UI UPDATE FUNCTION

function updateUI(result, analysis) {
  const finalScore = analysis.finalScore;

  const barClasses = ['weak', 'weak', 'medium', 'strong', 'very-strong'];
  barFill.className = barClasses[finalScore];
  barFill.style.width = (20 * (finalScore + 1)) + '%';

  const messages = [
    'Very Weak — Easily Guessed ❌',
    'Weak — Needs Improvement ⚠️',
    'Medium — Could Be Better 🟡',
    'Strong — Good ✓',
    'Very Strong — Excellent ✅'
  ];
  summary.textContent = `${messages[finalScore]} (Score: ${finalScore}/4)`;
  lengthEl.textContent = `${pw.value.length} characters`;
  charAnalysisEl.textContent = getCharacterAnalysis(pw.value);
  // Update entropy
  const entropyBits = result.guesses_log10 
    ? (result.guesses_log10 * 3.32).toFixed(2) 
    : '-';
  entropyEl.textContent = `${entropyBits} bits`;
  cracktimeEl.textContent = result.crack_times_display.online_no_throttling_10_per_second || '—';

  if (analysis.issues.length > 0) {
    issuesEl.innerHTML = analysis.issues
      .map(issue => `<span class="error">${issue}</span>`)
      .join(' ');
  } else {
    issuesEl.innerHTML = '<span class="success">✓ No major issues found</span>';
  }

  if (analysis.recommendations.length > 0) {
    feedbackEl.textContent = analysis.recommendations
      .slice(0, 3)
      .join('. ') + '.';
  } else {
    feedbackEl.innerHTML = '<span class="success">✓ Excellent! This is a strong password.</span>';
  }

  // Show details section
  details.style.display = 'block';
}

// EVENT LISTENERS
pw.addEventListener('input', () => {
  const value = pw.value || '';
  
  if (!value) {
    summary.textContent = 'Waiting for input...';
    details.style.display = 'none';
    barFill.style.width = '0%';
    barFill.className = '';
    return;
  }

  const zxcvbnResult = zxcvbn(value);
  const advancedAnalysis = advancedPasswordAnalysis(value);
  
  updateUI(zxcvbnResult, advancedAnalysis);
});

toggle.addEventListener('click', () => {
  if (pw.type === 'password') {
    pw.type = 'text';
    toggle.textContent = '🙈 Hide Password';
  } else {
    pw.type = 'password';
    toggle.textContent = '👁️ Show Password';
  }
});

console.log('Password Strength Checker v2.0 initialized');
console.log('Enhanced with leetspeak detection and stricter scoring');