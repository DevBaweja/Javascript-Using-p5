function Flower(x,r)
{
    this.x = x;
    this.y = 75;
    this.r = r;

    this.xdir = 1;
    this.ydir = 0;

    this.show = function()
    {
        fill(255,0,255,100);
        ellipse(this.x,this.y,2*this.r,2*this.r);
    }
    this.grow = function()
    {
        this.r += 2;
    }
    this.move = function()
    {
        this.x += this.xdir;
        this.y += this.ydir;
    }
    this.shiftdown = function()
    {
        this.xdir *= -1;
        this.y += this.r;
    }
}