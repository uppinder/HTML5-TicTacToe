$(document).ready(function(){

	//Get Player Names
	var nameA = prompt("Enter Player Name 1:");
	var nameB = prompt("Enter Player Name 2:");

	nameA = (nameA != null)? nameA:"PlayerA";
	nameB = (nameB != null)? nameB:"PlayerB";

	var canvas = document.getElementById('game-board');
	var context = canvas.getContext('2d');
	var boardData = {
		canvas  : canvas,
		context : context,
		width   : 500,
		height  : 500,
		playerA : nameA,
		playerB : nameB
	}

	var board = new Board(boardData);
	
	board.drawBoard();
	$('#game-board').click(board.click);

		
});

		// var lineColor = "#ddd";
		// var canvas = document.getElementById('game-board');
		// var context = canvas.getContext('2d');
		
		// var canvasSize = 500;
		// var sectionSize = canvasSize/3;
		// canvas.width = canvasSize;
		// canvas.height = canvasSize;
		// context.translate(0.5,0.5);