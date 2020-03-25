/*
function nextTurn()
{
    // If available space then choose randomly and place it
    if(available.length!=0)
    {
        let spot = random(available);
        let i = spot[0];
        let j = spot[1];
        
        board[i][j] = player[currentPlayer];
        // Change player
        changePlayer();
        // Recalculating available
        calculateAvailable();
    }
}
*/
var count = 0;
function nextTurn()
{
    // If available space then choose randomly and place it
    if(available.length!=0)
    {   
        let bestScore= -Infinity;
        let bestMove;
        for(let spot of available)
        {
            let x = spot[0];
            let y = spot[1];
            board[x][y] = player[1];
            calculateAvailable();
            // Let suppose ai choose this x and y
            // Next move will be minimization by human
            let score = minimax(board,false);
            // Reset as if move was not choosen

            board[x][y] = '';
            available.push([x,y]);

            // AI trys to get maximum score
            if(score == max(score, bestScore))
                {
                    bestScore = score;
                    bestMove = { x , y }; 
                }
        }
        board[bestMove.x][bestMove.y] = player[currentPlayer];
        // Change player
        changePlayer();
        // Recalculating available
        calculateAvailable();
        // console.log(count);
        count = 0;
    }
}

let score = {
    X : 1,
    O : -1,
    Tie : 0
}

function minimax(board,isMaximizing)
{
    count++;
    // For Base Case
    var result = checkWinner();
    if(result != null)
    {   
        return score[result];
    }

    if(isMaximizing) // AI Turn
    {
        let bestScore= -Infinity;
        // Checking for each spot
        for(let spot of available)
        {
            let x = spot[0];
            let y = spot[1];
            board[x][y] = player[1];
            calculateAvailable();
            let score = minimax(board,false);
            board[x][y] = '';
            available.push([x,y]);
            bestScore = max(score,bestScore);
            // If it goes with this path and other will play optimal even then it wins
            // so no need to check any other path go to this poth only
           if(bestScore == 1)
               break;
        }
        return bestScore;
    }
    else
    {
        let bestScore= Infinity;
        // Checking for each spot
        for(let spot of available)
        {
            let x = spot[0];
            let y = spot[1];
            board[x][y] = player[0];
            calculateAvailable();
            let score = minimax(board,true);
            board[x][y] = '';    
            available.push([x,y]);
            bestScore = min(score, bestScore);
            // If it goes with this path and other will play optimal even then it wins
            // so no need to check any other path go to this poth only
            if(bestScore == -1)
                break;
        }
        return bestScore;
    }
}