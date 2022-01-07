//c'est une fonction qui se lance quand la fenêtre va s'afficher
window.onload = function()
{
    //le canvas doit être vu comme une grille composé de plein de petit bloc defini en x et y x= horizontal et y = vertical
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    
    init();

    //init non standard qui permet d'initialiser des choses(ici on créer nos élément)
    function init()
    {
        //permet de créer un espace pour pouvoir déssiner dessus
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        //permet de connecté notre html avec la balise body et appendchild (permet d'accrocher un tag au body) et une fonction incluse dans le JS. 
        document.body.appendChild(canvas);
        //pour dessiné dans le canvas on utilise le context 2d
        ctx = canvas.getContext('2d');
        //création du snake le tableau définis l'emplacement que prendra le snake
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        refreshCanvas();
    }   


   function refreshCanvas()
   {    
        //le x et le y vont bouger a chaque fois que la page va se rafraichire
        //permet d'effacer toute la largeur et la hauteur du canvas
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas,delay);
   }

   function drawBlock(ctx, position)
   {
       var x = position[0] * blockSize;
       var y = position[1] * blockSize;
       ctx.fillRect(x , y, blockSize, blockSize);
   }

   //mouvement du serpent 
   function Snake(body,direction)
   {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for( var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            //permet de remettre le ctx comme il était avant
            ctx.restore();
        };
        this.advance = function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    //fonction qui montre une erreur
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function (newDirection)
        {
            var allowedDirections;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");
            }
            if(allowedDirections.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };
   }

    //A chaque fois qu'on va apuiyer sur les clavier c'est cette partie du code qui va intervenir.
   document.onkeydown = function handleKeyDown(e)
   {
    var key = e.keyCode;
    var newDirection;
    switch(key)
     {
        case 37:
            newDirection = "left";
            break;
         case 38:
             newDirection = "up";
             break;
         case 39:
             newDirection = "right";
             break;
         case 40:
             newDirection = "down";
             break;
         default:
             return;
    }
    
    snakee.setDirection(newDirection);
    }

       

}


