const express = require("express")
const books = require("./database_buku.json")
const app = express()
const port = 6000

//  built-in middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-


// menampilkan / get

app.get('/', (req, res) => {
    res.send('connect halo')
})


app.get('/api/v1/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/api/v1/books/:id', (req, res) => {
    const book = books.find(i => i.id === +req.params.id)
    res.status(200).json(book)
})



// post / menambah data

app.post('api/v1/books', (req, res) => {
    console.log(req.body)
    const {isbn, judul, sinopsis, penulis, genre} = req.body
    const id = books[books.length - 1].id + 1
    const book = {
        id, isbn, judul, sinopsis, penulis, genre
    }

    books.push(book)
    res.status(201).json(books)
})

// update

app.put('/api/v1/books/:id', (req,res) => {
    const id = req.params.id
    const book = books.find(i => i.id === +req.params.id)
    books.filter(book => {
        if (book.id == id) {
            book.isbn = req.body.isbn,
            book.judul = req.body.judul,
            book.sinopsis = req.body.sinopsis,
            book.penulis = req.body.penulis,
            book.genre = req.body.genre
            return book;
        }
    })
    res.status(200).json(books)
})


// delete
app.delete('/api/v1/books/:id', (req, res) => {
    const book = books.filter(i => i.id !== +req.params.id)
    return res.status(200).json(books)
})



// internal server error
app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        errors: err.message
    })
})

// 404 handler
app.use(function(err, req, res, next){
    res.status(404).json({
        status: 'fail',
        errors: 'anda tersasar?'
    })
})


app.listen(port, ()=> {
    console.log('Server connected at port 6000')
})
