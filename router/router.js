let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let ArticlesController = require('./../controllers/ArticlesController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');



// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:lettre', VipController.DetailLettre);
    app.get('/repertoire/:lettre/:numStar', VipController.DetailStar);

// articles
    app.get('/articles', ArticlesController.articlesAll);
    app.get('/articles/:numStar', ArticlesController.articlesVip);

// albums
    app.get('/album', AlbumController.ListerAlbum);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
