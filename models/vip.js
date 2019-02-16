let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLettres = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT substring(VIP_NOM,1,1) AS letNom FROM vip GROUP BY letNom ORDER BY 1";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ListVips = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE, vip.VIP_NUMERO AS numStar, \'"+ [lettre] +"\' AS letNom FROM vip, photo";
            sql = sql + " WHERE vip.VIP_NUMERO = photo.VIP_NUMERO AND PHOTO_NUMERO = 1 AND substring(VIP_NOM,1,1) = \'" + [lettre] + "\'";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.DetailVips = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
          let sql = "SELECT PHOTO_NUMERO, PHOTO_ADRESSE, VIP_NOM, VIP_PRENOM, VIP_NAISSANCE, VIP_SEXE, NATIONALITE_NOM, VIP_TEXTE FROM vip, nationalite, photo";
          sql = sql + " WHERE nationalite.NATIONALITE_NUMERO = vip.NATIONALITE_NUMERO";
          sql = sql + " AND vip.VIP_NUMERO = photo.VIP_NUMERO";
          sql = sql + " AND vip.VIP_NUMERO = " + [numStar];
          sql = sql + " AND PHOTO_NUMERO = 1";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.photosVips = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
          let sql = "SELECT PHOTO_NUMERO, PHOTO_ADRESSE, PHOTO_SUJET, PHOTO_COMMENTAIRE FROM photo";
          sql = sql + " WHERE VIP_NUMERO = " + [numStar];
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.liaisonVip = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, DATE_EVENEMENT, LIAISON_MOTIFFIN FROM vip v, liaison l, photo p";
            sql = sql + "  WHERE v.VIP_NUMERO=l.VIP_VIP_NUMERO";
            sql = sql + " AND l.VIP_NUMERO=" + [numStar];
            sql = sql + " AND v.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql + " AND PHOTO_NUMERO = 1";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.mariageVIP = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, MARIAGE_LIEU, MARIAGE_FIN, DATE_EVENEMENT FROM vip v, mariage m, photo p";
            sql = sql + " WHERE v.VIP_NUMERO=m.VIP_VIP_NUMERO";
            sql = sql + " AND m.VIP_NUMERO=" + [numStar];
            sql = sql + " AND v.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql + " AND PHOTO_NUMERO = 1 ";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isActeur = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE,";
            sql = sql + " 'acteur' AS nom, FILM_TITRE, FILM_DATEREALISATION FROM vip v, joue j, film f, photo p";
            sql = sql + " WHERE j.VIP_NUMERO=" + [numStar];
            sql = sql + " AND v.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql + " AND PHOTO_NUMERO = 1";
            sql = sql + " AND j.FILM_NUMERO = f.FILM_NUMERO";
            sql = sql + " AND f.VIP_NUMERO = v.VIP_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isMannequin = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE,";
            sql = sql + " 'mannequin' AS nom, DEFILE_LIEU, DEFILE_DATE  FROM vip v, photo p, defiledans dd, defile d";
            sql = sql + " WHERE dd.VIP_NUMERO=" + [numStar];
            sql = sql + " AND v.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql + " AND PHOTO_NUMERO = 1";
            sql = sql + " AND dd.DEFILE_NUMERO = d.DEFILE_NUMERO";
            sql = sql + " AND d.VIP_NUMERO = v.VIP_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.isChanteur = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT 'chanteur' AS nom, ALBUM_TITRE, ALBUM_DATE, CHANTEUR_SPECIALITE,";
            sql = sql + " MAISONDISQUE_NOM FROM vip v, photo p, composer co, album a, chanteur ch, maisondisque m";
            sql = sql + " WHERE ch.VIP_NUMERO=" + [numStar];
            sql = sql + " AND ch.VIP_NUMERO = co.VIP_NUMERO";
            sql = sql + " AND co.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql + " AND PHOTO_NUMERO = 1";
            sql = sql + " AND co.ALBUM_NUMERO = a.ALBUM_NUMERO";
            sql = sql + " AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
