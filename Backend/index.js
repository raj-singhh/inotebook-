//Express Server

const connectTOMongo = require('./db');
const express = require('express')
const cors = require('cors')
connectTOMongo();

const app = express()
const port = process.env.PORT || 5000
app.use(cors({origin : "https://inotebook-frontend-cf1g.onrender.com" , credentials: true }))
//middleware --> to use req.body
app.use(express.json())

// Available routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})