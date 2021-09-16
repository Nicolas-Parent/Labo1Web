const { exit } = require('process');
const url = require('url');

function factoriser(nombre) {
  if (nombre < 0)
    return -1;
  else if (nombre == 0)
    return 1;
  else {
    return (nombre * factoriser(nombre - 1));
  }
}
function estPremier(nombre) {
    let debut = 2;
    const limite = Math.sqrt(nombre);
    while (debut <= limite) {
        if (nombre % debut++ < 1) return false;
    }
    return nombre > 1;
}

function nPremier(nombre){
    let compteur=0;
    const limite = 100000
      for(let i=2;i<=limite;i++){
        if(estPremier(i)){
            compteur++;
        }
        if(compteur == nombre)
        {
          return i;
        }
      }
   }

exports.math = function(req, res) {
  const reqUrl = url.parse(req.url, true);
  const queryString = require('query-string');
  const params = queryString.parse(reqUrl.path);
  let reponse= {};
  let operande = params["/api/maths?op"]
  if(operande != null)
  {
    let x = parseInt(params["x"])
    let y = parseInt(params["y"])
    let n = parseInt(params["n"])
    
    if(operande == " " || operande == "-" || operande == "*" || operande == "/"
      || operande == "%" || operande == "!" || operande == "p" || operande == "np")
    {
      if(params["x"] != 0 && params["x"] != null && params["y"] != null && params["y"] != 0)
      {
        if(Object.keys(params).length < 3)
          reponse = {"erreur":"Paramètres manquants"}; 
        else if(Object.keys(params).length > 3)
          reponse = {"erreur":"Paramètres en trops"}; 
        else if(Object.keys(params).length == 3)
        {
          if(isNaN(x))
          {
            reponse = {"op":operande, "x":params["x"].trim(), "y":params["y"].trim(), "erreur": "x n'est pas un nombre"};
          }
          else if(isNaN(y))
          {
            reponse = {"op":operande, "x":params["x"].trim(), "y":params["y"].trim(), "erreur": "y n'est pas un nombre"};
          }
          else{
            switch(operande)
            {
              case " ":
              {
                reponse = {"op":operande, "x":x, "y":y, "valeur": x + y};
                break;
              }
              case "-":
              {
                reponse = {"op":operande, "x":x, "y":y, "valeur": x - y};
                break;
              }
              case "*":
              {
                reponse = {"op":operande, "x":x, "y":y, "valeur": x * y};
                break;
              }
              case "/":
              {
                if(x == 0 && y == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "NAN"}
                else if(x == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "Infinity"}
                else if(y == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "Infinity"}
                else
                {
                  reponse = {"op":operande, "x":x, "y":y, "valeur": x / y};
                  break;
                }
              }
              case "%":
              {
                if(x == 0 && y == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "NAN"}
                else if(x == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "NAN"}
                else if(y == 0)
                  reponse = {"op":operande, "x":x, "y":y, "valeur": "NAN"}
                else
                {
                  reponse = {"op":operande, "x":x, "y":y, "valeur": x % y};
                  break;
                }
              }
            }
          }
          
        }
      }
      else if(params["n"] != 0 && params["n"] != null)
      {
        if(Object.keys(params).length < 2)
          reponse = {"erreur":"Paramètres manquants"}; 
        else if(Object.keys(params).length > 2)
          reponse = {"erreur":"Paramètres en trops"}; 
        else
        {
          if(isNaN(n))
          {
            reponse = {"op":operande, "n":params["n"].trim(), "erreur": "n n'est pas un nombre"};
          }
          else
          {
            switch(operande)
            {
              case "!":
              {
                reponse = {"n": n, "op":operande, "valeur":factoriser(n)};
                break;
              }
              case "p":
              {
                reponse = {"n": n, "op":operande, "valeur":estPremier(n)};
                break;
              }
              case "np":
              {
                reponse = {"n": n, "op":operande, "valeur":nPremier(n)};
                break;
              }
            }
          }
        }
      }
      else 
          reponse = {"op":operande, "n":params["n"].trim(), "erreur": "Le paramètre n est inexistant"};
    }
    else
      reponse = {"n":params["n"].trim(), "op":operande, "erreur": "L'oppérande est inconnue"};
  }
  else
  {
    reponse = {"n":params["n"].trim(), "op":operande, "erreur": "L'oppérande est inexistante"};
  }
    
     
  res.statusCode = 200;
  res.setHeader('content-Type', 'Application/json');
  res.end(JSON.stringify(reponse));
}

exports.invalidUrl = function(req, res) {
   var response = [
     {
       "message": "Endpoint incorrect. Les options possibles sont "
     },
     availableEndpoints
   ]
   
   res.statusCode = 404;
   res.setHeader('content-Type', 'Application/json');
   res.end(JSON.stringify(response))
  }
 
  const availableEndpoints = {
    method: "GET",
    math: "/math"
  }

