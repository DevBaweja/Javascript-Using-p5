function Drop(x,y)
{
    this.x = x;
    this.y = y;
    this.r = 7;
    this.speed = 4;
    this.delete = false;
    this.show = function()
    {
        fill(150,0,255);
        ellipse(this.x,this.y,2*this.r,2*this.r);
    }

    this.move = function()
    {
        this.y -= this.speed;
    }

    this.hits = function(flower){
        var d = dist(this.x,this.y,flower.x,flower.y);
        if(d<this.r+flower.r)
            return true;
            else
            return false;

    }

    this.remove = function()
    {
        this.delete = true;
    }
}