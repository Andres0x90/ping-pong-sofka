let canvas = document.getElementById("canvas");
let board = new Board(800,400);
let playing = false; 

board.createBoardView(canvas);  //Se renderiza el tablero por primera vez
let game = new Game(board);

function play()
{
    board.clearBoardContentView();    //Se limpian los componentes del tablero
    if (playing)
    {
        board.createBoardContentView();  //Se renderizan los componentes del tablero
        board.ball.move();              // Mover la pelota
        board.checkAnyCollition();      // Detectar colisiones de la pelota con las barras
        if (game.hasAnyPlayerWon())
        {
            alert(game.winner + " ha ganado");
            playing = false;
        }
    }

    window.requestAnimationFrame(play);
}

window.requestAnimationFrame(play);

document.addEventListener("keydown", function(key)
{
    if (key.code === "Space")
    {
        document.getElementById("msg_start").removeAttribute("hidden");
        playing = !playing;
    }


    if (playing)
    {
        switch(key.code)  //Movimiento jugador 1 independiente
        {
            case "KeyW": 
                board.bars[0].up();
            break;
            case "KeyS": 
                board.bars[0].down();
            break;                      
        }
    
        switch(key.code) //Movimiento jugador 2 independiente
        {
            case "ArrowUp": 
            board.bars[1].up();
            break;
            case "ArrowDown": 
                board.bars[1].down();
            break;  
        }
        
    }
});