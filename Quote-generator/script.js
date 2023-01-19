'use strict';

//Show new quote
function newQuote() {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 
    quote.innerHTML = newQuote.text;
    author.innerHTML = newQuote.author;

}

let apiQuotes = [];

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        return apiQuotes;
    } catch (error) {
         console.log(error);
    }
}


//On load
getQuotes();

