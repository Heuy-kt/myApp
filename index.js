const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const { on } = require('events');
const app = express();
const members = require('./Members');

// to send file like html pages and so on
// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
    })
); 

// set static folder instead
app.use(express.static(path.join(__dirname, 'public')));

// initiate body perser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

//select and configure port to listen in localhost
const PORT = process.env.pORT || 5001;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
