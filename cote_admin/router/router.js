let ConnexionController = require('./../controllers/ConnexionController');
let HomeController = require('./../controllers/HomeController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/Home', HomeController.Index);

//Connexion
    app.post('/Connexion', ConnexionController.Connexion);
    app.get('/PageConnexion', ConnexionController.testConnexion);
    app.get('/Deconnexion', ConnexionController.Deconnexion);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
