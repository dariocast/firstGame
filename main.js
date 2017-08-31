function Game() {
	    //il <div> che contiene l'elemento canvas
	    this.div = document.getElementById("GameDiv");
	        this.div.style.width = "768px";
	            this.div.style.height = "512px"
	             
	                 //l'elemento <canvas>
	                     this.canvas = document.getElementById("GameCanvas");
	                         this.canvas.setAttribute("width","768");
	                             this.canvas.setAttribute("height","512");
	                                 this.canvas.defaultWidth = this.canvas.width;
	                                     this.canvas.defaultHeight = this.canvas.height;
	                                      
	                                          //nasconde il cursore
	                                              this.canvas.style.cursor = "none"; 
	                                               
	                                                   //context 2d
	                                                       this.ctx = this.canvas.getContext("2d");
	                                                           if(!this.ctx){
	                                                                   alert("Il tuo browser non supporta HTML5, aggiornalo!");
	                                                                       }
	                                                                       }
	                                                                        
	                                                                        function StartGame(){
	                                                                            //crea un istanza di Game
	                                                                                game = new Game();

this.GameLoop = function() {
   
        if(!this.paused) {
	             
	          // aggiorna tutti gli oggetti
		             this.Update(); 
		                     }
		                      
		                              //disegna l'intera scena a schermo
		                                      this.Draw();
		                                               
		                                                       window.requestAnimFrame(function() {
		                                                            
		                                                                        // rilancia la funzione GameLoop ad ogni frame
		                                                                                    game.GameLoop(); 
		                                                                                            });
		                                                                                                }
}
