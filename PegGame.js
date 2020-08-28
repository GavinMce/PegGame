/*
Creator: Gavin McEllistrem
CS 300 peg solitare
*/

//importing input module
const readline = require("readline-sync")

//main method
const main = () => {
    //board object (char array)
    let theBoard
    //flag to check if game is over
    var done = false
    //starting dialogue
    console.log("Welcome to CS 300 peg solitare!")
    console.log("Board styles: 1.Cross 2.Circle 3.Triangle 4.Simple T")
    theBoard = createBoard((readValidInt("Choose board style: ", 1,4)) - 1)
    console.log("\n")
    //main game loop, has player make move then checks if game is over every iteration
    while(!done){
        displayBoard(theBoard)
        var choices = readValidMove(theBoard)
        theBoard  = performMove(theBoard, choices[1],choices[0],choices[2])
        
        if(countPegsRemaining(theBoard) === 1){
            console.log("You win")
            done = true
        }
        if(countMovesAvailable === 0){
            console.log("No more moves available")
            done = true
        }
    }
}

//the game boards
const boards = [
    [
        ['#','#','#','@','@','@','#','#','#'],
        ['#','#','#','@','@','@','#','#','#'],
        ['@','@','@','@','@','@','@','@','@'],
        ['@','@','@','@','-','@','@','@','@'],
        ['@','@','@','@','@','@','@','@','@'],
        ['#','#','#','@','@','@','#','#','#'],
        ['#','#','#','@','@','@','#','#','#']
    ],
    [
        ['#','-','@','@','-','#'],
        ['-','@','@','@','@','-'],
        ['@','@','@','@','@','@'],
        ['@','@','@','@','@','@'],
        ['-','@','@','@','@','-'],
        ['#','-','@','@','-','#']
    ],
    [
        ['#','#','#','-','@','-','#','#','#'],
        ['#','#','-','@','@','@','-','#','#'],
        ['#','-','@','@','-','@','@','-','#'],
        ['-','@','@','@','@','@','@','@','-']
    ],
    [
        ['-','-','-','-','-'],
        ['-','@','@','@','-'],
        ['-','-','@','-','-'],
        ['-','-','@','-','-'],
        ['-','-','-','-','-']
    ]
]

//just returns the chosen board, not much to it
const createBoard = (boardType) => {
    return boards[boardType]
}

//prints the board to console
const displayBoard = (board) => {

    //prints out the numbers above board
    for(let i = 0; i < board[0].length; i++){
        process.stdout.write(`${i} `)
    }

    //formatting
    console.log("\n")
    
    //iterates through the 2d array and prints out the elements
    for(let y = 0; y < board.length; y++){
        
        for(let x of board[y]){
           process.stdout.write(`${x} `)
        }
        console.log(` ${y} `)
    }

}

//reads in a number that is within the given boundaries and returns the number
const readValidInt = (prompt, min, max) => {
    //flag to make sure number is within the boundaries
    let validNum = false
    //variable to store the input
    let number = 0
    //loop to make sure input is valid
    while(!validNum){
        //reading in number
        let answer = parseInt(readline.question(prompt))
        //logic to check if within boundaries
        if(answer >= min && answer <= max){
            number = answer
            validNum = true
        }
        else{
            console.log("Invalid number, try again")
        }
    }
    
    return number
    
}

const readValidMove = (board) => {
    //flag to control loop
    let valid = false
    
    //loop to make sure move is valid
    while(!valid){
        var column = readValidInt("Column: ", 1, board[0].length)
        var row = readValidInt("Row: ", 1, board.length)
        var direction = readValidInt("direction (1.left 2.right 3.up 4.down): ", 1, board.length)
        if(isValidMove(board,row,column,direction)) valid = true
        else console.log("invalid move, please re-enter")
    }

    return [column, row, direction]


}

//boolean that checks if a move is valid
const isValidMove = (board, row, column, direction) => {
    //variable that checks for validity, if it is equal to three at end of function then it has met all conditions for a valid move
    let validity = 0

    //making sure that the player chooses a peg
    if(board[row][column] === '@') validity++


    /*
    checks the direction, then make sure that none of the tests are accessing elements that are out of bounds of the board. Then checks to 
    see that neighboring piece is a peg, and that the move spot is not a peg or #
    */
    if(direction === 1){
        if(!(column - 2 < 0)){
            if(board[row][column - 1] === '@') validity++
            
            if(board[row][column - 2] === '-') validity++
        }
    }
    else if(direction === 2){
        if(!(column + 2 > board[0].length)){
            if(board[row][column + 1] === '@') validity++
            
            if(board[row][column + 2] === '-') validity++
        }
    }
    else if(direction === 3){
        if(!(row - 2 < 0)){
            if(board[row - 1][column] === '@') validity++
            
            if(board[row - 2][column] === '-') validity++
        }
    }
    else if(direction === 4){
        if(!(row + 2 > board.length)){
            if(board[row + 1][column] === '@') validity++
            
            if(board[row + 2][column] === '-') validity++
        }
    }

    if(validity === 3) return true
    else return false 

}

//performs actual move
const performMove = (board, row, column, direction) => {
    //store the board in a new object to return
    let newBoard = board
    //gets rid of current position
    newBoard[row][column] = '-'

    //checks direction and places peg in new spot accordingly as well as remove the peg that was hopped over
    if(direction === 1){
        newBoard[row][column - 2] = '@'
        newBoard[row][column - 1] = '-'
    }
    else if(direction === 2){
        newBoard[row][column + 2] = '@'
        newBoard[row][column + 1] = '-'
    }
    else if(direction === 3){
        newBoard[row - 2][column] = '@'
        newBoard[row - 1][column] = '-'
    }
    else if(direction === 4){
        newBoard[row + 2][column] = '@'
        newBoard[row + 1][column] = '-'
    }
    return newBoard
}

const countPegsRemaining = (board) => {
    //variable to store num of pegs
    let pegs = 0;

    //iterates through board and counts number of pegs
    for(let i = 0; i < board.length;i++){
        for(let z = 0; z < board[0].length; z++){
            if(board[i][z] === '@'){
                pegs++
            }
        }
    }
    return pegs

}

const countMovesAvailable = (board) => {
    //variable to store total moves
    let totalMoves = 0

    //iterates through board and checks if there are any valid moves in every direction at each position
    for(let i = 0; i < board.length; i++){
        for(let z = 0; z < board[0].length; z++){
            if(isValidMove(board,i,z,1)) totalMoves++
            if(isValidMove(board,i,z,2)) totalMoves++
            if(isValidMove(board,i,z,3)) totalMoves++
            if(isValidMove(board,i,z,4)) totalMoves++
        }
    }
    return totalMoves
}


//main function call
main()