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

    draw(element, kind)
    {
        switch(kind)
        {
            case "rectangle": 
                this.ctx.fillRect(element.x,element.y,element.width, element.height);
            break;
        }
    }

    createBorderView()
    {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createBar(x,y,width,height)
    {
        this.bars.push(
            {
                x: x,
                y: y,
                width: width,
                height: height
            });
    }

    createBarsView()
    {
        this.bars.forEach((bar) => 
        {
            this.draw(bar, "rectangle");
        })
    }

    createBoardView(canvas)
    {
        this.canvas = canvas;
        this.createBorderView();  //Renderizacion de los borders
        this.ctx = this.canvas.getContext("2d");

        this.createBar(20,100,40,100);
        this.createBar(735,100,40,100);
        this.createBarsView();    //Renderizacion de las barras
    }

    getElements()
    {
        this.bars.push(this.ball);
        return this.bars; 
    }
}