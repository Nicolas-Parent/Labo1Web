const { exit } = require('process');
const url = require('url');

function estPremier(nombre) {
    let debut = 2;
    const limite = Math.sqrt(nombre);
    while (debut <= limite) {
        if (nombre % debut++ < 1) return false;
    }
    return nombre > 1;
}
function calculerPremier(nombre) {
    let debut = 2;
    const limite = Math.sqrt(nombre);
    while (debut <= limite) {
        if (nombre % debut++ < 1)
        {
          return "Le nombre "+ nombre + " n'est pas premier";
        }
    }
    return "Le nombre " + nombre + " est premier";
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
  if(params["/math?op"] != null)
  {
    let x = parseInt(params["x"])
    let y = parseInt(params["y"])
    let n = parseInt(params["n"])
    
    if(params["/math?op"] == " " || params["/math?op"] == "-" || params["/math?op"] == "*" || params["/math?op"] == "/"
      || params["/math?op"] == "%" || params["/math?op"] == "!" || params["/math?op"] == "p" || params["/math?op"] == "np")
    {
      if(params["x"] != 0 && params["x"] != null && params["y"] != null && params["y"] != 0)
      {
        if(Object.keys(params).length < 3)
          reponse = "Paramètres manquants"; 
        else if(Object.keys(params).length > 3)
          reponse = "Paramètres en trops"; 
        else if(Object.keys(params).length == 3)
        {
          if(isNaN(x))
          {
            reponse = {"op":params["/math?op"], "x":params["x"].trim(), "y":params["y"].trim(), "error": "x is not a number"};
          }
          else if(isNaN(y))
          {
            reponse = {"op":params["/math?op"], "x":params["x"].trim(), "y":params["y"].trim(), "error": "y is not a number"};
          }
          else{
            switch(params["/math?op"])
            {
              case " ":
              {
                reponse = {"op":params["/math?op"], "x":x, "y":y, "value": x + y};
                break;
              }
              case "-":
              {
                reponse = {"op":params["/math?op"], "x":x, "y":y, "value": x - y};
                break;
              }
              case "*":
              {
                reponse = {"op":params["/math?op"], "x":x, "y":y, "value": x * y};
                break;
              }
              case "/":
              {
                reponse = {"op":params["/math?op"], "x":x, "y":y, "value": x / y};
                break;
              }
              case "%":
              {
                reponse = {"op":params["/math?op"], "x":x, "y":y, "value": x % y};
                break;
              }
            }
          }
          
        }
      }
      else if(params["n"] != 0 && params["n"] != null && params["n"])
      {
        if(Object.keys(params).length < 2)
          reponse = "Paramètres manquants"; 
        else if(Object.keys(params).length > 2)
          reponse = "Paramètres en trops"; 
        else
        {
          switch(params["/math?op"])
          {
            case "!":
            {
              reponse = {"n": n, "op":params["/math?op"], "value":calculerPremier(n)};
              break;
            }
            case "p":
            {
              reponse = {"n": n, "op":params["/math?op"], "value":estPremier(n)};
              break;
            }
            case "np":
            {
              reponse = {"n": n, "op":params["/math?op"], "value":nPremier(n)};
              break;
            }
          }
        }
      }
      else 
          reponse = "Le ou les nombre(s) sont null(s)";
    }
    else
      reponse = "L'oppérande est inexsistante";
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

