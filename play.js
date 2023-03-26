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
                this.swap.location = index;
                this.swap.id = num;
                this.swap.type = keysList[keysList.length - 1];
                this.swap.piece = squareData[keysList[keysList.length - 1]];
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
                this.swap.location = index;
                this.swap.id = num;
                this.swap.type = keysList[keysList.length - 1];
                this.swap.piece = squareData[keysList[keysList.length - 1]];
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
                    console.log(this.swap);
                    this.placer(piece, this.swap.id);
                }
                this.swap = {};
                this.nextTurn();
            }
        }
    }
    placeInSquareZero() {
        if(Object.keys(this.swap).length) {
            this.swapper("zero", 0);
        }
        else {
           this.squarePlacer("zero", 0); 
        }
        
    }
    placeInSquareOne() {
        if(Object.keys(this.swap).length) {
            this.swapper("one", 1);
        }
        else {
            this.squarePlacer("one", 1);
        }
    }
    placeInSquareTwo() {
        if(Object.keys(this.swap).length) {
            this.swapper("two", 2);
        }
        else {
            this.squarePlacer("two", 2);
        }    }
    placeInSquareThree() {
        if(Object.keys(this.swap).length) {
            this.swapper("three", 3);
        }
        else {
            this.squarePlacer("three", 3);
        }    }
    placeInSquareFour() {
        if(Object.keys(this.swap).length) {
            this.swapper("four", 4);
        }
        else {
            this.squarePlacer("four", 4);
        }    }
    placeInSquareFive() {
        if(Object.keys(this.swap).length) {
            this.swapper("five", 5);
        }
        else {
            this.squarePlacer("five", 5);
        }    }
    placeInSquareSix() {
        if(Object.keys(this.swap).length) {
            this.swapper("six", 6);
        }
        else {
            this.squarePlacer("six", 6);
        }    }
    placeInSquareSeven() {
        if(Object.keys(this.swap).length) {
            this.swapper("seven", 7);
        }
        else {
            this.squarePlacer("seven", 7);
        }    }
    placeInSquareEight() {
        if(Object.keys(this.swap).length) {
            this.swapper("eight", 8);
        }
        else {
            this.squarePlacer("eight", 8);
        }    }

}

const game = new Game();

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
