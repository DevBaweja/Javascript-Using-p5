var rows,cols;
var w= 40;
var cells;

var  current;
var stack = [];
var done = false;
var drag = false;
var store;

function setup()
{
    createCanvas(400,400);
    frameRate(5);
    rows = floor(height/w);
    cols = floor(width/w);
    // Creating 2d array
    cells =  new Array(cols);
    for(var i=0;i<cells.length;i++)
        cells[i] = new Array(rows);
    
    for(var i=0;i<cols;i++)
        for(var j=0;j<rows;j++) 
            cells[i][j] = new Cell(i,j);
    current = cells[0][0];
    current.visited = true;
    // cells[cols][rows]
}

function draw()
{
    background(51);
    //console.log(current);
    for(var i=0;i<cols;i++)
        for(var j=0;j<rows;j++) 
            cells[i][j].show();
    
    if(!done)
    {
    // Randomly choosing   one of unvisited neighbours
    var next = current.checkNeighbours();

    if(next)
        {
            // Push current cell into stack
            stack.push(current);
            // Removes walls between current cell and choosen cell
            removeWall(current,next);
            // Make choosen cell as current cell and mark it as visited
            current = next;
            next.visited = true;
        }
        else if(stack.length > 0) // if stack is not empty
        {
            // Pop cell from stack
            var cell = stack.pop();
            // Make it current cell
            current = cell;
        }
        else
            done = true;
    }

    keyEvent();
   //    noLoop();
}

function  keyEvent()
{
    if(done && drag)
    {
        // keyCode == ANY_ARROW
        if(keyIsDown(UP_ARROW) && !current.top)
            current = cells[current.i][current.j-1];
        if(keyIsDown(RIGHT_ARROW) && !current.right)
            current = cells[current.i+1][current.j];
        if(keyIsDown(DOWN_ARROW) && !current.bottom)
            current = cells[current.i][current.j+1];
        if(keyIsDown(LEFT_ARROW) && !current.left)
            current = cells[current.i-1][current.j];
        
        if(keyCode == DELETE)
            {
                drag = false;
                console.log("One Step Enable");
            }
    }
}

function  keyPressed()
{
    if(done && !drag)
    {
        // keyCode == ANY_ARROW
        if(keyCode == UP_ARROW && !current.top)
            current = cells[current.i][current.j-1];
        if(keyCode == RIGHT_ARROW && !current.right)
            current = cells[current.i+1][current.j];
        if(keyCode == DOWN_ARROW && !current.bottom)
            current = cells[current.i][current.j+1];
        if(keyCode == LEFT_ARROW && !current.left)
            current = cells[current.i-1][current.j];

        // event.key , event.location , event.which , event.code 
        if(event)
        {
            if(event.code == "KeyD")
            {
                drag = true;
                console.log("Drag Enable");
            }

            if(event.code == "Space")
            {
                console.log("Space");
                store = current;
            }

            if(event.code == "Enter")
            {
                console.log("Enter");
                path();
            }
        }
    }
}

function path()
{
    var initial = store;
    var final = current;
    // console.log(initial);
    // console.log(final);
    current = initial;
    //findPath(final);
    store = null;
}

/*
1. Make initial cell as current cell and mark it as visited
2. While there are unvisited cells
    1. If current cell has unvisited neighbours
        1. Choose randomly one of unvisited neighbours
        2. Push current cell into stack
        3. Removes walls between current cell and choosen cell
        4. Make choosen cell as current cell and mark it as visited
    2. Else if stack is not empty
        1. Pop cell from stack
        2. Make it current cell

*/

/*
 1.   Implement another algorithm to form maze 
 2. Path finding algorithm
*/