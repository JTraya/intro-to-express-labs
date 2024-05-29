const express = require('express')

const app = express()

function getRandomNumber(number){
    return Math.floor(Math.random() * number + 1)
}

app.get('/', (req, res) => {
    res.send('<h1>. . . Server Online . . .<h1/>')
})

app.get('/greetings/:username', (req, res) => {
    res.send(`Nice to see you again, ${req.params.username}!`)
})

app.get('/roll/:number', (req, res) => {
    const numParam = parseInt(req.params.number)
    if (!isNaN(numParam)) {
        res.send(`You rolled ${getRandomNumber(numParam)}!`)
    } else {
        res.send('You must specify a number.')
    }
})

app.get('/collectibles/:indexNum', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
      const indexNumParam = req.params.indexNum
      if (indexNumParam >= 0 && indexNumParam < collectibles.length) {
        res.send(`Oh, the ${collectibles[indexNumParam].name}? Price is $${collectibles[indexNumParam].price}.`)
      } else {
        res.send('Item coming in stock soon! Check back later!')
      }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price']
    const maxPrice = req.query['max-price']
    const type = req.query.type
    let filterShoes = shoes
    if (minPrice) {
        filterShoes = filterShoes.filter((shoe) => shoe.price >= minPrice)
    }
    if (maxPrice) {
        filterShoes = filterShoes.filter((shoe) => shoe.price <= maxPrice)
    }
    if (type) {
        filterShoes = filterShoes.filter((shoe) => shoe.type === type)
    } 
    filterShoes = filterShoes.map((shoe) => {
        return `<li>Shoe Name: ${shoe.name} Price: $${shoe.price} Type: ${shoe.type}</li>`
    })
    res.send(`<ul>${filterShoes}</ul>`)
})


app.listen(3000, () => {
    console.log('Server Listening on port 3000')
})