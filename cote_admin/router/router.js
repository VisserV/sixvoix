let ConnexionController = require('./../controllers/ConnexionController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', ConnexionController.Index);
    app.get('/connexion', ConnexionController.Index);

// tout le reste
    app.get('*', ConnexionController.NotFound);
    app.post('*', ConnexionController.NotFound);

};
