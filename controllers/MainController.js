let canvas = document.getElementById("canvas");
let board = new Board(800,400);

board.createBoardView(canvas);  //Se renderiza el tablero por primera vez

function play()
{
    board.clearBoardContentView();    //Se limpian los componentes del tablero
    board.createBoardContentView();  //Se renderizan los componentes del tablero
    window.requestAnimationFrame(play);
}

window.requestAnimationFrame(play);

document.addEventListener("keydown", function(key)
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
});