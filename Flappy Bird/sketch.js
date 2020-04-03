var bird;
var pipes = [];
function setup()
{
    createCanvas(400,600);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw()
{
    background(0);

    
    for(var i=pipes.length-1;i>=0;i--)
    {
        var p = pipes[i];
        p.show();
        p.update();

        if(p.hits());

        if(p.offscreen())
            pipes.splice(i,1);       
    }


    bird.show();
    bird.update();

    if(frameCount % 200 == 0)  // 1/200
    {
        pipes.push(new Pipe());
    }
}

function keyPressed()
{
    if(key == ' ')
    {
        bird.up();
    }
}