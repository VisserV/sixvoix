let model = require("../models/vip.js");
let async = require("async");

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = function(request, response){
   response.title = 'Album des stars';
   let numStar = request.params.numStar;
 
   async.parallel ([
     function (callback){
       model.listePhotosPrincipales(function(err, listePhotos){callback(null,listePhotos)});
     }, 
     function (callback){
       model.commentairePhotos(numStar, function(err, commentaire){callback(null,commentaire)});
     }
   ],
     function(err,result){
 
       if (err) {
         console.log(err);
         return;
       }
       response.listePhotos = result[0];
       response.commentairePhotos = result[1];
 
 
       response.render('listerAlbum', response);
     }
   );
 }