//счетчик времени
//счетчик ходов -- внедрил, осталось вывести на экран
//стилизация font, цвета, центровка
var moves = 0;

var places=new Array();
function newGame() {
  while(places.length<16){
    num = Math.floor(Math.random()*16); //генерируем случайное число
    if(!places.includes(num)){ //если числа нет в массиве, то добавляем
      places.push(num);
    }
  }
}

//генерируем 0-15 в случайном порядке для последующей расстановки по доске в таком же порядке
//каждый элемент массива - массив из y и x
//////////////////////////////////////////////этот массив с координатами можно переиспользовать для проверки выигрыша по ид
var coords=[];
//цикл рядов
for (var ypos = 0; ypos <= 75; ypos+=25) {
  //цикл столбцов
  for (var xpos = 0; xpos <=75; xpos+=25) {
    coords.push([ypos,xpos]);
  }
}

newGame();


function move(cell){
  let emptyCell=document.querySelector('#cell0');
  let ypos=cell.style.top;
  let xpos=cell.style.left;
  let newYpos=emptyCell.style.top;
  let newXpos=emptyCell.style.left;
  //если нажата соседня клетка по горизонтали и вертикали, выполняется движение
  if((ypos.slice(0, -1)-newYpos.slice(0, -1))==0 && Math.abs(xpos.slice(0, -1)-newXpos.slice(0, -1))==25 || (xpos.slice(0, -1)-newXpos.slice(0, -1))==0 && Math.abs(ypos.slice(0, -1)-newYpos.slice(0, -1))==25){
    emptyCell.style.top = ypos;
    emptyCell.style.left = xpos;
    cell.style.top = newYpos;
    cell.style.left = newXpos;
    moves++;
    checkForWin();
  }
}

function checkForWin(){
//проверить на выигрыш///////////////////////////////////////////////////////////////////
  for (var i = 1; i<16; i++){
    let cell = document.getElementById('cell'+i);
    if (cell.style.top.slice(0, -1) != coords[i-1][0] || cell.style.left.slice(0, -1) != coords[i-1][1]){
      break; //пишет только те ид, до которых успел дойти до момента выхода из функции
    }
    if (i==15) {
      console.log('you win');
      //запустить функцию которая снимает все клик события, чтобы нельзя было двигать
    }
  }
}



//строим доску
  var element = document.querySelector('.board');
  for (i=0; i<16; i++){
    //для каждой ячейки обозначаем их координаты в %
    let ypos=coords[i][0];
    let xpos=coords[i][1];
    let cellid=places[i];

    //рисуем все ячейки
    var div = document.createElement('div');
    div.id = 'cell'+cellid;
    element.appendChild(div);
    var theCell=document.querySelector('#cell'+cellid);
    theCell.addEventListener('click',function(){move(this)},false);
    theCell.style.top = ypos+'%';
    theCell.style.left = xpos+'%';
    theCell.classList.add('cell');
    theCell.innerHTML=places[i];
  }

checkForWin();
