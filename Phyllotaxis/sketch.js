/*
phi = n * 137.5
r = c * sqrt(n)
*/
var n = 0;
var c = 4;

function setup()
{
    createCanvas(400,400);
    background(0);
    colorMode(HSB);
    angleMode(DEGREES);
}

function draw()
{
    translate(width/2,height/2);
    var phi = n*137.5;
    var r = c*sqrt(n);

    var x = r*cos(phi);
    var y = r*sin(phi);
    // fill(n%256,255,255);
    // fill(phi%256,255,255);
    fill((phi-r)%256,255,255);
    noStroke();
    ellipse(x,y,4,4);
    n++;
}
/*
http://algorithmicbotany.org/research/
*/