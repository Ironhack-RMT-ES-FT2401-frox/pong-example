// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");
const ballNode = document.querySelector("#ball");
const paddleNode = document.querySelector("#paddle");

let ballX = 30;
let ballY = 30;
let ballSize = 20;
let ballSpeed = 3;
let isBallMovingRight = true;
let isBallMovingDown = true;

let wallRight = 400;
let wallBottom = 600;

let paddleX = 150;
let paddleY = 550;
let paddleW = 100; // width ancho
let paddleH = 20; // height alto

// *** Game Functions ***
function ballMovement() {
  if (isBallMovingRight === true) {
    ballX += ballSpeed
  } else {
    ballX -= ballSpeed
  }
  // SIEMPRE que modifiquemos la posición numerica del elemento, debemos modificar el DOM.
  ballNode.style.left = `${ballX}px`

  if (isBallMovingDown === true) {
    ballY += ballSpeed
  } else {
    ballY -= ballSpeed
  }

  ballNode.style.top = `${ballY}px`
}

function checkIfBallCollidedWithWall() {
  if (ballX + ballSize > wallRight) {
    // console.log("pelotita llegó al final")
    isBallMovingRight = false;
  } else if (ballY + ballSize > wallBottom ) {
    gameOver()
  } else if (ballX < 0) {
    isBallMovingRight = true
  } else if (ballY < 0) {
    isBallMovingDown = true
  }
}

function checkIfBallCollidedWithPaddle() {

  if (ballY + ballSize > paddleY && ballX > paddleX && ballX + ballSize < paddleX + paddleW) {
    // console.log("colisionando con la paleta")
    isBallMovingDown = false;
  }

}

function gameOver() {
  console.log("el juego se termina")
  window.clearInterval(gameIntervalId)
  window.alert("has perdido :(")
}

function gameLoop() {
  // se ejecuta 60 veces por segundo

  // console.log("intervalo de juego")
  ballMovement()
  checkIfBallCollidedWithWall()
  checkIfBallCollidedWithPaddle()

}

// *** Game Loop Interval ***
let gameIntervalId = window.setInterval(() => {
  gameLoop()
}, 1000/60) // 60fps


// *** Event Listeners ***
window.addEventListener("keydown", (event) => {
  console.log(event.key)
  if (event.key === "ArrowLeft") {
    // mover la paleta a la izquierda
    paddleX -= 20;
    paddleNode.style.left = `${paddleX}px`
  } else if (event.key === "ArrowRight") {
    // mover la paleta a la derecha
    paddleX  += 20;
    paddleNode.style.left = `${paddleX}px`
  }
})