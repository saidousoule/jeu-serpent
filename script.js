//c'est une fonction qui se lance quand la fenêtre va s'afficher
window.onload = function()
{
    var canvas;
    var ctx;
    var delay = 100;
    var xCoord = 0;
    var yCoord = 0;
    
    init();

    //init non standard qui permet d'initialiser des choses(ici on créer nos élément)
    function init()
    {
        //permet de créer un espace pour pouvoir déssiner dessus
        canvas = document.createElement('canvas');
        canvas.width =900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        //permet de connecté notre html avec la balise body et appendchild (permet d'accrocher un tag au body) et une fonction incluse dans le JS. 
        document.body.appendChild(canvas);
        //pour dessiné dans le canvas on utilise le context 2d
        ctx = canvas.getContext('2d');
        //on definis la couleur avec quoi on décine
        refreshCanvas();
    }   


   function refreshCanvas()
   {    
        //le x et le y vont bouger a chaque fois que la page va se rafraichire
        xCoord += 2;
        yCoord += 2; 
        //permet d'effacer toute la largeur et la hauteur du canvas
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //fillStyle ajoute du style à notre code
        ctx.fillStyle="#ff0000";
        //on définie un rectangle x et y vertical et horrizontale
        ctx.fillRect(xCoord, yCoord, 100, 50); 
        setTimeout(refreshCanvas,delay);
   }

}