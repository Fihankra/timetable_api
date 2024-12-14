const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connections');
const departmentRoutes = require('./routes/department.route');
const courseRoutes = require('./routes/course.route');
const programRoutes = require('./routes/program.route');
const classRoutes = require('./routes/class.route');
const lecturerRoutes = require('./routes/lecturer.route');
const venueRoutes = require('./routes/venue.route');
const publishRoutes = require('./routes/publish.route');

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', departmentRoutes);
app.use('/api', programRoutes);
app.use('/api', courseRoutes);
app.use('/api', classRoutes);
app.use('/api', lecturerRoutes);
app.use('/api', venueRoutes);
app.use('/api', publishRoutes);

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
