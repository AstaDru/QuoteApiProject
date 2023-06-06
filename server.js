const express = require('express');

const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;


app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomElement =   getRandomElement(quotes)
  //const randomQuote = quotes[randomElement]
  
  res.send({quote: randomElement})
})

app.get("/api/quotes", (req, res, next) => {
    let personQuotes = []
    const queryPerson = req.query.person
    if (queryPerson){
      
        for (let i=0; i < quotes.length; i++){
            if (quotes[i].person === queryPerson){
                personQuotes.push(quotes[i])
            }
        }
    }
    else {
      personQuotes.push(...quotes)
    }
    res.send({quotes: personQuotes})
})
app.post("/api/quotes", (req, res, next)=>{
  const queryPerson = req.query.person
  const queryQuote= req.query.quote
  if (queryPerson && queryQuote){
    quotes.push({person:queryPerson, quote: queryQuote })
    res.send({quote: {person:queryPerson, quote: queryQuote }})
  }
  else {
    res.status(400).send()
  }
})

app.listen(3000, ()=>{})

