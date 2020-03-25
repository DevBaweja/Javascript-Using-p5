let board = [['','',''],['','',''],['','','']];
let player = ['O','X'];
let w,h;
let size = 3;
let currentPlayer; // indicates location in player
let available = [];
var winner;
var winnerLine = [];
var done;
function setup()
{   
    createCanvas(600,600);
    // Making empty board
    for(var i=0;i<size;i++)
    for(var j=0;j<size;j++)
        board[i][j] = '';
    
    // Choosing random player turn
    // currentPlayer = random(player);
    currentPlayer = floor(random(player.length));

    // Making available space
    for(var i=0;i<size;i++)
        for(var j=0;j<size;j++)
            {
                if(board[i][j]=='')
                available.push([i,j]);
            }
    done = false;
}

function nextTurn()
{
    // If available space then choose randomly and place it
    if(available.length!=0)
    {
        /*
        let spot = random(available);
        let i = spot[0];
        let j = spot[1];
        */
        var i = floor(mouseY/h);
        var j = floor(mouseX/w);

        var isAvailable = false;
        for(var x=0;x<available.length;x++)
            {
                var findA = available[x];
                if(findA[0] == i && findA[1] == j)
                    isAvailable = true;
            }
        // Using find,indexOf,includes functions of js
        if(isAvailable)
        {
            board[i][j] = player[currentPlayer];
            // Change player
            changePlayer();
            // Recalculating available
            calculateAvailable();
        }
    }
}

function calculateAvailable()
{
    // Recalculating available after empty it
    available = [];
    for(var i=0;i<size;i++)
    for(var j=0;j<size;j++)
        {
            if(board[i][j]=='')
            available.push([i,j]);
        }
}
function changePlayer()
{
    // currentPlayer = (currentPlayer != player[0]) ? player[0] : player[1];
    currentPlayer = (currentPlayer+1)%player.length;
}

function equal(a,b,c)
{
    return (a == b && b == c && c ==a && a != '');
}

function checkWinner()
{
    winner = null;
    winnerLine = [];
    // Horizontal 
    for(var i=0;i<size;i++)
    {
        if(equal(board[i][0],board[i][1],board[i][2]))
           {
                winner = board[i][0];
                winnerLine.push([i,0]);
                winnerLine.push([i,2]);
           }
    }
    // Vertical
    for(var j=0;j<size;j++)
    {
        if(equal(board[0][j],board[1][j],board[2][j]))
            {
                winner = board[0][j];
                winnerLine.push([0,j]);
                winnerLine.push([2,j]);
            }
    }

    // Diagonal
    if(equal(board[0][0],board[1][1],board[2][2]))
        {
            winner = board[1][1];
            winnerLine.push([0,0]);
            winnerLine.push([2,2]);
        }
    if(equal(board[2][0],board[1][1],board[0][2]))
        {
            winner = board[1][1];
            winnerLine.push([2,0]);
            winnerLine.push([0,2]);
        }
    // No winner and no space available
    if(winner == null && available.length==0)
     {  
         return 'Tie';
     }
     else 
     if(winner != null)
     {
        return winner;
     }
    
}

function mousePressed()
{
    if(!done)
    {
        nextTurn();
        // Check winner
        var result = checkWinner();
        if(result != null)
        {
            //createP(result).style('color','#000').style('font-size','32pt');
            console.log(result);
            // To stop mousePressed in ths5 sec interval
            done = true;
            // Winner Line
            drawWinnerLine();
            //setTimeout(setup,5000);
        }
    }
}
function drawWinnerLine()
{
    console.log(winnerLine);
    var p1 = winnerLine[0];
    var p2 = winnerLine[1];

    let xr = w/4;
    let yr = h/4;

    strokeWeight(20);
    stroke(255,0,0);
    //point(p1[1]*w+w/2,p1[0]*h+h/2);
    line(0,0,700,700);
}

function draw()
{
    background(200);
    w = width/size;
    h = height/size;
    noFill();
    strokeWeight(4);
    stroke(0);
    for(var i = 1; i < size;i++)
        line(w*i,0,w*i,height);
    for(var i = 1; i < size;i++)
        line(0,h*i,width,h*i);


    for(var i=0;i<size;i++)
        for(var j=0;j<size;j++)
            {
                let x = w*i+w/2;
                let y = h*j+h/2;
                let spot = board[j][i];
                if(spot == player[0])
                {
                    ellipse(x,y,w/2,h/2);
                }
                if(spot == player[1])
                {
                    let xr = w/4;
                    line(x-xr,y-xr,x+xr,y+xr);
                    line(x+xr,y-xr,x-xr,y+xr);
                }
            }
}