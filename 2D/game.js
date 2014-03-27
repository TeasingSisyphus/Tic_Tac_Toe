window.onload = function() {
	//The template game object
	var Game = function() {
		this.turn = 0;
		this.symbol = ['X', 'O'];
		this.turnsymbol = 'X';
		this.board = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];

		//Clears board
		this.clear = function() {
			$('.place').text('');
			for (row = 0; row < 3; row++) {
				for (column = 0; column < 3; column++) {
					this.board[row][column] = '';
				}
			}
			//On click function for .place will increment game.turn then change turn symbol after this is called
			this.turn = -1;
		}

		//Displays victory message with player symbol
		this.victory = function() {
			var msg = 'Player ' + this.turnsymbol + ' Wins!';
			alert(msg);
			this.clear();
		}

		//Checks for a win (Win-cons are hard coded: EWWWWWWWWWWWWWW)
		this.check = function() {
			if (this.board[0][0] != '') {
				//Row 0
				if (this.board[0][0] == this.board[0][1] && this.board[0][0] == this.board[0][2]) {
					this.victory();
				}
				//Column 0
				else if (this.board[0][0] == this.board[1][0] && this.board[0][0] == this.board[2][0]) {
					this.victory();
				}
				//Diag from 0,0
				else if (this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]) {
					this.victory();
				}
			}
			//Column 1
			if (this.board[0][1] != '') {

				if (this.board[0][1] == this.board[1][1] && this.board[0][1] == this.board[2][1]) {
					this.victory();
				}
			}

			//Column 2
			if (this.board[0][2] != '') {
				if (this.board[0][2] == this.board[1][2] && this.board[0][2] == this.board[2][2]) {
					this.victory();
				}
				//Diag from 0,2
				else if (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]) {
					this.victory();
				}
			}
			//Row 1
			if (this.board[1][0] != '') {
				if (this.board[1][0] == this.board[1][1] && this.board[1][0] == this.board[1][2]) {
					this.victory();
				}
			}
			//Row 2
			if (this.board[2][0] != '') {
				if (this.board[2][0] == this.board[2][1] && this.board[2][0] == this.board[2][2]) {
					this.victory();
				}
			}
		}
	}
	//instantiating a new game
	var game = new Game();

	//This code stuffs places with things
	$('.place').click(
		function() {

			//Fetches index from place clicked
			var index = $(event.target).prop('class');
			index = index.replace(/[^\d]/g, '');
			var c_index = (index + 2) % 3;
			if (index < 4) {
				var r_index = 0;
			} else if (index < 7) {
				var r_index = 1;
			} else {
				var r_index = 2;
			}

			//Checks if Board is filled in the spot just clicked
			if (game.board[r_index][c_index] == '') {
				//Inserts game.turnsymbol into game.board at the index specified by the place clicked      
				$(event.target).text(game.turnsymbol);

				//Fills board with turn symbol in space referenced by the index
				game.board[r_index][c_index] = game.turnsymbol;

				//Prints Board state after turn
				/* var message = 'row' + r_index + 'column' + c_index + 'board' + game.board;
        alert(message); */

				//Checks for win
				game.check();
				game.turn++;
				game.turnsymbol = game.symbol[game.turn % 2];
			}

			//Alerts user to misclick
			else {
				alert("Fuck off!");
			}

		}
	);
	//This puts the text from game.board[1] into butt div
	$('#butt').click(
		function() {
			game.clear()
		});
};