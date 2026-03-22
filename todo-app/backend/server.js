require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title }
  tasks.push(task)
  res.json(task)
})

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id)
  res.json({ message: "Deleted" })
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000")
})