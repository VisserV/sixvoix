

  // ////////////////////////////////////////////// C O N N E X I O N 
module.exports.Index = function(request, response){
    response.title = "Connexion";
    response.render('connexion', response);
};

module.exports.NotFound = function(request, response){
    response.title = "error";
    response.render('notFound', response);
};
