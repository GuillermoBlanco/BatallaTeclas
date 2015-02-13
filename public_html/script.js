var valoresGet;
var mode;
var level;
var posiciones=['arriba','abajo','izq','derecha'];
//var letrasJug1 = [37=>'izq',38=> 'arriba',39=>'derecha',40=>'abajo'];
//var letrasJug2 = [97=>'a',115=>'s',100=>'d',119=>'w'];

var delayIluminacion=1000;
var tiempoJuego=3000;

var selecciones;
var jugando=false;
var primero;
var ronda=0;

var jug1;
var jug2;
var jug1Points=0;
var jug2Points=0;

window.onload=function (){
    valoresGet= leerGET();
    level=parseInt(valoresGet['level']);
    mode=valoresGet['mode'];
    if (mode=="Carnivoro"){
        jug1Points=5;
        jug2Points=5;
        alert("Modo carnívoro, empezáis con 5 puntos!!!");
    }
    iniciarRonda();
//    jugar();
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

function iniciarRonda(){
    var cont=3;
    var intervalID=setInterval(function (){
                    document.getElementById("contador").innerHTML="Preparados para jugar: "+(cont);
                    cont--;
                    if (cont==0){
                        clearInterval(intervalID);
                        jugar();
                    }
    },800);
    
}

function jugar(){
    ronda++;
    selecciones=new Array();
    jug1=new Array();
    jug2=new Array();
     for (var i=0; i<level; i++){
        aleatorio = Math.floor(Math.random()*(posiciones.length)); 
        selecciones.push(posiciones[aleatorio]);
    }

    for (var i=0; i<selecciones.length; i++){
        setTimeout(iluminarTeclas,delayIluminacion+(delayIluminacion*i),selecciones,i);
    }
    setTimeout(function(){
        document.getElementById("contador").innerHTML="------>Pulsadores!!!";
        jugando=true;
        primero=undefined;
        setTimeout(timeOver,tiempoJuego);
    },delayIluminacion+(delayIluminacion*selecciones.length));
     
    if (jug1Points>=10){
        alert("jug1 wins");
        window.location = './index.html';
    }
    else if (jug2Points>=10){
        alert("jug2 wins");
        window.location = './index.html';
    }
//    else{
//        setTimeout(jugar,delayIluminacion+(delayIluminacion*selecciones.length)+tiempoJuego);
//    }
}

function iluminarTeclas(selecciones,i){
    elements=document.getElementsByClassName(selecciones[i]);
    
    for (var j=0; j<elements.length; j++){
        elements[j].classList.toggle('seleccion');
        setTimeout(function(element){
            element.classList.toggle('seleccion');
        },delayIluminacion/2,elements[j]);
    }
    document.getElementById("contador").innerHTML=(i+1)+"º tecla";
}

function pulsarTecla(e){
    if (jugando){
        var evento = e || window.event;
        var code = evento.keyCode;
        
        if (code!=0){
            switch(code) {
              case 37:
                  // Key left.
//                  alert("Jug2 izq");
                  jug2.push("izq");
                  if (primero==undefined) primero="jug2";
                  break;
              case 38:
                  // Key up.
//                  alert("Jug2 arriba");
                  jug2.push("arriba");
                  if (primero==undefined) primero="jug2";
                  break;
              case 39:
                  // Key right.
//                  alert("Jug2 derecha");
                  jug2.push("derecha");
                  if (primero==undefined) primero="jug2";
                  break;
              case 40:
                  // Key down.
//                  alert("Jug2 abajo");
                  jug2.push("abajo");
                  if (primero==undefined) primero="jug2";
                  break;
              case 65:
                  // a.
//                  alert("Jug1 izq");
                  jug1.push("izq");
                  if (primero==undefined) primero="jug1";
                  break;
              case 87:
                  // Key up.
//                  alert("Jug1 arriba");
                  jug1.push("arriba");
                  if (primero==undefined) primero="jug1";
                  break;
              case 68:
                  // Key right.
//                  alert("Jug1 derecha");
                  jug1.push("derecha");
                  if (primero==undefined) primero="jug1";
                  break;
              case 83:
                  // Key down.
//                  alert("Jug1 abajo");
                  jug1.push("abajo");
                  if (primero==undefined) primero="jug1";
                  break;
            }
        }
    }

    
}


function comprobarGanador(){
//    alert("jug1: "+jug1.toString()+" "+"jug2: "+jug2.toString()+"\nSelecciones: "+selecciones.toString());
    var ganador1=true;
    var ganador2=true;
    for (var i=0; i<selecciones.length;i++ ){
        if (selecciones[i]!=jug1[i]){
            ganador1=false;
        }
        if (selecciones[i]!=jug2[i]){
            ganador2=false;
        }
    }    
    switch (mode){
        case "Normal":
            if(ganador1 && primero=="jug1"){
                jug1Points++;
                jugando=false;
            }
            else if(ganador2 && primero=="jug2"){
                jug2Points++;
                jugando=false;
            }
            break;
        case "Agresivo":
            if(ganador1 && primero=="jug1"){
                jug1Points++;
                jugando=false;
            }
            else if(ganador2 && primero=="jug2"){
                jug2Points++;
                jugando=false;
            }
            if (!ganador1)jug1Points--;
            if (!ganador2)jug2Points--;
            break;
        case "Carnivoro":
            if(ganador1 && primero=="jug1"){
                jug1Points++;
                jug2Points--;
                jugando=false;
            }
            else if(ganador2 && primero=="jug2"){
                jug2Points++;
                jug1Points--;
                jugando=false;
            }
            if (!ganador1){
                jug1Points--;
                jug2Points++;
            }
            if (!ganador2){
                jug2Points--;
                jug1Points++;
            }
            break;
    }   
          
}


function timeOver(){
    jugando=false;
    comprobarGanador();
    document.getElementById("contador").innerHTML="Ronda: "+ronda+" Marcador: Jugador1->"+jug1Points+"pts Jugador2->"+jug2Points+"pts";
    elem = document.createElement("a");
    elem.href="./index.html";
    elem.innerHTML="Ir a inicio";
    elem2 = document.createElement("a");
    elem2.href="javascript:iniciarRonda();";
    elem2.innerHTML="Siguiente ronda";
    document.getElementById("contador").appendChild(document.createElement("br"));
    document.getElementById("contador").appendChild(elem2);
    document.getElementById("contador").appendChild(document.createElement("br"));
    document.getElementById("contador").appendChild(elem);
}

document.onkeydown=pulsarTecla;




