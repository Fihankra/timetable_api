const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connections');
const departmentRoutes = require('./routes/department.route');
const programCourseRoute = require('./routes/courses/program.course.route');
const programRoutes = require('./routes/program.route');
const classRoutes = require('./routes/class.route');
const lecturerRoutes = require('./routes/lecturer.route');
const venueRoutes = require('./routes/venue.route');
const publishRoutes = require('./routes/publish.route');
const configRoutes = require('./routes/config.route');
const electivesCourseRoutes = require('./routes/courses/electives.course.route');
const liberalCourseRoutes = require('./routes/courses/liberal.course.route');
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json({ limit: '400mb' }));
app.use(express.urlencoded({ limit: '400mb', extended: false }));

app.use('/api', configRoutes);
app.use('/api', departmentRoutes);
app.use('/api', programRoutes);
app.use('/api', programCourseRoute);
app.use('/api', classRoutes);
app.use('/api', electivesCourseRoutes);
app.use('/api', liberalCourseRoutes);
app.use('/api', lecturerRoutes);
app.use('/api', venueRoutes);
app.use('/api', publishRoutes);
app.use('/api/check', (req, res) => {
    res.json({ status: true, message: "Server is up and running", data: [] });;
});

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

const PORT = 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
