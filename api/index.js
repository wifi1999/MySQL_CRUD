const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20030919aa",
    database: "test"
})

app.use(express.json())
app.use(cors())

// CREATE
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, values, (err, data) => {
        if(err) return res.json(err);
        return res.json({ "message": "Book has been created successfully" });
    });
});

// READ 
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// UPDATE
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json({ "message": "Book has been updated successfully" });
    });

})

// DELETE
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json({ "message": "Book has been deleted successfully" });
    });

})

app.listen(8080, () => {
    console.log("Connected to backend!")
})