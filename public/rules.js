// function displayQuote(data) {
//     fetch('https://api.quotable.io/random')
//       .then((response) => response.json())
//       .then((data) => {
//         const containerEl = document.querySelector('#quote');
  
//         const quoteEl = document.createElement('p');
//         quoteEl.classList.add('quote');
//         const authorEl = document.createElement('p');
//         authorEl.classList.add('author');
  
//         quoteEl.textContent = data.content;
//         authorEl.textContent = data.author;
  
//         containerEl.appendChild(quoteEl);
//         containerEl.appendChild(authorEl);
//     });
// }

// displayQuote()



function NorrisDisplay(data) {
    fetch('https://api.chucknorris.io/jokes/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
  
        quoteEl.textContent = data.value;
  
        containerEl.appendChild(quoteEl);
    });
}

NorrisDisplay()

// function dadDisplay(data) {
//     fetch('https://dad-jokes.p.rapidapi.com/random/joke')
//       .then((response) => response.json())
//       .then((data) => {
//         const containerEl = document.querySelector('#quote');
  
//         const quoteEl = document.createElement('p');
//         quoteEl.classList.add('quote');
//         const authorEl = document.createElement('p');
//         authorEl.classList.add('author');
  
//         quoteEl.textContent = data.setup;
//         authorEl.textContent = data.punchline;
  
//         containerEl.appendChild(quoteEl);
//         containerEl.appendChild(authorEl);
//     });
// }

// dadDisplay()