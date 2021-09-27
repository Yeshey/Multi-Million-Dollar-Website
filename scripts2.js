// Method 2, Less preety, More accurate

//from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
//eraseCookie('clicks');

// mouse tracking effect
let box = document.querySelector(".mouse");
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter= {
	x: boxBoundingRect.left + boxBoundingRect.width/2, 
  y: boxBoundingRect.top + boxBoundingRect.height/2
};
document.addEventListener("mousemove", e => {
	//let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);	    
    dist_box_mouse=Math.sqrt((e.pageX-boxCenter.x)^2+(e.pageY-boxCenter.y)^2)
    dist_mouse_x=e.pageX-boxCenter.x
    dist_mouse_y=e.pageY-boxCenter.y
    console.log(dist_mouse_y)
    box.style.transform = `translate(${dist_mouse_x/200}px,${dist_mouse_y/200}px)`;  
	//box.style.transform = `translate(${e.pageY/100}px,${e.pageX/100}px)`;  
    //box.style.transform = `translate()`;  
})


var clicks=0,CPS=0, CPSPS=0, CPS3=0;

// Cookies testing
var clickscookie = parseInt(getCookie('clicks'));
var CPScookie = parseInt(getCookie('CPS'));
var CPSPScookie = parseInt(getCookie('CPSPS'));
var CPS3cookie = parseInt(getCookie('CPS3'));
var timecookie = parseInt(getCookie('time'));


timeabsent = (new Date).getTime() - timecookie
console.log("timeabsent: " + timeabsent + "ms");
if (CPS3cookie) {
    CPS3=CPS3cookie; console.log("CPS3: " + CPS3);}
if (CPSPScookie) {
    CPSPS=CPSPScookie + CPS3*(timeabsent/1000); console.log("CPSPS: " + CPSPS);}
if (CPScookie) {
    CPS=CPScookie + CPSPS*(timeabsent/1000); console.log("CPS: " + CPS);}
if (clickscookie) {
    clicks=clickscookie + CPS*(timeabsent/1000); console.log("clicks: " + clicks);}



let clickspan = document.querySelector(".clicksspan");
let CPSspan = document.querySelector(".CPSspan");
let CPSPSspan = document.querySelector(".CPSPSspan");
let CPS3span = document.querySelector(".CPS3span");

clickspan.addEventListener('click', function(){
    //alert("hello");
    clicks++;
    updatevisable();
})
CPSspan.addEventListener('click', function(){
    CPS++;
    CPSspan.innerHTML=CPS.toFixed(1) + ' $/sec';

})
CPSPSspan.addEventListener('click', function(){
    CPSPS++;
    CPSPSspan.innerHTML=CPSPS.toFixed(1) + ' $/s/s';
})
CPS3span.addEventListener('click', function(){
    CPS3++;
    CPS3span.innerHTML=CPS3.toFixed(1) + ' $/s^3';
})

window.setInterval(function update() {
    // Passes here every 100ms.
    // Every 100ms updates the speed at witch the numbers grow

    CPSPS+=CPS3/10;
    CPS+=CPSPS/10;
    clicks+=CPS/10;

    timedCounter((clicks+(CPS/10)), 100, clicks, function(value){
        clickspan.innerHTML=value.toFixed(1) + ' $';
        setCookie('clicks',clicks,60);
    });

    timedCounter((CPS+(CPSPS/10)), 100, CPS, function(value){
        CPSspan.innerHTML=value.toFixed(1) + ' $/sec';
        setCookie('CPS',CPS,60);
    });

    timedCounter((CPSPS+(CPS3/10)), 100, CPSPS, function(value){
        CPSPSspan.innerHTML=value.toFixed(1) + ' $/s/s';
        setCookie('CPSPS',CPSPS,60);
    });

    setCookie('CPS3',CPS3,60);

    updatevisable()

    // monitor when the user leaves the site
    setCookie('time',(new Date).getTime(),60);

}, 100);

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

function updatevisable(){
    clickspan.innerHTML=clicks.toFixed(1) + ' $';
    CPSspan.innerHTML=CPS.toFixed(1) + ' $/sec';
    CPSPSspan.innerHTML=CPSPS.toFixed(1) + ' $/s/s';
    CPS3span.innerHTML=CPS3.toFixed(1) + ' $/s^3';
    if (clicks>=10 && clicks<150){
        CPSspan.setAttribute('style', 'display:inline-block;');
        CPSspan.classList.add("anim");
    }
    if (clicks>=150 && clicks<1000){
        CPSspan.setAttribute('style', 'display:inline-block;');
        CPSPSspan.setAttribute('style', 'display:inline-block;');
        CPSPSspan.classList.add("anim");
    }
    if (clicks>=1000){
        CPSspan.setAttribute('style', 'display:inline-block;');
        CPSPSspan.setAttribute('style', 'display:inline-block;');
        CPS3span.setAttribute('style', 'display:inline-block;');
        if (clicks<2000){
            CPS3span.classList.add("anim");
        }
        // make the hover less intrusive now 
        var el = document.querySelector('.firsthover_r');
        if (el.classList.contains("firsthover_r")) {
            el.classList.remove("firsthover_r");
            el.classList.add("firsthover_b");
        }
        el = document.querySelectorAll('.firsthover_s_r');
        var i;
        for (i = 0; i < el.length; i++) {
            el[i].classList.remove("firsthover_s_r");
            el[i].classList.add("firsthover_s_b");
        }
    }
    if (clicks>=2000){
        // Remove the appear anim
        CPSspan.classList.remove("anim");
        CPSPSspan.classList.remove("anim");
        CPS3span.classList.remove("anim");
    }
}

//---Show---
function show(){
    //alert("clicks: " + clicks + ", CPS: " + CPS + ", CPSPS: " + CPSPS + ", CPS3: " + CPS3 + ", value: nope");
    CPS3=0;
    CPSPS=0;
    CPS=0;
    clicks=0;

    updatevisable();
}

