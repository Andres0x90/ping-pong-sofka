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
            case "circle":
                this.ctx.beginPath();
                this.ctx.arc(element.x,element.y,element.radius,0,7)
                this.ctx.fill();
                this.ctx.closePath();
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
        this.createBall(350,100,10);        

        this.ctx = this.canvas.getContext("2d");
    }
    
    createBoardContentView()
    {
        this.createBarsView();    //Renderizacion de las barras
        this.createBallView();    //Renderizacion de la pelota
        this.ball.move();
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

    createBallView()
    {
        this.draw(this.ball);
    }
    
    createBall(x,y,radius)
    {
        this.ball = 
        {
            kind: "circle",
            x: x,
            y: y,
            radius: radius,
            step_x: 3,
            step_y: 0,
            direction: 1,
            move: function()
            {
                this.x += this.step_x * this.direction;
                this.y += this.step_y;
            }
        }
    }

    getElements()
    {
        this.bars.push(this.ball);
        return this.bars; 
    }
}