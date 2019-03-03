var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

if (process.env.NODE_ENV === "development") {
    const open = require('opn');
}

var port = process.env.PORT || 8080;

//Les trois films de base
global.MOVIES = [
    {
        id: 1,
        title: "The Revenant",
        year: 2015,
        language: 'Anglais',
        director: {
            name: "Alejandro González Iñárritu",
            nationality: "Mexicain",
            birthdate: "1963-08-15"
        },
        poster: 'theRevenant.jpg',
        genre: 'Drame/Thriller',
        ratings: [4, 3, 3]
    },
    {
        id: 2,
        title: "Intouchables",
        year: 2011,
        language: 'Français',
        director: {
            name: "Olivier Nakache et Éric Toledano",
            nationality: "Français",
            birthdate: "1973-04-15 et 1971-07-03"
        },
        poster: 'intouchables.jpg',
        genre: 'Drame/Comédie dramatique',
        ratings: [5, 4]
    },
    {
        id: 3,
        title: "Seul sur Mars",
        year: 2015,
        language: 'Français',
        director: {
            name: "Ridley Scott",
            nationality: "Britannique",
            birthdate: "1937-11-30"
        },
        poster: 'seulSurMars.jpg',
        genre: 'Science-fiction',
        ratings: [5, 5, 5, 5]
    }
];

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log(`App listening on port ${port}...`);

var apiRoutes = require('./routes.js');
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
})

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/dist/index.html'));
});

if (process.env.NODE_ENV === "development") {
    open(`http://localhost:${port}`).catch(() => {
      log.warn(`Failed to open browser automatically.`);
    });
}