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

    draw(element)
    {
        switch(element.kind)
        {
            case "rectangle": 
                this.ctx.fillRect(element.x,element.y,element.width, element.height);
            break;
        }
    }

    createBoardView(canvas)
    {
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createBar(20,100,40,100);
        this.createBar(735,100,40,100);

        this.ctx = this.canvas.getContext("2d");
    }
    
    createBoardContentView()
    {
        this.createBarsView();    //Renderizacion de las barras
    }

    clearBoardContentView()
    {
        this.ctx.clearRect(0,0, this.width, this.height);
    }
    
    createBarsView()
    {
        this.bars.forEach((bar) => 
        {
            this.draw(bar);
        })
    }

    createBar(x,y,width,height)
    {
        this.bars.push(
            {
                kind: "rectangle",
                x: x,
                y: y,
                width: width,
                height: height,
                step: 10,
                speed: 3,
                up: function() 
                {
                    this.y -= this.step * this.speed;
                },
                down: function()
                {
                    this.y += this.step * this.speed;  
                } 
            });
    }
        
    getElements()
    {
        this.bars.push(this.ball);
        return this.bars; 
    }
}