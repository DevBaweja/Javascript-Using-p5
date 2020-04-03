var fireworks = [];
var gravity;
function setup()
{
    createCanvas(600,400);
    stroke(255);
    strokeWeight(4);

    colorMode(HSB);
    gravity = createVector(0,0.1);
    background(0);
}

function draw()
{
    colorMode(RGB);
    background(0,25);
    if(random(1)<0.1) // 10% chance
        fireworks.push(new Firework());
    for(var i=fireworks.length-1;i>=0;i--)
        {
            var firework = fireworks[i];
            firework.update();
            firework.show();
            
            if(firework.done())
                fireworks.splice(i,1);
        }
}
