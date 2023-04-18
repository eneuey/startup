class Game {
    board;
    playerTurn;
    largeWhite;
    mediumWhite;
    smallWhite;
    largeBlack;
    mediumBlack;
    smallBlack;

    constructor() {
        //this.board = [[[],[],[]],[[],[],[]],[[],[],[]]];
        //this.board = {"zero":{}, "one":{}, "two":{}, "three":{}, "four":{}, "five":{}, "six":{}, "seven":{}, "eight":{}};
        this.board = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        this.swap = {};
        this.playerTurn = true;

        this.largeWhite = false;
        this.mediumWhite = false;
        this.smallWhite = false;
        this.largeBlack = false;
        this.mediumBlack = false;
        this.smallBlack = false;

        this.LWCounter = 2;
        this.MWCounter = 2;
        this.SWCounter = 2;
        this.LBCounter = 2;
        this.MBCounter = 2;
        this.SBCounter = 2;

        this.winner = false;

        this.displayNames();
        this.displayCounts();

        // if(this.board.zero.hasOwnProperty('poop')) {
        //     console.log("pooooooooooooooooo");
        // }
    }
    displayNames() {
        const playerName = localStorage.getItem('userName') ?? 'Mystery player';
        const playerEl = document.querySelectorAll(".player-name");
        playerEl.forEach(element => element.textContent = playerName);
    }
    displayCounts() {
        document.querySelector(".LWCounter").textContent = this.LWCounter;
        document.querySelector(".MWCounter").textContent = this.MWCounter;
        document.querySelector(".SWCounter").textContent = this.SWCounter;
        document.querySelector(".LBCounter").textContent = this.LBCounter;
        document.querySelector(".MBCounter").textContent = this.MBCounter;
        document.querySelector(".SBCounter").textContent = this.SBCounter;
    }
    nextTurn() {
        if(!this.CheckForWin()) {
            if(this.playerTurn) {
                const whiteTurn = document.querySelector("#whiteTurn");
                removeAllChildNodes(whiteTurn);
                const blackTurn = document.querySelector("#blackTurn");
                blackTurn.textContent = "Your Turn!";
                this.playerTurn = false;
            }
            else {
                const blackTurn = document.querySelector("#blackTurn");
                removeAllChildNodes(blackTurn);
                const whiteTurn = document.querySelector("#whiteTurn");
                whiteTurn.textContent = "Your Turn!";
                this.playerTurn = true;
            }
        }
    }
    selectLargeWhite() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.largeWhite){
            this.largeWhite = false;
        } 
        else if(this.playerTurn && this.LWCounter > 0) {
            this.largeWhite = true;
            this.mediumWhite = false;
            this.smallWhite = false;
        }  
        
    }
    selectMediumWhite() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.mediumWhite){
            this.mediumWhite = false;
        } 
        else if(this.playerTurn && this.MWCounter > 0) {
            this.mediumWhite = true;
            this.largeWhite = false;
            this.smallWhite = false;
        }
    }
    selectSmallWhite() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.smallWhite){
            this.smallWhite = false;
        } 
        else if(this.playerTurn && this.SWCounter > 0) {
            this.smallWhite = true;
            this.largeWhite = false;
            this.mediumWhite = false;
        }
    }
    selectLargeBlack() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.largeBlack){
            this.largeBlack = false;
        } 
        else if(!this.playerTurn && this.LBCounter > 0) {
            this.largeBlack = true;
            this.mediumBlack = false;
            this.smallBlack = false;
        }   
    }
    selectMediumBlack() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.mediumBlack){
            this.mediumBlack = false;
        } 
        else if(!this.playerTurn && this.MBCounter > 0) {
            this.mediumBlack = true;
            this.largeBlack = false;
            this.smallBlack = false;
        }
    }
    selectSmallBlack() {
        if(Object.keys(this.swap).length) {
            this.swap = {};
        }
        if (this.smallBlack){
            this.smallBlack = false;
        } 
        else if(!this.playerTurn && this.SBCounter > 0) {
            this.smallBlack = true;
            this.largeBlack = false;
            this.mediumBlack = false;
        }
    }
    placer(piece, num) {
        const square = document.querySelector(`#${num}`);
        removeAllChildNodes(square)
        square.appendChild(piece);
    }
    pieceFactory(type) {
        let div = document.createElement("div");
        div.className = `${type}`;
        return div;
    }
    squarePlacer(num, index) {
        if(this.playerTurn) {
            if(this.largeWhite && !this.board[index].hasOwnProperty('three')) {
                const piece = this.pieceFactory("white-large")
                this.placer(piece, num);
                this.board[index].three = piece;
                this.largeWhite = false;
                this.LWCounter--;
                this.nextTurn();
            }
            else if(this.mediumWhite && (!this.board[index].hasOwnProperty('two') && !this.board[index].hasOwnProperty('three'))) {
                const piece = this.pieceFactory("white-medium")
                this.placer(piece, num);
                this.board[index].two = piece;
                this.mediumWhite = false;
                this.MWCounter--;
                this.nextTurn();
            }
            else if(this.smallWhite && !Object.keys(this.board[index]).length) {
                const piece = this.pieceFactory("white-small")
                this.placer(piece, num);
                this.board[index].one = piece;
                this.smallWhite = false;
                this.SWCounter--;
                this.nextTurn();
            }
            else if(Object.keys(this.board[index]).length) {
                let squareData = this.board[index];
                let keysList = Object.keys(squareData);
                let piece = squareData[keysList[keysList.length - 1]];
                let color = piece.className.substring(0, 5);
                if(color === "white") {
                    this.swap.location = index;
                    this.swap.id = num;
                    this.swap.type = keysList[keysList.length - 1];
                    this.swap.piece = piece;
                }
                //console.log(this.swap);
            }
        }
        else {
            if(this.largeBlack && !this.board[index].hasOwnProperty('three')) {
                const piece = this.pieceFactory("black-large")
                this.placer(piece, num);
                this.board[index].three = piece;
                this.largeBlack = false;
                this.LBCounter--;
                this.nextTurn();
            }
            else if(this.mediumBlack && (!this.board[index].hasOwnProperty('two') && !this.board[index].hasOwnProperty('three'))) {
                const piece = this.pieceFactory("black-medium");
                this.placer(piece, num);
                this.board[index].two = piece;
                this.mediumBlack = false;
                this.MBCounter--;
                this.nextTurn();
            }
            else if(this.smallBlack && !Object.keys(this.board[index]).length) {
                const piece = this.pieceFactory("black-small")
                this.placer(piece, num);
                this.board[index].one = piece;
                this.smallBlack = false;
                this.SBCounter--;
                this.nextTurn();
            }
            else if(Object.keys(this.board[index]).length) {
                let squareData = this.board[index];
                let keysList = Object.keys(squareData);
                let piece = squareData[keysList[keysList.length - 1]];
                let color = piece.className.substring(0, 5);
                if(color === "black") {
                    this.swap.location = index;
                    this.swap.id = num;
                    this.swap.type = keysList[keysList.length - 1];
                    this.swap.piece = piece;
                }
                
                //console.log(this.swap);
            }
        }
        this.displayCounts();
    }
    swapper(num, index) {
        if(this.swap.location == index) {
            this.swap = {};
        }
        else {
            let swapperSize = numify(this.swap.type);
            let largest = 0;
            if(Object.keys(this.board[index]).length) {
                largest = numify(Object.keys(this.board[index])[Object.keys(this.board[index]).length - 1]);
            }
            if(swapperSize > largest) {
                let piece = this.swap.piece;    //displays newly swapped piece
                let size = this.swap.type
                this.placer(piece, num);
                this.board[index][size] = piece;

                let prevLocation = this.board[this.swap.location];
                delete prevLocation[this.swap.type];
                if(Object.keys(prevLocation).length) {     //dispays piece that was under swapped piece
                    let piece = prevLocation[Object.keys(prevLocation)[Object.keys(prevLocation).length - 1]];
                    //console.log(this.swap);
                    this.placer(piece, this.swap.id);
                }
                this.swap = {};
                this.nextTurn();
            }
        }
    }
    placeInSquare(word, num) { // example: word = "one" num = 0
        if(!this.winner) {
            if(Object.keys(this.swap).length) {
                this.swapper(word, num);
            }
            else {
            this.squarePlacer(word, num); 
            }
        }
        
    }

    getColor(index) {
        if(Object.keys(this.board[index]).length) {
            let squareData = this.board[index];
            let keysList = Object.keys(squareData);
            let piece = squareData[keysList[keysList.length - 1]];
            let color = piece.className.substring(0, 5);
            return color;
        }
        return 'empty';
    }

    CheckForWin() {
        let color0 = this.getColor(0);
        let color1 = this.getColor(1);
        let color2 = this.getColor(2);
        let color3 = this.getColor(3);
        let color4 = this.getColor(4);
        let color5 = this.getColor(5);
        let color6 = this.getColor(6);
        let color7 = this.getColor(7);
        let color8 = this.getColor(8);
        let winner = false;
        if(color0 != 'empty' && areEqual(color0, color1, color2)) {
            winner = color0;
        }
        if(color3 != 'empty' && areEqual(color3, color4, color5)) {
            if(winner && winner !== color3) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color3;
            }
            
        }
        if(color6 != 'empty' && areEqual(color6, color7, color8)) {
            if(winner && winner !== color6) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color6;
            }
        }
        if(color0 != 'empty' && areEqual(color0, color3, color6)) {
            if(winner && winner !== color0) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color0;
            }
        }
        if(color1 != 'empty' && areEqual(color1, color4, color7)) {
            if(winner && winner !== color1) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color1;
            }
        }
        if(color2 != 'empty' && areEqual(color2, color5, color8)) {
            if(winner && winner !== color2) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color2;
            }
        }
        if(color0 != 'empty' && areEqual(color0, color4, color8)) {
            if(winner && winner !== color0) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color0;
            }
        }
        if(color2 != 'empty' && areEqual(color2, color4, color6)) {
            if(winner && winner !== color2) {
                winner = 'tie';
            }
            if(winner !== 'tie') {
                winner = color2;
            }
        }

        //console.log(winner);
        if(winner == "white") {
            document.querySelector("#whiteTurn").textContent = "Winner! :)";
            document.querySelector("#blackTurn").textContent = "Loser! :(";
            this.saveScore(true);
        }
        if(winner == "black") {
            document.querySelector("#blackTurn").textContent = "Winner! :)";
            document.querySelector("#whiteTurn").textContent = "Loser! :(";
            this.saveScore(false);
        }
        if(winner == 'tie') {
            document.querySelector("#blackTurn").textContent = "Tie!";
            document.querySelector("#whiteTurn").textContent = "Tie!";
        }
        if(winner) {
            this.winner = true;
            return true;
        }
        return false;
    }



    async saveScore(winner) {
        const userName = localStorage.getItem('userName');
        const newScore = { name: userName, outcome: winner};
    
        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newScore),
          });
    
          // Store what the service gave us as the high scores
          const scores = await response.json();
          localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
          // If there was an error then just track scores locally
          this.updateScoresLocal(newScore);
        }
      }
    
      updateScoresLocal(newScore) {
        // let scores = [];
        // const scoresText = localStorage.getItem('scores');
        // if (scoresText) {
        //   scores = JSON.parse(scoresText);
        // }
    
        // let found = false;
        // for (const [i, prevScore] of scores.entries()) {
        //   if (newScore > prevScore.score) {
        //     scores.splice(i, 0, newScore);
        //     found = true;
        //     break;
        //   }
        // }
    
        // if (!found) {
        //   scores.push(newScore);
        // }
    
        // if (scores.length > 10) {
        //   scores.length = 10;
        // }
    
        // localStorage.setItem('scores', JSON.stringify(scores));
      }



}

let game = new Game();

function newGame() {
    game = new Game();
    removeAllChildNodes(document.querySelector("#whiteTurn"));
    removeAllChildNodes(document.querySelector("#blackTurn"))
    document.querySelector("#whiteTurn").textContent = "Your Turn!";
    document.querySelectorAll(".square").forEach(element => removeAllChildNodes(element));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

function numify(letters) {
    if(letters === "three") {
        return 3;
    }
    if(letters === "two") {
        return 2;
    }
    if(letters === "one") {
        return 1;
    }
}

function areEqual(){
    var len = arguments.length;
    for (var i = 1; i< len; i++){
       if (arguments[i] === null || arguments[i] !== arguments[i-1])
          return false;
    }
    return true;
 }

