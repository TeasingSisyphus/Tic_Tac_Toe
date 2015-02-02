window.onload = function() {
  //alert('loaded!');
  //The template game object
  var Game = function() {
    this.turn = 0;
    this.symbol = ['X', 'O'];
    this.turnsymbol = 'X';
    this.board = [
      [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ],
      [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ],
      [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ],
      [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ]
    ];
  };

  ////////////////
  //Game Methods//
  ////////////////

  //Clears board
  Game.prototype.clear = function() {
    $('.place').text('');
    for (board = 0; board < 4; board++) {
      for (row = 0; row < 4; row++) {
        for (column = 0; column < 4; column++) {
          this.board[board][row][column] = '';
        }
      }
    }
    //On click function for place will increment turn then change turn symbol after this is called
    this.turn = -1;
  };

  //Displays victory message with player symbol
  Game.prototype.victory = function() {
    var msg = 'Player ' + this.turnsymbol + ' Wins!';
    alert(msg);
    this.clear();
  };

  //Checks for win where only board index changes
  Game.prototype.check_board = function() {
    //alert('Checking Rows');
    for (row = 0; row < 4; row++) {
      for (column = 0; column < 4; column++) {
        var count = 0;
        for (board = 0; board < 3; board++) {
          if (this.board[board][row][column] != '') {
            if (this.board[board][row][column] == this.board[board + 1][row][column]) {
              count++;
              //alert('row ' + row + ' count ' + count);
            }
          }
          if (count == 3) {
            this.victory()
          }
        }
      }
    }
  };

  //Checks each board for a win across one row
  Game.prototype.check_rows = function() {
    //alert('Checking Rows');
    for (board = 0; board < 4; board++) {
      for (row = 0; row < 4; row++) {
        var count = 0;
        for (column = 0; column < 3; column++) {
          if (this.board[board][row][column] != '') {
            //alert('symbol ' + this.board[board][row][column] );
            //alert(this.board[board][row][column] == this.board[board][row][column + 1]);
            //alert('First count is  ' + count);
            if (this.board[board][row][column] == this.board[board][row][column + 1]) {
              count++;
              //alert('row ' + row + ' count ' + count);
            }
          }
          if (count == 3) {
            this.victory()
          }
        }
      }
    }
  };

  //Checks each board for a win across one column
  Game.prototype.check_columns = function() {
    //alert('Checking Rows');
    for (board = 0; board < 4; board++) {
      for (column = 0; column < 4; column++) {
        var count = 0;
        for (row = 0; row < 3; row++) {
          if (this.board[board][row][column] != '') {
            //alert('symbol ' + this.board[board][row][column] );
            //alert(this.board[board][row][column] == this.board[board][row][column + 1]);
            //alert('First count is  ' + count);
            if (this.board[board][row][column] == this.board[board][row + 1][column]) {
              count++;
              //alert('row ' + row + ' count ' + count);
            }
          }
          if (count == 3) {
            this.victory()
          }
        }
      }
    }
  };

  //Checks each board for a win across the diagonal
  Game.prototype.check_diag = function() {
    //Iterates through each board
    for (board = 0; board < 4; board++) {
      var count1 = 0;
      var count2 = 0;
      for (i = 0; i < 3; i++) {
        //Checks for diagonal from top left in current board
        if (this.board[board][i][i] != '') {
          if (this.board[board][i][i] == this.board[board][i + 1][i + 1]) {
            count1++;
          }
        }
        //Checks for diagonal from top right in current board
        if (this.board[board][i][3 - i] != '') {
          if (this.board[board][i][3 - i] == this.board[board][i + 1][2 - i]) {
            count2++;
          }
        }
      }

      if (count1 == 3) {
        this.victory();
      }

      if (count2 == 3) {
        this.victory();
      }
      
    }
  };

  //Checks for a win where the board and row change, but column is constant
  Game.prototype.check_board_row = function() {
    for (column = 0; column < 4; column++) {
      var count1 = 0;
      var count2 = 0;
      for (i = 0; i < 3; i++) {
        //Checks for a win with the top row in the top board
        if (this.board[i][i][column] != '') {
          if (this.board[i][i][column] == this.board[i + 1][i + 1][column]) {
            count1++;
          }
        }
        //Checks for a win with the bottom row in the top board
        if (this.board[i][3 - i][column] != '') {
          if (this.board[i][3 - i][column] == this.board[i + 1][2 - i][column]) {
            count2++;
          }
        }
      }
      if (count1 == 3) {
        this.victory();
      }
      if (count2 == 3) {
        this.victory();
      }
    }
  };

  //Checks for wins where the board and columns change but the row is constant
  Game.prototype.check_board_column = function() {
    for (row = 0; row < 4; row++) {
      var count1 = 0;
      var count2 = 0;
      for (i = 0; i < 3; i++) {
        //Checks for a win with the left column in the top board
        if (this.board[i][row][i] != '') {
          if (this.board[i][row][i] == this.board[i + 1][row][i + 1]) {
            count1++;
          }
        }

        //Checks for a win with the right column in the right board
        if (this.board[i][row][3 - i] != '') {
          if (this.board[i][row][3 - i] == this.board[i + 1][row][2 - i]) {
            count2++;
          }
        }
      }
      if (count1 == 3) {
        this.victory();
      }
      if (count2 == 3) {
        this.victory();
      }
    }
  };

  //Checks for win where board, row and column all change by 1
  Game.prototype.check_board_row_column = function() {
    //Each count represents a different diagonal all the way through the cube
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    for (i = 0; i < 3; i++) {
      //Diagonal with top left symbol in top board
      if (this.board[i][i][i] != '') {
        if (this.board[i][i][i] == this.board[i + 1][i + 1][i + 1]) {
          count1++
        }
      }
      if (count1 == 3) {
        this.victory();
      }
      //Diagonal with top right symbol in top board
      if (this.board[i][i][3 - i] != '') {
        if (this.board[i][i][3 - i] == this.board[i + 1][i + 1][2 - i]) {
          count2++;
        }
      }
      if (count2 == 3) {
        this.victory();
      }
      //Diagonal with bottom left symbol in top board
      if (this.board[i][3 - i][i] != '') {
        if (this.board[i][3 - i][i] == this.board[i + 1][2 - i][i + 1]) {
          count3++;
        }
      }
      if (count3 == 3) {
        this.victory();
      }
      //Diagonal with bottom right symbol in top board
      if (this.board[i][3 - i][3 - i] != '') {
        if (this.board[i][3 - i][3 - i] == this.board[i + 1][2 - i][2 - i]) {
          count4++;
        }
      }
      if (count4 == 3) {
        this.victory();
      }
    }
  };

  //Calls all win-checks
  Game.prototype.check = function() {
    this.check_board();
    this.check_rows();
    this.check_columns();
    this.check_diag();
    this.check_board_row();
    this.check_board_column();
    this.check_board_row_column();
  };

  //Renders game game board (html) based on this.board array
  Game.prototype.render = function() {
    var self = this;
    $('.place').each(function() {
      if ($(this).prop('id').charAt(0) == 'w') {
        var b_index = 0;
      } else if ($(this).prop('id').charAt(0) == 'x') {
        var b_index = 1;
      } else if ($(this).prop('id').charAt(0) == 'y') {
        var b_index = 2;
      } else if ($(this).prop('id').charAt(0) == 'z') {
        var b_index = 3;
      }
      //raw_index is taken from id of event target, then converted to a row and column indexes
      var raw_index = $(this).prop('id');
      raw_index = raw_index.replace(/[^\d]/g, '');
      var c_index = (parseInt(raw_index) + 3) % 4;
      if (raw_index < 5) {
        var r_index = 0;
      } else if (raw_index < 9) {
        var r_index = 1;
      } else if (raw_index < 13) {
        var r_index = 2;
      } else {
        var r_index = 3;
      }
      //Fills each place with the symbol stored corresonding spot in game.board
      $(this).text(self.board[b_index][r_index][c_index]);
    });
  };

  //////////////////
  //Game Structure//
  //////////////////

  //Instantiates a new game
  var game = new Game();

  //This code stuffs places with symbols then calls the win-checks and incriments the turn
  $('.place').on("click", function() {
    //Fetches index from place clicked
    //Fetches board index based on first letter of class
    if ($(event.target).prop('id').charAt(0) == 'w') {
      var b_index = 0;
    }
    if ($(event.target).prop('id').charAt(0) == 'x') {
      var b_index = 1;
    }
    if ($(event.target).prop('id').charAt(0) == 'y') {
      var b_index = 2;
    }
    if ($(event.target).prop('id').charAt(0) == 'z') {
      var b_index = 3;
    }

    //raw_index is taken from class of event target, then converted to a row and column indexes
    var raw_index = $(event.target).prop('id');
    raw_index = raw_index.replace(/[^\d]/g, '');
    var c_index = (parseInt(raw_index) + 3) % 4;
    if (raw_index < 5) {
      var r_index = 0;
    } else if (raw_index < 9) {
      var r_index = 1;
    } else if (raw_index < 13) {
      var r_index = 2;
    } else {
      var r_index = 3;
    }

    //alert('row ' + r_index);

    //Checks if Board is filled in the spot just clicked
    if (game.board[b_index][r_index][c_index] == '') {
      //Fills board with turn symbol in space referenced by the index
      game.board[b_index][r_index][c_index] = game.turnsymbol;

      //Renders new boardstate, checks for win, incriments turn and changes turnsymbol
      game.render();
      game.check();
      game.turn++;
      game.turnsymbol = game.symbol[game.turn % 2];
    }

    //Alerts user to misclick
    else {
      alert("Fuck off!");
    }

  });
  //This resets game board
  $('#butt').click(
    function() {
      game.clear();
      game.turn++;
      game.turnsymbol = 'X'
    });
};