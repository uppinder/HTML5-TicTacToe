function Board(boardData) {
	
	//declare all class properties
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

// function drawLines (lineWidth, strokeStyle) {
// 			  var lineStart = 4;
// 			  var lineLength = canvasSize - 5;
// 			  context.lineWidth = lineWidth;
// 			  context.lineCap = 'round';
// 			  context.strokeStyle = strokeStyle;
// 			  context.beginPath();

// 			  /*
// 			   * Horizontal lines 
// 			   */
// 			  for (var y = 1;y <= 2;y++) {  
// 			    context.moveTo(lineStart, y * sectionSize);
// 			    context.lineTo(lineLength, y * sectionSize);
// 			  }

// 			  /*
// 			   * Vertical lines 
// 			   */
// 			  for (var x = 1;x <= 2;x++) {
// 			    context.moveTo(x * sectionSize, lineStart);
// 			    context.lineTo(x * sectionSize, lineLength);
// 			  }

// 			  context.stroke();
// 	}

// 	drawLines(10, lineColor);