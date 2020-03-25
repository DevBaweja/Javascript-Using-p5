var angle;
var slider;
var root;
var tree = [];
var leaves = [];
var count = 0;
function setup()
{
    createCanvas(400,400);
    // createSlider(start,end,initial,stepSize)
    slider = createSlider(0,TWO_PI,PI/4,0.01);
    angle = slider.value();

    var len = height/4;
    root = new Branch(createVector(width/2,height),createVector(width/2,height-len));
    tree.push(root);
}

function mousePressed()
{
    // Remember to put this loop inverted as thing are getting added in tree only
    for(var x = tree.length-1; x >= 0; x--)
    {
        if(!tree[x].finished)
        {
            var branches = tree[x].createBranches();
            for(var each of branches)
               tree.push(each);
            tree[x].finished = true;
        }
    }

    count++;
    if(count >= 3)
    {
        for(var x = tree.length-1; x>=0; x--)
            {
                if(!tree[x].finished)
                {
                    var leaf = tree[x].end.copy();
                    leaves.push(leaf);
                }
            }
    }
}

function draw()
{
    background(51);
    // angle = slider.value();
    stroke(255,255,0,150);
    strokeWeight(10);
    
    for(var each of tree)
       {
           each.show();
        // each.jitter();
       }
       
    fill(255,0,100,175);
    noStroke();
    for(var each of leaves)
    {
        ellipse(each.x,each.y,16,16);
    }
}


/*
Thickness accordingly to branch level or depth
Changing Color
Make Leaves
Waving with help of Perlin noise 
Spring Forces
Gust of wind
Leaves Falling
*/