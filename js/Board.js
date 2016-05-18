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
 	this.isATurn     = true; 
	this.gameStatus  = "active";
	this.cellObjects = [];

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
			this.cell[i].push(cell);
		}
	}
}

Board.prototype.drawBoard = function() {
		
		var lineStart            = 4;
		var lineLength           = this.width - 5;
		this.context.lineWidth   = lineWidth;
		this.context.lineCap     = 'round';
		this.context.strokeStyle = "#ddd";
		
		context.beginPath();

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

		context.stroke();

}