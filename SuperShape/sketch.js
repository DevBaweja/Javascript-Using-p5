/*
The supershape equation is an extension of the both the equation of the sphere and ellipse and even super ellipse

1/r = n1sqrt( | (1/a)*cos(m*phi/4) |^n2 + |(1/b)*sin(m*phi/4)|^n3 );

Where r and phi are polar coordinates (radius,angle). n1, n2, n3, and m are real numbers. a and b are real numbers excluding zero.
*/
var a,b;
var n1,n2,n3;
var m;
var osc = 0;
var sliderN,sliderA,sliderB;
function setup()
{
    createCanvas(400,400);
    // createSlider(start,end,initial,stepSize)
    createP("N1 : ");
    sliderN1 = createSlider(0.1,20,1,0.1);
    createP("N2 : ");
    sliderN2 = createSlider(0.1,20,1,0.1);
    createP("N3 : ");
    sliderN3 = createSlider(0.1,20,1,0.1);

    // Excluding zero
    createP("A : ");
    sliderA = createSlider(1,10,1,0.1);
    createP("B : ");
    sliderB = createSlider(1,10,1,0.1);

    createP("M : ");
    sliderM = createSlider(0,10,5,0.1);
}

function superShape(angle)
{ 
    var cosphi = abs( (1/a)*cos( m*angle/4 ) );
    var sinphi = abs( (1/b)*sin( m*angle/4 ) );

    rc = pow( pow(cosphi,n2) + pow(sinphi,n3) ,1/n1);
    var r = 1/rc;
    return r;
}

function draw()
{
    background(51);
    translate(width/2,height/2);

    n1 = sliderN1.value();
    n2 = sliderN2.value();
    n3 = sliderN3.value();

    a = sliderA.value();
    b = sliderB.value();

    m = sliderM.value();

    // m = map(sin(osc),-1,1,0,10);
    // osc += 0.01;

    stroke(255);
    noFill();

    var x,y;
    var raduis = 100;
    var total = 10000;
    var increment = TWO_PI/total;
    beginShape();
    for(var angle = 0; angle < TWO_PI; angle += increment)
    {
        var r = superShape(angle);
        // Polar Coordinate to (x,y)
        x = r*cos(angle)*raduis;
        y = r*sin(angle)*raduis;
        vertex(x,y);
    }
          
    endShape(CLOSE);
}
/*
Color
Super Rainbow
Tie variable to sin or cos functions
*/