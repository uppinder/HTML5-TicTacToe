function Board(boardData) {
	

	//Declare all class properties
	this.canvas      = boardData.canvas;
	this.context     = boardData.context;
	this.width       = boardData.width;
	this.height      = boardData.height;
	this.playerA     = boardData.playerA;
	this.playerB     = boardData.playerB;
	
	this.cellWidth   = this.width/3;
	this.cellHeight  = this.height/3;

	this.moves       = 0;
 	this.isXTurn     = true; 
	this.gameStatus  = "active";
	this.cellObjects = [];

	this.winningCombinations =  [
				      [{x:0,y:0},{x:1,y:0},{x:2,y:0}],[{x:0,y:1},{x:1,y:1},{x:2,y:1}],[{x:0,y:2},{x:1,y:2},{x:2,y:2}],
				      [{x:0,y:0},{x:0,y:1},{x:0,y:2}],[{x:1,y:0},{x:1,y:1},{x:1,y:2}],[{x:2,y:0},{x:2,y:1},{x:2,y:2}],
				      [{x:0,y:0},{x:1,y:1},{x:2,y:2}],[{x:0,y:2},{x:1,y:1},{x:2,y:0}]
				    ];
	/*
		Create 9 cell objects.
	 */
	for (var i = 0; i < 3; ++i) {
		this.cellObjects.push([]);

		for (var j = 0; j < 3; ++j) {
			/*
				Package data for a cell and
				instantiate it for that
				cell object.
			 */
			var cellData = {
				cellXCoordinate : j * this.cellWidth,  // Coordinates for the top-left
				cellYCoordinate : i * this.cellWidth,  // corner of a cell
				width   : this.cellWidth, 
				height  : this.cellHeight,
				canvas  : this.canvas,
				context : this.context
			};

			/*
				Create New Cell Object and pass 
				cellData to constructor.
			 */
			var cell = new Cell(cellData);
			this.cellObjects[i].push(cell);
		}
	}
}

Board.prototype.isInBounds = function(coordinates) {
	
	return (coordinates.mouseX > 0 && coordinates.mouseX < coordinates.width) &&
	       (coordinates.mouseY > 0 && coordinates.mouseY < coordinates.height);
}

Board.prototype.getCell = function(c) {

	var cellWidth = c.width/3; 
	var cellHeight = c.height/3; 
	
	var i = parseInt(c.mouseX/cellWidth);
	var j = parseInt(c.mouseY/cellHeight);
	return {x:i,y:j}
}

Board.prototype.isWinCombination = function(combo,gameBoard) {

	return (gameBoard.cellObjects[combo[0].x][combo[0].y].symbol === gameBoard.cellObjects[combo[1].x][combo[1].y].symbol ) &&
	       (gameBoard.cellObjects[combo[1].x][combo[1].y].symbol === gameBoard.cellObjects[combo[2].x][combo[2].y].symbol ) &&
               (gameBoard.cellObjects[combo[0].x][combo[0].y].symbol !== "" )

}

Board.prototype.checkStatus = function(gameBoard) {

	/*
		If no further move can be made,
		game is a tie.
	 */
	if (gameBoard.moves == 9) 
		return "tie";

	/*
		Check for winnining combination.
	 */
	for (var i = 0; i < this.winningCombinations.length; ++i) {

		var combo = this.winningCombinations[i];
		if (gameBoard.isWinCombination(combo,gameBoard))
			return "win";
	}

	return "active";
}

Board.prototype.click = function(e) {
	
	var gameBoard = e.data.board;
	var coordinates = {
		mouseX : e.originalEvent.layerX,
		mouseY : e.originalEvent.layerY,
		width  : gameBoard.width,
		height : gameBoard.height
	}
	
	/*
		Check if inbounds and game is active.
	 */
	if (!gameBoard.isInBounds(coordinates) || gameBoard.gameStatus != "active") {
		return;
	}

	/*
		Check if the cell clicked on doesn't
		already have an 'X' or 'O'
	 */
	var cell = gameBoard.getCell(coordinates);
	if(gameBoard.cellObjects[cell.y][cell.x].symbol != "")
		return;

	gameBoard.moves++;

	if (gameBoard.isXTurn) {	
		gameBoard.cellObjects[cell.y][cell.x].drawX();
		gameBoard.isXTurn = !gameBoard.isXTurn;
	} else {
		gameBoard.cellObjects[cell.y][cell.x].drawO();
		gameBoard.isXTurn = !gameBoard.isXTurn;
	}

	gameBoard.gameStatus = gameBoard.checkStatus(gameBoard);

	if (gameBoard.gameStatus == "active") {
		console.log(gameBoard.isXTurn? "X":"O");
	} else if (gameBoard.gameStatus == "win") {
		alert(gameBoard.isXTurn? "O" : "X" + " won!");
	} else if (gameBoard.gameStatus == "tie") {
		alert("It's a Tie!");	
	}


} 


/*
	Draw the Tic-Tac-Toe Board
 */
Board.prototype.drawBoard = function() {
		
		var lineStart            = 4;
		var lineLength           = this.width - 5;
		this.context.lineWidth   = 10;
		this.context.lineCap     = 'round';
		this.context.strokeStyle = "#ddd";
	
		this.context.beginPath();

		/*
		* 	Horizontal lines 
		*/
		for (var j = 1;j <= 2; ++j) {
			this.context.moveTo(lineStart, j * this.cellHeight);
			this.context.lineTo(lineLength, j * this.cellHeight);
		}

		/*
		* 	Vertical lines 
		*/
		for (var i = 1;i <= 2; ++i) {
			this.context.moveTo(i * this.cellWidth, lineStart);
			this.context.lineTo(i * this.cellWidth, lineLength);
		}

		this.context.stroke();
		this.context.closePath();

}
