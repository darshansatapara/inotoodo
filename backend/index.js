const connectToMongo= require('./db');
const { query } = require('express-validator');
const express = require('express')
const app = express();

app.use(express.json())

connectToMongo();
const port = 5000;

app.use('/api/auth',require('./routs/auth'))
app.use('/api/notes',require('./routs/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})