function Game() {
    this.viewX = 0;
    this.viewY = 0;
    //il <div> che contiene l'elemento canvas
    this.div = document.getElementById("GameDiv");
    this.div.style.width = "768px";
    this.div.style.height = "512px"

    //l'elemento <canvas>
    this.canvas = document.getElementById("GameCanvas");
    this.canvas.setAttribute("width", "768");
    this.canvas.setAttribute("height", "512");
    this.canvas.defaultWidth = this.canvas.width;
    this.canvas.defaultHeight = this.canvas.height;

    //nasconde il cursore
    this.canvas.style.cursor = "none";

    //context 2d
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) {
        alert("Il tuo browser non supporta HTML5, aggiornalo!");
    }

    function StartGame() {
        //crea un istanza di Game
        game = new Game();
    }

    this.GameLoop = function () {

        if (!this.paused) {

            // aggiorna tutti gli oggetti
            this.Update();
        }

        //disegna l'intera scena a schermo
        this.Draw();

        window.requestAnimFrame(function () {

            // rilancia la funzione GameLoop ad ogni frame
            game.GameLoop();
        });

        Inputs.Clear();
    }

    rh = new ResourcesHandler(function () {

        game.LoadLevel(0);
        game.GameLoop();
    });

// Ricordiamo la sintassi di LoadSprite:
// ResourceHandler.LoadSprite(src, subimages, callback);

    this.sprLogo = rh.LoadSprite("img/logo.png", 1);
    this.sprSplashLogo = rh.LoadSprite("img/splashLogo.png", 1);

//cursore del mouse
    this.sprCursor = rh.LoadSprite("img/cursor.png", 1);

    this.backgroundMenu = rh.LoadSprite("img/backgroundmenu.png", 1, function () {

        game.patternMenu = game.ctx.createPattern(game.backgroundMenu, "repeat");
    });

    // Suoni
    this.sndMusic = rh.LoadSound("audio/datagrove", ["ogg", "mp3"]);

    this.ResetLevel = function () {

        this.mainMenu = null;
        this.levelCompleted = null;
        this.score = 0;

        this.player = null;
    }

    this.LoadLevel = function (lev) {

        this.level = lev;

        this.ResetLevel();

        if (lev == 0) {
            this.mainMenu = new MainMenu();
        }
        else {
            //carica un livello di gioco
            this.player = new Player();
        }
    }

    this.Draw = function () {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.level == 0) {

            //menu principale
            this.mainMenu.Draw();
        }
        else {

            //disegna il fondale "sky.png" riempiendo il canvas
            this.ctx.drawImage(this.background1, 0, 0, this.canvas.width, this.canvas.height);

            //livello di gioco
            this.player.Draw();
        }

        //disegna il cursore
        game.ctx.drawImage(game.sprCursor, Inputs.mouseX - game.sprCursor.width / 2, Inputs.mouseY - game.sprCursor.height / 2);
    }

    this.Update = function () {

    }

    //ResourceHandler.LoadSprite(src, subimages, callback);
    this.sprPlayerIdle = rh.LoadSprite("img/playerIdle.png", 2);
    this.sprPlayerIdleShot = rh.LoadSprite("img/playerShot.png", 1);
    this.sprPlayerRun = rh.LoadSprite("img/playerRun.png", 6);
    this.sprPlayerJump = rh.LoadSprite("img/playerJump.png", 1);
    this.sprPlayerJumpShot = rh.LoadSprite("img/playerJumpShot.png", 1);
    this.sprPlayerFall = rh.LoadSprite("img/playerFall.png", 1);
    this.sprPlayerFallShot = rh.LoadSprite("img/playerFallShot.png", 1);
    this.background1 = rh.LoadSprite("img/sky.png", 1);

    function Player() {
        this.sprite = game.sprPlayerRun;
        this.curFrame = 0;
        this.animSpeed = 0.2;
        this.width = this.sprite.w;
        this.height = this.sprite.height;
        this.xStart = game.canvas.width / 2;
        this.yStart = game.canvas.height / 2 - 60;
        this.x = this.xStart;
        this.y = this.yStart;
        this.xOffset = Math.floor(this.width / 2);
        this.yOffset = this.height;

        this.Draw = function () {
            game.ctx.save();
            game.ctx.translate(this.x - game.viewX, this.y - game.viewY);
            game.ctx.scale(this.scaling, 1);

            var ox = Math.floor(this.curFrame) * this.width;

            game.ctx.drawImage(this.sprite, ox, 0,
                this.sprite.w, this.sprite.height,
                -this.xOffset, -this.yOffset,
                this.sprite.w, this.sprite.height);

            game.ctx.restore();
        }
    }
}
