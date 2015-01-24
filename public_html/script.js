var valoresGet;
var mode;
var level;
var posiciones=['arriba','abajo','izq','derecha'];

window.onload=function (){
    valoresGet= leerGET();
    level=parseInt(valoresGet['level']);
    mode=valoresGet['mode'];
    for (var i=0; i<level; i++){
        aleatorio = Math.floor(Math.random()*(posiciones.length)); 
        seleccion = posiciones[aleatorio];
        iluminarTecla(seleccion);
        setTimeout(iluminarTecla,500, tecla);
    }
    
    pintarTablero();
};

function leerGET(){
     var cadGET = location.search.substr(1,location.search.length);//me quedo con la zona de las variables → var1=valor1&var2=valor2&...
     var arrGET = cadGET.split("&");// las separo una a una → var1=valor1 var2=valor2 ...
     var asocGET = new Array();
     var variable = "";
     var valor = "";
     for(i=0;i<arrGET.length;i++){
          var aux = arrGET[i].split("="); //separo el nombre del valor → var1 valor1
          variable = aux[0]; //guardo el nombre → var1
          valor = aux[1];//guardo el valor →  valor1
          asocGET[variable] = valor; //Se mete todo en una matriz asociativa donde el nombre de la variable es el indice y el valor el contenido
      }
      return asocGET;
}

function pintarTablero(){
        
    var tablero1=document.getElementById("jug1");
    var tablero2=document.getElementById("jug2");
    
    
}

function iluminarTecla(tecla){
    elements=document.getElementsByClassName(tecla);
    
    for (var i=0; i<elements.length; i++){
        elements[i].classList.toggle('seleccion');
    }
    http://stackoverflow.com/questions/3138756/jquery-repeat-function-every-60-seconds
}

function pulsarTecla(e){
      var evento = e || window.event;
    if (evento.target.classList.contains('tecla'))
    evento.target.classList.toggle('seleccion');

//if ( evento.target.classList.contains('seleccion') )
//
//    evento.target.classList.remove('seleccion');
//else evento.target.classList.add('seleccion');

//    document.getElementById("MyElement").classList.add('class');
//
//    document.getElementById("MyElement").classList.remove('class');
//
//    if ( document.getElementById("MyElement").classList.contains('class') )
//
//    document.getElementById("MyElement").classList.toggle('class');
}


document.onclick=pulsarTecla;




