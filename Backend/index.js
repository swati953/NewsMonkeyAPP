const express = require('express')
const connectToMongo = require('./db.js');
var cors = require('cors');
connectToMongo();
const app = express()
const port = 5000;

app.use(cors());
// app.get('/', (req, res) => {
//     res.send('Hello home!')
// })

app.use(express.json());
//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));

app.listen(port, () => {
    console.log(`NewsMonkeyApp listening at http://localhost:${port}`)
})