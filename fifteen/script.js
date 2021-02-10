var moves = 0;
var places=new Array();
var coords=[];
newGame();
var timeStart;
var timeEnd;

//////////////////////////// генерирует полную раскладку для доски //////////
function newGame() {
  document.querySelector('.board').innerHTML='';
  document.querySelector('h1').innerHTML='ПЯТНАШКИ';
  document.querySelector('.moveCount').innerHTML='';
  places=new Array();
  moves = 0;
  while(places.length<16){
    num = Math.floor(Math.random()*16); //генерируем случайное число
    if(!places.includes(num)){ //если числа нет в массиве, то добавляем
      places.push(num);
    }
  }

  //каждый элемент массива - массив из y и x
  //цикл рядов
  for (var ypos = 0; ypos <= 75; ypos+=25) {
    //цикл столбцов
    for (var xpos = 0; xpos <=75; xpos+=25) {
      coords.push([ypos,xpos]);
    }
  }
  buildBoard();
}

//////////////////////////// строит доску ///////////////////////////////////
function buildBoard(){
  var element = document.querySelector('.board');
  for (i=0; i<16; i++){
    //для каждой ячейки обозначает их координаты в %
    let ypos=coords[i][0];
    let xpos=coords[i][1];
    let cellid=places[i];

    //рисуем все ячейки
    element.innerHTML+='<div class="cell" onclick="move(this)" id="cell'+places[i]+'" style="top:'+ypos+'%; left:'+xpos+'%">'+places[i]+'</div> ';
  }
  timeStart = new Date();
}

//////////////////////////////// разрабатывает правила движения клеток /////////
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
//////////////////////////////// проверить на выигрыш ////////////////////////////
  for (var i = 1; i<16; i++){
    let cell = document.getElementById('cell'+i);
    if (cell.style.top.slice(0, -1) != coords[i-1][0] || cell.style.left.slice(0, -1) != coords[i-1][1]){
      break; //пишет только те ид, до которых успел дойти до момента выхода из функции
    }
    else if (i==15) {
      document.querySelector('h1').innerHTML='ПОБЕДА!';
      timeEnd = new Date();
      ///////////////////////////// при выигрыше запускаем соотв. функцию //////
      endgame();
    }
  }
}

checkForWin();

function endgame(){
  ////////////// тут надо вставить onclick, который подчистит доску и сгенерирует новую /////////////
  for (var i = 0; i < 16; i++) {
    document.querySelector('#cell'+i).onclick = null;
  }
  document.querySelector('button').innerHTML = 'НОВАЯ ИГРА';
  document.querySelector('button').setAttribute('onclick', 'newGame();');
  document.querySelector('.moveCount').innerHTML += 'Количество ходов: '+ moves +'</br>  ';
  document.querySelector('.moveCount').innerHTML += 'Потрачено времени: ' + Math.floor((timeEnd-timeStart)/1000) + ' сек.';
}
