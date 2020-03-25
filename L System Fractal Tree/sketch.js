// Input Symbols - A,B (E)
// Initial State - A (qo)
// Transition Function - (A -> AB) , (B -> A)


var axiom = "A";
var sentence = axiom;
var count = 0;
var rules = [];

function generate()
{
    var nextSentence = "";
    for(var i=0;i<sentence.length;i++)
    {
        var current = sentence.charAt(i);
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
}

function setup()
{

    noCanvas();
    // createCanvas(400,400);

    rules.push( {
        x : "A",
        y : "AB"
    });
    
    rules.push( {
        x : "B",
        y : "A"
    })

    createP(axiom);
    var button = createButton("Generate");
    button.mousePressed(generate);
}

function draw()
{

}