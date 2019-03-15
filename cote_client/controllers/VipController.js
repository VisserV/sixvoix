
let model = require("../models/vip.js");
let async = require("async");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';
   model.getLettres(function(err, result){  // appel le module test qui exécute la requete SQL
       if (err) {
           console.log(err);
           return;
       }
      response.lettres = result;

      response.render('repertoireVips', response); // appel la vue Handlebars qui va afficher le résultat
    } );
}

module.exports.DetailLettre = 	function(request, response){
    let lettre = request.params.lettre;
    response.title = 'Liste des stars dont le nom commence par ' + lettre;
    async.parallel ([
            function (callback){
                model.getLettres(function(err, lettres){callback(null,lettres) });
            } , //fin du callback0
            function (callback){
                model.ListVips(lettre, function(err, listVips){callback(null,listVips) });
            } , //fin du callback1
        ],
        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            
            response.lettres = result[0];
            response.stars = result[1];

            response.render('repertoireVips', response); // appel la vue Handlebars qui va afficher le résultat
        }    
    ); //fin async
}

// ///////////////////////// D E T A I L S    D E S     S T A R S

module.exports.DetailStar = 	function(request, response){
    let vipNum = request.params.numStar;
    async.parallel ([
            function (callback){
                model.getLettres(function(err, lettres){callback(null,lettres) });
            } , //fin du callback0
            function (callback){
                model.DetailVips(vipNum, function(err, details){callback(null,details) });
            } , //fin du callback1
            function (callback){
                model.liaisonVip(vipNum, function(err, liaisons){callback(null,liaisons) });
            } , //fin du callback2
            function (callback){
                model.mariageVIP(vipNum, function(err, mariages){callback(null,mariages) });
            } , //fin du callback3
            function (callback){
                model.photosVips(vipNum, function(err, photos){callback(null,photos) });
            } , //fin du callback4
            function (callback){
                model.isActeur(vipNum, function(err, acteur){callback(null,acteur) });
            } , //fin du callback5
            function (callback){
                model.isMannequin(vipNum, function(err, chanteur){callback(null,chanteur) });
            } , //fin du callback6
            function (callback){
                model.isChanteur(vipNum, function(err, chanteur){callback(null,chanteur) });
            } , //fin du callback7
            function (callback){
                model.isRealisateur(vipNum, function(err, realisateur){callback(null,realisateur) });
            } , //fin du callback8
            function (callback){
                model.isCouturier(vipNum, function(err, couturier){callback(null,couturier) });
            } , //fin du callback9
        ],
        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            
            response.lettres = result[0];
            response.info = result[1][0];
            response.photos = result[4];
            response.liaisons = result[2];
            response.mariages = result[3];
            response.acteur = result[5]
            response.mannequin = result[6]
            response.chanteur = result[7];
            response.realisateur = result[8];
            response.couturier = result[9]

            response.title = response.info.VIP_PRENOM + ' ' + response.info.VIP_NOM;

            response.render('detailsVips', response); // appel la vue Handlebars qui va afficher le résultat
        }    
    ); //fin async
}
