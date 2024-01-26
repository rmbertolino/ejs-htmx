const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

let products = [
    { id: 1, name: 'Producto 1', price: 20.99 },
    { id: 2, name: 'Producto 2', price: 15.49 },
    { id: 3, name: 'Producto 3', price: 30.00 },
    { id: 4, name: 'Producto 4', price: 25.99 },
    { id: 5, name: 'Producto 5', price: 10.00 },
    { id: 6, name: 'Producto 6', price: 18.75 },
    { id: 7, name: 'Producto 7', price: 22.50 },
    { id: 8, name: 'Producto 8', price: 12.99 },
    { id: 9, name: 'Producto 9', price: 28.95 },
    { id: 10, name: 'Producto 10', price: 15.00 }
  ];



app.get('/', (req,res) => {
    res.render("index.ejs")
})

app.post('/clicked', (req,res) => {
    res.json({"hello":"world"})
})

app.get('/products', (req, res) => {
    console.log(req.query)
    const nameFromQuery = req.query.productname
    if(!nameFromQuery){
        res.json(products)
    }
    const result = products.filter(p => p.name.toLocaleLowerCase().includes(nameFromQuery.toLocaleLowerCase()))
    res.json(result)
})

app.post('/products', (req, res) => {
    console.log(req.body)
    const name = req.body.productname
    const id = Date.now()
    products = [{id, name}, ...products]
    res.json({ msg: `Product with id ${id} created`}).status(201)
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})