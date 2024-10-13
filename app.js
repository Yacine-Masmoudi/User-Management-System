require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env

const express = require('express'); // Importe le framework Express.js
const expressLayout = require('express-ejs-layouts'); // Importe le middleware pour gérer les layouts avec EJS
const flash = require('express-flash');
const session = require('express-session');
const connectDB = require('./server/config/db'); // Importe la fonction de connexion à la base de données
const methodOverride = require ('method-override');

const app = express(); // Crée une nouvelle instance de l'application Express
const port = process.env.PORT || 5001; // Définit le port sur lequel le serveur écoutera

// Connexion à la base de données
connectDB(); // Appelle la fonction pour se connecter à la base de données

app.use(express.urlencoded({ extended: true })); // Permet à l'application de traiter les données de formulaire envoyées via POST
app.use(express.json()); // Permet à l'application de traiter les requêtes avec un corps JSON
app.use(express.static('public')); // Définit 'public' comme le répertoire des fichiers statiques
app.use(methodOverride('_method'));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);

// Flash messages 
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(expressLayout); // Active le middleware pour les layouts EJS
app.set('layout', './layouts/main'); // Définit 'main.ejs' comme mise en page par défaut
app.set('view engine', 'ejs'); // Définit 'ejs' comme moteur de vue

// Routes
app.use('/', require('./server/routes/customer'));
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
