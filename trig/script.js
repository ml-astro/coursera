//проверить условия на дурака - буквы, отрицательные значения, ноль, пустота

var sidea = document.querySelector('#sidea');
var sideb = document.querySelector('#sideb');
var sidec = document.querySelector('#sidec');
var angleA = document.querySelector('#angleA');
var angleB = document.querySelector('#angleB');

//Math.sin(10*Math.PI/180) синус 10 градусов
function toRadians(deg){
  return deg*Math.PI/180;
}

function zero(label){
  console.log(label);
  document.getElementById(label).value = '';
}

function reset() {
  sidea.value = '';
  sideb.value = '';
  sidec.value = '';
  angleA.value = '';
  angleB.value = '';
}

function calculate() {
  // ПО ПИФАГОРУ, ЕСЛИ ИЗВЕСТНО ДВЕ СТОРОНЫ
  if (!angleA.value && !angleB.value){
    if (sidea.value && sideb.value){
      sidec.value = Math.sqrt(sideb.value*sideb.value + sidea.value*sidea.value);
    }
    else if (sideb.value && sidec.value){
      sidea.value = Math.sqrt(sidec.value*sidec.value - sideb.value*sideb.value);
    }
    else if (sidea.value && sidec.value){
      sideb.value = Math.sqrt(sidec.value*sidec.value - sidea.value*sidea.value);
    }
    else {
      console.log("недостаточно сторон");
    }
  //РАСЧЕТ УГЛОВ
      angleA.value = Math.acos(sideb.value/sidec.value)*180/Math.PI;
      angleB.value = 90 - angleA.value;
  }

  //РЕШЕНИЕ, ЕСЛИ ИЗВЕСТНА СТОРОНА И УГОЛ
  else if ((angleA.value || angleB.value) && (!sidea.value + !sideb.value + !sidec.value <=2)){
    if (!angleB.value){
      angleB.value = 90 - angleA.value;
    }
    else if(!angleA.value){
      angleA.value = 90 - angleB.value;
    }

    if (sidea.value){
      sideb.value=Math.tan(toRadians(angleB.value))*sidea.value;
      sidec.value=Math.sqrt(sidea.value*sidea.value+sideb.value*sideb.value);
    }
    else if (sideb.value){
      sidea.value=Math.tan(toRadians(angleA.value))*sideb.value;
      sidec.value=Math.sqrt(sidea.value*sidea.value+sideb.value*sideb.value);
    }
    else if (sidec.value){
      sidea.value=Math.sin(toRadians(angleA.value))*sidec.value;
      sideb.value=Math.sqrt(sidec.value*sidec.value-sidea.value*sidea.value);
    }

  }
  else {console.log('что-то пошло не так');}
}

//edit