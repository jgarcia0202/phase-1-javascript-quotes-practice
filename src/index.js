const quotesURL = `http://localhost:3000/quotes?_embed=likes`
const quotesList = document.querySelector('#quote-list')
const newQuoteForm = document.querySelector('#new-quote-form')

document.addEventListener('DOMContentLoaded', e =>{
    fetchQuotes()
    newQuoteForm.addEventListener('submit', e => {
        e.preventDefault()
        let quoteName = document.querySelector('#new-quote').value
        let quoteAuthor = document.querySelector('#author').value
        let newQuote = {
            'quote': quoteName,
            'author': quoteAuthor,
            'likes': { }
        }
        listQuote(newQuote)
        addQuote(newQuote)
        console.log(quoteName)
    })
})

function fetchQuotes() {
    fetch(quotesURL)
    .then(resp => resp.json())
    .then(quotes => quotes.forEach(quote =>listQuote(quote)))
}
const addQuote = (quote) => {
    fetch(quotesURL,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    })
}
const deleteQuote = (quote) => {
    fetch(`http://localhost:3000/quotes/${quote.id}?_embed=likes`, {
        method: 'DELETE',
        body: quote
    })
}
function likeQuote(quote){
    fetch(`http://localhost:3000/likes`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'amount': 0,
            'quoteId': quote.id,
            'createdAt': ''
        })

    })
    
    console.log(quote.likes)
}
function listQuote(quote){
    likesArray = quote.likes[0]
    let card = document.createElement('ul')
    let deleteBtn = document.createElement('button')
    let likesBtn = document.createElement('button')
    deleteBtn.classList = 'btn-danger'
    likesBtn.classList = 'btn-success'
    deleteBtn.textContent = 'Delete'
    likesBtn.innerHTML = `Likes: <span>0</span></button>`
    card.innerHTML = (`
    <li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}.</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
    </blockquote>
  </li>
    `)
    card.appendChild(likesBtn)
    card.appendChild(deleteBtn)
    quotesList.appendChild(card)
    deleteBtn.addEventListener('click', e => {
        deleteQuote(quote)
    })
    likesBtn.addEventListener('click', e => {
        likeQuote(quote)
    })
    console.log(likesArray)
}
//console.log(quoteName)