/*
// Drawing Circle without ellipse function
var raduis = 100;
function setup(){
    createCanvas(400,400);
}

function draw(){
    background(51);
    translate(width/2,height/2);
    var x;
    var y;
    stroke(255);
    noFill();
    beginShape();
    for(var angle=0; angle < TWO_PI ; angle += 0.1)
    {
        x = raduis*cos(angle);
        y = raduis*sin(angle);
        vertex(x,y);
    }
    endShape(CLOSE);
}
*/

/* SuperEllipse
    |(x/a)|^n+|(y/b)|^n = 1 
    Forming Circle a = b = r and n = 2
*/
/*
    x(angle) = ( |cos(angle)|^(2/n) )*a*sgn(cos(angle))
    y(angle) = ( |sin(angle)|^(2/n) )*b*sgn(sin(angle))
*/
var a,b;
var n;

var sliderN,sliderA,sliderB;
function setup()
{
    createCanvas(400,400);
    // createSlider(start,end,initial,stepSize)
    createP("N : ");
    sliderN = createSlider(0,10,2,0.01);
    createP("A : ");
    sliderA = createSlider(0,width/2,width/4,1);
    createP("B : ");
    sliderB = createSlider(0,height/2,height/4,1);
}

function draw()
{
    background(51);
    translate(width/2,height/2);

    var x;
    var y;
    n = sliderN.value();
    a = sliderA.value();
    b = sliderB.value();

    stroke(255);
    noFill();

    beginShape();
    for(var angle = 0; angle < TWO_PI; angle += 0.1)
    {
        var na = 2/n;
    
      x = pow( abs(cos(angle)),na )*a*sgn(cos(angle));
      
      y = pow( abs(sin(angle)),na )*b*sgn(sin(angle));

      vertex(x,y);
    }
          
    endShape(CLOSE);
}

function sgn(t)
{
    switch (true)
    {
        case t<0 : return -1; break;
        case t==0 : return 0; break;
        case t>0 : return 1; break;
    }
}
/*
Color
Super Rainbow
 */