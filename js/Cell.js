/*
	Define the Cell class. Properties taken from
	cellData passed on from Board Class.
 */
function Cell(cellData) {
	
	this.XCoordinate = cellData.cellXCoordinate;
	this.YCoordinate = cellData.cellYCoordinate;
	this.width   = cellData.width;
	this.height  = cellData.height;
	this.canvas  = cellData.canvas;
	this.context = cellData.context;

	this.empty  = true;
	this.symbol = "";

}

Cell.prototype.drawX = function() {

	/*
		Only draw if the cell is empty.
	 */
	if(this.empty == true) {

		this.context.lineWidth = 10;
		this.context.strokeStyle = "#f1be32";
		
		this.context.beginPath();

		var offset = 50;
		// Draw '\' 
		this.context.moveTo(this.XCoordinate + offset,this.YCoordinate + offset);
		this.context.lintTo(this.XCoordinate + this.width - offset,this.YCoordinate + this.width - offset);

		// Draw '/'
		this.context.moveTo(this.XCoordinate + offset,this.YCoordinate + this.width - offset);
		this.context.lintTo(this.XCoordinate + this.width - offset,this.YCoordinate + offset);
		
		this.context.stroke();

		this.empty  = false;
		this.symbol = "X";

	}
}

Cell.prototype.drawO = function() {
	/*
		Only draw if the cell is empty.
	 */
	if(this.empty == true) {

		var halfCellWidth = 0.5 * this.width;
		
		var centerX = this.XCoordinate + halfCellWidth;
		var centerY = this.YCoordinate + halfCellWidth;

		var radius  = (this.width - 100) / 2;
		var startAngle = 0 * Math.PI;
		var endAngle   = 2 * Math.PI;

		this.context.lineWidth   = 10;
		this.context.strokeStyle = "#01bBC2";
		this.context.beginPath();
		this.context.arc(centerX,centerY,radius,startAngle,endAngle);
		this.context.stroke(); 
	
		this.empty  = false;
		this.symbol = "O";
	}	
}














