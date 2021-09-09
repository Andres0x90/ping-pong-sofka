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
            width: radius * 2,
            height: radius * 2,
            bounce_angle: 0,
            max_bounce_angle: Math.PI / 12,
            speed: 3,
            speed_x: 3,
            speed_y: 0,
            direction: 1,
            move: function()
            {
                this.x += this.speed_x * this.direction;
                this.y += this.speed_y;
            },
            hit: function (a,b){
                //Revisa si a colisiona con b
                var hit = false;
                //Colisiones hirizontales
                if(b.x + b.width >= a.x && b.x < a.x + a.width){
              
                 //Colisiona verticales
                 if (b.y + b.height >= a.y && b.y < a.y + a.height) 
                  hit = true;
                }
              
                //Colisión de a con b
                if(b.x <= a.x && b.x + b.width >= a.x + a.width){
                 
                 if (b.y <= a.y && b.y + b.height >= a.y + a.height) 
                  hit = true;
                }
              
                //Colision b con a
                if(a.x <= b.x && a.x + a.width >= b.x + b.width){
                 //Colisiona verticales
                 if (a.y <= b.y && a.y + a.height >= b.y + b.height) 
                  hit = true;
                }
                return hit;
               }
        }
    }
    collision(bar)
    {
        //Reacciona a la colisiona con una barra que recibe como parametro  
        var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.ball.y;
    
        var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
    
        this.ball.bounce_angle = normalized_intersect_y * this.ball.max_bounce_angle;
    
        this.ball.speed_y = this.ball.speed * -Math.sin(this.ball.bounce_angle);
        this.ball.speed_x = this.ball.speed * Math.cos(this.ball.bounce_angle);
    
        if (this.ball.x > (this.width / 2)) this.ball.direction = -1;
        else this.ball.direction = 1;
    
    }
    checkAnyCollition()
    {
        this.bars.forEach((bar) => 
        {
            if (this.ball.hit(bar, this.ball))
                this.collision(bar);
        });
    }
}