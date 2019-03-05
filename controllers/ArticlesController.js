let model = require("../models/vip.js");
let async = require("async");

// ////////////////////// A R T I C L E   D E S   S T A R S

module.exports.articles =function(request, response){
    response.title = 'Articles des stars';
  
    async.parallel ([
      function (callback){
        model.listeVipArticleMain(function(err, result){callback(null,result)});
      }
    ],
      function(err,result){
  
        if (err) {
          console.log(err);
          return;
        }
        response.vipNomPrenom = result[0];
  
        response.render('articlesMain', response);
      }
    );
  }