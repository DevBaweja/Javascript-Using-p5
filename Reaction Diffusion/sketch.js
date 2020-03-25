var grid,next;
var dA = 1.0;
var dB = 0.5;
var feed = 0.055;
var kill  = 0.062;
var dt = 1;
//var weight = [[0.05,0.2,0.05],[0.2,-1,0.2],[0.05,0.2,0.05]];
var center = -1;
var diagonal = 0.05;
var adjacent = 0.2;
var looping = [-1,0,1];

function setup()
{
    createCanvas(400,400);
    pixelDensity(1);
    grid = [];
    next = [];
    for(var x=0;x<width;x++)
    {
        grid[x] = [];
        next[x] = [];
        for(var y=0;y<height;y++)
        {
            grid[x][y] = { a : 1, b : 0 };
            next[x][y] = { a : 1 , b : 0 }; 
        }
    }
    
    // Area
    for(var i=100;i<110;i++)
    {
        for(var j=100;j<110;j++)
        {
            grid[i][j].b = 1; 
        }
    }
}

function draw()
{
    background(51);

    for(var x=1;x<width-1;x++)
    {
        for(var y=1;y<height-1;y++)
        {
            var a = grid[x][y].a;
            var b = grid[x][y].b;
            next[x][y].a = ( a + (dA*laplaceA(x,y)) - (a*b*b) + feed*(1-a) ) * dt;
            next[x][y].b = ( b + (dB*laplaceB(x,y)) + (a*b*b) - (kill+feed)*b ) * dt;

            next[x][y].a = constrain(next[x][y].a,0,1);
            next[x][y].b = constrain(next[x][y].b,0,1);
         }
    }

    loadPixels();
    for(var x=0;x<width;x++)
    {
        for(var y=0;y<height;y++)
        {
            var pix = (x+y*width)*4;
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = floor((a-b)*255);
            c = constrain(c,0,255);
            pixels[pix+0] = c; // red
            pixels[pix+1] = c; // green
            pixels[pix+2] = c; // blue
            pixels[pix+3] = 255; // alpha
        }
    }
    updatePixels();
    swap();
}

function swap() {
    var temp = grid;
    grid = next;
    next = temp;
}

function laplaceA(x,y)
{
    var sumA = 0;
    /*
    for(var i of looping)
    {
        for(var j of looping)
        {
            if(i==0 && j==0)
               {
                   sumA += grid[x][y].a * center;
                   continue;
               }
            if(i>0)
               {
                   if(j==0)
                        sumA += grid[x+1][y].a * adjacent;
                    else
                        sumA += grid[x+1][y+j].a * diagonal;
               }
            if()
            
        }
    }
    */
    sumA += grid[x][y].a * center;
    sumA += grid[x-1][y].a * adjacent;
    sumA += grid[x+1][y].a * adjacent;
    sumA += grid[x][y-1].a * adjacent;
    sumA += grid[x][y+1].a * adjacent;
    sumA += grid[x-1][y-1].a * diagonal;
    sumA += grid[x+1][y-1].a * diagonal;
    sumA += grid[x+1][y+1].a * diagonal;
    sumA += grid[x-1][y+1].a * diagonal;

    return sumA;
}

function laplaceB(x,y)
{
    var sumB = 0;
    sumB += grid[x][y].b * center;
    sumB += grid[x-1][y].b * adjacent;
    sumB += grid[x+1][y].b * adjacent;
    sumB += grid[x][y-1].b * adjacent;
    sumB += grid[x][y+1].b * adjacent;
    sumB += grid[x-1][y-1].b * diagonal;
    sumB += grid[x+1][y-1].b * diagonal;
    sumB += grid[x+1][y+1].b * diagonal;
    sumB += grid[x-1][y+1].b * diagonal;

    return sumB;
}