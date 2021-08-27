/*
var count = 0;

  document.body.innerHTML = Math.round(count);
*/

/*function boom(){
    //alert("hello");
    document.querySelector('.estuda').textContent=Date.now();
}*/

//document.querySelector('.estuda').textContent='Clicks';

//var myVar = setInterval(myTimer, 1000);


/*var clicks=0;

var textNode = document.getElementById(badge).firstChild;
var start = Date.now();
*/

var clicks=0,CPS=0, CPSPS=0, CPS3=0;

let clickspan = document.querySelector(".clicksspan");
let CPSspan = document.querySelector(".CPSspan");
let CPSPSspan = document.querySelector(".CPSPSspan");
let CPS3span = document.querySelector(".CPS3span");

clickspan.addEventListener('click', function(){
    //alert("hello");
    clicks++;


    //clickspan.setAttribute('style','color:white');
    
    //setTimeout(500);

    //clickspan.setAttribute('style','color:black transition: 0.3s; delay:0.5s');
    //licks = Math.round((new Date()-Date.now()));
    //document.querySelector(".clicks2").textContent=(clicks + " Clicks");
    updateclicks();
})
CPSspan.addEventListener('click', function(){
    //alert("hello");
    CPS++;
    //document.querySelector(".clicks2").textContent=(clicks + " Clicks");
    CPSspan.innerHTML=CPS.toFixed(1) + ' $/sec';
    update();
})
CPSPSspan.addEventListener('click', function(){
    CPSPS++;
    CPSPSspan.innerHTML=CPSPS.toFixed(1) + ' $/s/s';
})
CPS3span.addEventListener('click', function(){
    CPS3++;
    CPS3span.innerHTML=CPS3.toFixed(1) + ' $/s^3';
})

/*  //VAriable repeating function
function periodicall() {
    setTimeout(periodicall, (1000/CPS));
    if (CPS!=0){
        //clicks++;
    }
};
periodicall();
*/


//----------------

//https://stackoverflow.com/questions/18368095/how-to-grow-number-smoothly-from-0-to-5-000-000/18391316
function timedCounter(finalValue, milliseconds, startValue, callback){

    var startTime = (new Date).getTime();
    //var milliseconds = seconds*1000;
  
    (function update(){
  
      var currentTime = (new Date).getTime();
      var value = startValue + ((finalValue-startValue)*(currentTime - startTime)/milliseconds);

      if(value >= finalValue)
      value = finalValue;
    else
        setTimeout(update, 0);
  
      callback && callback(value);
  
    })();
  
  }
  



window.setInterval(function update() {
    //document.querySelector('.estuda').textContent=Date.now();
    //clicks++
    //CPS3=CPS3+CPS3;
    CPSPS+=CPS3/100;
    CPS+=CPSPS/100;
    clicks+=CPS/100;
    //updateclicks();

    updateclicks();
}, 10);
function updateclicks(){
    clickspan.innerHTML=clicks.toFixed(1) + ' $';
    CPSspan.innerHTML=CPS.toFixed(1) + ' $/sec';
    CPSPSspan.innerHTML=CPSPS.toFixed(1) + ' $/s/s';
    CPS3span.innerHTML=CPS3.toFixed(1) + ' $/s^3';
    //Math.round(number * 10)
    if (clicks>=10 && clicks<50){
        //alert("tada");
        CPSspan.setAttribute('style', 'display:initial;');
    }
    if (clicks>=150 && clicks<400){
        //alert("tada");
        CPSPSspan.setAttribute('style', 'display:initial;');
    }
    if (clicks>=1000 && clicks<1500){
        //alert("tada");
        CPS3span.setAttribute('style', 'display:initial;');
    }
}

//---Show---
function show(){
    //alert("clicks: " + clicks + ", CPS: " + CPS + ", CPSPS: " + CPSPS + ", CPS3: " + CPS3 + ", value: nope");
    CPS3=0;
    CPSPS=0;
    CPS=0;
    clicks=0;

    updateclicks();
}

/*
setInterval(function(){

    clicks++;
    document.querySelector('.estuda').textContent=clicks;
    //alert("clicks has " + clicks);
}, 1);
*/