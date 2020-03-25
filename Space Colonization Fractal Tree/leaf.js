function Leaf()
{
    this.raduis = 4;
    this.pos = createVector(random(width),random(height-height/4));
    this.reached = false;

    this.show = function()
    {
        ellipse(this.pos.x,this.pos.y,this.raduis,this.raduis);
    }
}