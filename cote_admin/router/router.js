let ConnexionController = require('./../controllers/ConnexionController');
let HomeController = require('./../controllers/HomeController');
let PhotosController =  require('./../controllers/PhotosController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/Home', HomeController.Index);

//Connexion
    app.post('/Connexion', ConnexionController.Connexion);
    app.get('/PageConnexion', ConnexionController.testConnexion);
    app.get('/Deconnexion', ConnexionController.Deconnexion);

//Photos
    app.get('/Photos', ConnexionController.testConnexion, PhotosController.photos);

    //Ajouter
        app.get('/Photos/AjouterTest', ConnexionController.testConnexion, PhotosController.AjouterPhotoTest);
        app.post('/Photos/Ajouter', ConnexionController.testConnexion, PhotosController.AjouterPhoto);

    //Supprimer
        app.get('/Photos/SupprimerTest', ConnexionController.testConnexion, PhotosController.SupprimerPhotoTest);
        app.post('/Photos/Selectionner', ConnexionController.testConnexion, PhotosController.SelectionnerPhoto);
        app.post('/Photos/Supprimer/:vipNum', ConnexionController.testConnexion, PhotosController.SupprimerPhoto);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
