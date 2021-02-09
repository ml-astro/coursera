//попробуй ид - номер (0-15, 0 - пустой). позицию пробивать/менять прямо по параметру

//добавить возможность перемещать сразу несколько блоков
//left 0 25 50 75 (+=25) внутренний цикл
//top 0 25 50 75 (+=25) внешний цикл

//создать перемешанный массив
function shuffle() {
  var places=new Array();
  while(places.length<16){
    num = Math.floor(Math.random()*16); //генерируем случайное число
    if(!places.includes(num)){ //если числа нет в массиве, то добавляем
      places.push(num);
    }
  }

// var nmb='hi'+4;
// var hello = {name:'jj',x:25,y:0}
// console.log(hello);

var game=[];
//цикл рядов
for (var ypos = 0; ypos <= 75; ypos+=25) {
  //цикл столбцов
  for (var xpos = 0; xpos <=75; xpos+=25) {
    game.push([ypos,xpos]);
  }
}
console.log(game);

//создать массив из объектов
  // console.log(places);
  // var game=[[places[0],places[1],places[2],places[3]],
  // [places[4],places[5],places[6],places[7]],
  // [places[8],places[9],places[10],places[11]],
  // [places[12],places[13],places[14],places[15]]];
  // console.log(game);
  // }
shuffle();


//строим доску
// element = document.querySelector('.board');
// for (i=0; i<15; i++){
//   element.innerHTML+='<div class="cell"></div>';
// }
