function Ship()
{
    this.size = 40;
    this.x = width/2;

    this.show = function()
    {
        fill(255);
        rectMode(CENTER);
        rect(this.x,height-this.size,this.size/2,this.size);
    }
    this.setDir = function(dir)
    {
        this.xdir = dir;
    }
    
    this.move = function(dir)
    {
        this.x += dir*5;
    }

}