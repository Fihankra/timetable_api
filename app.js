const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connections');

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/department.route'));


app.use('*', (req, res, next) => {
    res.send('Connected');
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});
//check if db is connected
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});



const PORT = 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
