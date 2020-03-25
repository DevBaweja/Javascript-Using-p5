// Input Symbols - F,+,-,[,]  (E)
// Initial State - F (qo)
// Transition Function - (F -> FF+[+F-F-F]-[-F+F+F]) 

/*
F - Move Forward
+ - Turn Right
- - Turn Left
[ - Store Position
] - Restore Position
*/
var angle;
var axiom = "F";
var sentence = axiom;
var count = 0;
var rules = [];
var len = 200;

function generate()
{
    var nextSentence = "";
    for(var each of sentence)
    {
        var current = each;
        var found = false;
        for(var each of rules)
            if(current == each.x)
               {
                    found = true;
                    nextSentence += each.y;
                    break;
                }
        if(!found)
            nextSentence += current;
    }
    sentence = nextSentence;
    createP(sentence);
    len *= 0.5;
    turtle();
}

function setup()
{

    // noCanvas();
    createCanvas(800,800);

    angle = radians(15);

    rules.push( {
        x : "F",
        y : "FF+[++F-F-F-F]-[--F+F+F+F]"
    });
// FF-[-F+F+F]+[+F-F-F] - Left Side
// FF+[+F-F-F]-[-F+F+F] - Right Side

// FF[++F-F-F][--F+F+F] Center(Right-Left)
// FF[--F+F+F][++F-F-F] Center(Left-Right)

    createP(axiom);
    turtle();
    var button = createButton("Generate");
    button.mousePressed(generate);
}

function turtle()
{
    // resetMatrix();
    background(51);
    stroke(255,255,0,150);
    strokeWeight(4);

    translate(width/2,height);

    for(var each of sentence)
    {
        var current = each;
        switch(current)
        {
            case "F" : {
                line(0,0,0,-len);
                translate(0,-len);
                break;
            }
            case "+" : {
                rotate(angle)
                break;
            }
            case "-" : {
                rotate(-angle)
                break;
            }
            case "[" : {
                push();
                break;
            }
            case "]" : {
                pop();
                break;
            }
        }
    }
}

/*
function mousePressed()
{
    generate();
}
*/

function draw()
{

}