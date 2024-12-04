import { dictionary } from './dictionary.js';

const wordInput = document.getElementById('wordInput');
const translateBtn = document.getElementById('translateBtn');
const translationResult = document.getElementById('translationResult');
const wordTableBody = document.querySelector('#wordTable tbody');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const sortEnglishBtn = document.getElementById('sortEnglish');
const sortSpanishBtn = document.getElementById('sortSpanish');
const addWordForm = document.getElementById('addWordForm');

let currentCategory = 'all';

// Helper function to render words
function renderWords(category = 'all', sortBy = 'english') {
  wordTableBody.innerHTML = '';
  const words = category === 'all'
    ? Object.values(dictionary.categories).flat().filter(Boolean)
    : dictionary.categories[category] || [];

  words
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    .forEach(word => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${word.english}</td>
        <td>${word.spanish}</td>
        <td>${word.example}</td>
      `;
      wordTableBody.appendChild(row);
    });
}

// Translate functionality
translateBtn.addEventListener('click', () => {
  const inputWord = wordInput.value.trim();
  const direction = document.querySelector('input[name="tipTranslate"]:checked')?.value;
  
  if (!direction) {
    translationResult.textContent = 'Por favor, selecciona un idioma.';
    return;
  }

  const words = Object.values(dictionary.categories).flat();
  const foundWord = direction === 'en-to-es'
    ? words.find(w => w.english.toLowerCase() === inputWord.toLowerCase())
    : words.find(w => w.spanish.toLowerCase() === inputWord.toLowerCase());

  translationResult.textContent = foundWord
    ? direction === 'en-to-es' ? foundWord.spanish : foundWord.english
    : 'Palabra no encontrada.';
});

// Add word functionality
addWordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newWord = {
    id: Date.now(),
    english: document.getElementById('newEnglish').value.trim(),
    spanish: document.getElementById('newSpanish').value.trim(),
    example: document.getElementById('newExample').value.trim()
  };
  const category = document.getElementById('newCategory').value;

  // Validate category existence
  if (!dictionary.categories[category]) {
    dictionary.categories[category] = [];
  }

  // Check for duplicates
  const isDuplicate = dictionary.categories[category].some(
    word => word.english.toLowerCase() === newWord.english.toLowerCase() ||
            word.spanish.toLowerCase() === newWord.spanish.toLowerCase()
  );

  if (isDuplicate) {
    alert('La palabra ya existe en esta categoría.');
    return;
  }

  dictionary.categories[category].push(newWord);
  renderWords(currentCategory);
  addWordForm.reset(); // Reset the form
});

// Category filter
categoryRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderWords(currentCategory);
  });
});

// Sorting
sortEnglishBtn.addEventListener('click', () => renderWords(currentCategory, 'english'));
sortSpanishBtn.addEventListener('click', () => renderWords(currentCategory, 'spanish'));

// Initial render
renderWords();
