const router = require('express').Router()
const path = require('path');
const fs = require('fs');

//get notes
router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

//post note
router.post('/api/notes', (req, res) => {
  const item = req.body
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const items = JSON.parse(data)
    console.log(items)
    items.push(item)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

//delete note
router.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    console.log(req.params.id)
    const notes = JSON.parse(data)
    console.log(notes)
    //delete note by filtering it out of array
    const newNotes = notes.filter(item => item.id != req.params.id)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(newNotes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

module.exports = router