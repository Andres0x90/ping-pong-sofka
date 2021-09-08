let canvas = document.getElementById("canvas");

window.addEventListener("load", function()
{
    let board = new Board(800,400);
    board.createBoardView(canvas);
});