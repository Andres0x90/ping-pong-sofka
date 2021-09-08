class Board
{
    constructor(width, height)
    {
        this.canvas = null;
        this.ctx = null;
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    createBoardView(canvas)
    {
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    }

    getElements()
    {
        this.bars.push(this.ball);
        return this.bars; 
    }
}