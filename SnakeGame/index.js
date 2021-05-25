let dir = {x: 0, y: 0};
let food = {x: 8, y: 18};
var start = 0;
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let snakearr = [
  {x: 11, y: 11}
];

lastPaintTime = 0;
const speed = 5;
var temp = 0;


function reset(){
  musicSound.pause();
  dir = {x: 0, y: 0};
  food = {x: 8, y: 18};
  start = 0;
  snakearr = [
    {x: 11, y: 11}
];
  lastPaintTime = 0;
  temp = 0;
}

//controlling the speed of the game
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
      return;
    }
    lastPaintTime = ctime;
    motion();
  }
  
  //For bumping into itself
  function sankehit()
  {
    for(let i = 1;i<snakearr.length;i++)
    {
      if(snakearr[0].x===snakearr[i].x && snakearr[0].y===snakearr[i].y)
      {
        gameOverSound.play();
        musicSound.pause();
         reset();
         alert('Game Over');
         return false;
      }
    }
    return true;
  }
  
  //For collsions 
  function wall(){
    if(snakearr[0].x===0||snakearr[0].x===22||snakearr[0].y===0||snakearr[0].y===22)
    {
      gameOverSound.play();
    
      reset();
      alert('Game Over');
      return false;
    }
    return true;
  }


function motion(){
  
  if(wall() && sankehit()){
    if(food.x === snakearr[0].x && food.y === snakearr[0].y)
    {
      foodSound.play();
      snakearr.unshift({x: snakearr[0].x + dir.x, y: snakearr[0].y + dir.y});
      food = {x: Math.round(2 + Math.random() * 18), y: Math.round(2 + Math.random() * 18)};
    }
 
    //for printing snake
    container.innerHTML = "";
    snakearr.forEach((k,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = k.y;
    snakeElement.style.gridColumnStart = k.x;
    snakeElement.classList.add('snake')
    container.appendChild(snakeElement);
    });
    console.log(snakearr.length);

    //for motion of snake
    for (let i = snakearr.length - 2; i>=0; i--) { 
      snakearr[i+1] = {...snakearr[i]};
  }
    snakearr[0].x += dir.x;
    snakearr[0].y += dir.y;

    //for printint food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    container.appendChild(foodElement);

  }
}

// for rendering the game
window.requestAnimationFrame(main);

//for key pressed
window.addEventListener('keydown', k=>{
    musicSound.play();
      moveSound.play();

      if(k.key==="w")
      {
        if(dir.y!==1){
        dir.x = 0;
        dir.y = -1;
        }
        if(snakearr.length==1){
          dir.x = 0;
          dir.y = -1;
        }
      }   
      else  if(k.key==="s")
      {
        if(dir.y!==-1){
        dir.x = 0;
        dir.y = 1;
        }
        if(snakearr.length==1){
          dir.x = 0;
          dir.y = 1;
        }
      }   
      else if(k.key==="a")
      {
        if(dir.x!==1){
        dir.x = -1;
        dir.y = 0;
        }
        if(snakearr.length==1){
          dir.x = -1;
          dir.y = 0;
        }
      }   
      else if(k.key==="d")
      {
        if(dir.x!==-1){
        dir.x = 1;
        dir.y = 0;
        }
        if(snakearr.length==-1){
          dir.x = 1;
          dir.y = 0;
        }
      } 
    });
