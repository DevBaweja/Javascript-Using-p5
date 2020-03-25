var ship;
var flowers = [];
var drops = []; 
var MAX = 6;
function setup()
{
    createCanvas(600,400);
    noStroke();
    ship = new Ship();
    var r = width/(3*MAX+1);
    for(var i=0;i<MAX;i++)
        flowers[i] = new Flower(2*r+3*r*i,r);
}

function draw()
{
    background(51);
    ship.show();
    for(var i=0;i<drops.length;i++)
        {
            drops[i].show();
            drops[i].move();
            for(var j=0;j<flowers.length;j++)
                {
                    if(drops[i].hits(flowers[j]))
                    {
                        flowers[j].grow();
                        drops[i].remove();
                        console.log('Watering');
                    }
                }
        }

    var edge = false;
    for(var i=0;i<flowers.length;i++)
        {
            flowers[i].show();
            flowers[i].move();
            if(flowers[i].x>width || flowers[i].x<0)
                edge = true;
        }   

    if(edge)
    {
        for(var i=0;i<flowers.length;i++)
        {
            flowers[i].shiftdown();
        }
    }
    
    for(var i=drops.length-1;i>=0;i--)
        {
            if(drops[i].delete)
                drops.splice(i,1);
        }
        
     if(keyIsDown(RIGHT_ARROW))
         ship.move(1);
     if(keyIsDown(LEFT_ARROW))
         ship.move(-1);
}

function keyPressed()
{
    if(key === ' ')
        {
            var drop = new Drop(ship.x,height-2*ship.size);
            drops.push(drop);
        }
}