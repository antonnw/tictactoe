// JavaScript Document	
$(document).ready(function() {
	var currentPlayer = "o";
	var btn = "btn-primary";
	var x = "x";
	var o = "o";
	var count = 0;
	var o_win = 0;
	var x_win = 0;
	var game_level = prompt("Please enter level ( any, > 3 )", "3");
	
	// Init Board
	createBoard(game_level);
	
	$('#game li').click(function(){
		if(count == (game_level*game_level)){
			$("#reset").click();
			alert('Its a tie. It will restart.');
		}
		else if($(this).hasClass('disable')){
			alert('Already selected');
		}
		else{
			// Primary Function
			// checkGame(this.id, count, game_level, currentPlayer, btn);
			
			if(checkGame(this.id, count, game_level, currentPlayer, btn)){
				alert(currentPlayer + " wins");
				// Add Score
				if(currentPlayer == "o"){
					o_win++;
					$("#o_win").text(o_win);
				}
				else if(currentPlayer == "x"){
					x_win++;
					$("#x_win").text(x_win);
				}
				$("#reset").click();
			}
			
			if(currentPlayer == "o"){
				currentPlayer = "x";
				btn = "btn-info";			
			}
			else if(currentPlayer == "x"){
				currentPlayer = "o";
				btn = "btn-primary";
			}
			
			count++;
		}
	});
	
	$("#reset").click(function () {
		currentPlayer = "x";
		btn = "btn-info";
		count = 0;
		resetGame();
	});
});

function createBoard(game_level) {
	// Set Title
	$("#level").text(game_level+" x "+game_level);
	
	// Reset Board
	$("#game").children("li").remove();
		
	// Create Board
	var widthBoard = parseFloat($("#board").width()) * (parseFloat(game_level) + 1);
	$("#board").css("width", widthBoard/3);
	$("#board").css("position", "absolute");
	$("#board").css("left", (screen.width - $("#board").width())/1.9);
	
	// Create Boxes
	for(var i=1; i <= game_level*game_level; i++){		
		var box = '<li id="'+i+'" class="btn span1" >+</li>';
		$("#game").append(box);
	}
}

function resetGame(){
	$("#game li").text("+");
	$("#game li").removeClass('disable')
	$("#game li").removeClass('o')
	$("#game li").removeClass('x')
	$("#game li").removeClass('btn-primary')
	$("#game li").removeClass('btn-info')	
}

function checkGame(id, count, game_level, currentPlayer, btn){	
	$("#"+id).text(currentPlayer);
	$("#"+id).addClass('disable '+currentPlayer+' '+btn);
	
	// ===================== Vertical Checking =====================
	// Define Steps for Vertical Checking [Top Row = 1,2,3,...]
	var step = [];
	for(var i=0; i < game_level; i++){
		step[i] = i+1;
	}
	// Check Vertical
	var win = false;
	var check = false;
	for(var i=0; i < step.length; i++){
		var count = parseInt(step[i]) + parseInt(game_level*(game_level-1));
		for(var j=0; j <= count; j++){
			var newJ = parseInt(step[i]) + parseInt(j*game_level);
			if(newJ <= count){
				if($("#"+newJ).hasClass(currentPlayer)){
					win = true;
				}
				else{
					win = false;
					break;
				}
			}
		}
		if(win == true){
			check = true;
			break;
		}
	}
	if(check){ return true; }
	
	// ===================== Horizontal Checking =====================
	// Define Steps for Horizontal Checking [Left Column = 1,4,7,...]
	var step = [];
	for(var i=0; i < game_level; i++){
		if(i == 0){
			step[i] = 1;
		}
		else{
			step[i] = step[i-1] + parseInt(game_level);
		}
	}
	// Check Horizontal
	var win = false;
	var check = false;
	for(var i=0; i < step.length; i++){
		var count = parseInt(step[i]) + parseInt(game_level);
		
		for(var j=step[i]; j < count; j++){
			if($("#"+j).hasClass(currentPlayer)){
				win = true;
			}
			else{
				win = false;
				break;
			}
		}
		if(win == true){
			check = true;
			break;
		}
	}	
	if(check){ return true; }
	
	// ===================== Diagonal-1 Checking =====================
	// Define Step for Diagonal-1 Checking [Left Top Corner = 1]
	var step = [];
	// Check Horizontal
	var win = false;
	var check = false;
	for(var i=0; i < game_level; i++){
		if(i == 0){
			step[i] = 1;
		}
		else if(i == game_level-1){
			step[i] = game_level*game_level;
		}
		else{
			step[i] = 1 + step[i-1] + parseInt(game_level);
		}
	}
	for(var j=0; j < game_level; j++){
		if($("#"+step[j]).hasClass(currentPlayer)){
			win = true;
		}
		else{
			win = false;
			break;
		}
	}
	if(win == true){
		check = true;
	}
	if(check){ return true; }
	
	// ===================== Diagonal-2 Checking =====================
	// Define Step for Diagonal-2 Checking [Right Top Corner = 3]
	var step = [];
	// Check Horizontal
	var win = false;
	var check = false;
	for(var i=0; i < game_level; i++){
		if(i == 0){
			step[i] = game_level;
		}
		else if(i == game_level-1){
			step[i] = (game_level*game_level) - parseInt(step[0]) + 1;
		}
		else{
			step[i] = parseInt(game_level) + parseInt(step[i-1]) - 1;
		}
	}
	for(var j=0; j < game_level; j++){
		if($("#"+step[j]).hasClass(currentPlayer)){
			win = true;
		}
		else{
			win = false;
			break;
		}
	}
	if(win == true){
		check = true;
	}
	if(check){ return true; }
}