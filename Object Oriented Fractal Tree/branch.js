function Branch(begin,end)
{
    this.begin = begin;
    this.end = end;
    this.finished = false;

    this.jitter = function()
    {
        this.end.x += random(-0.2,0.2);
        this.end.y += random(-0.2,0.2);
    }

    this.show = function()
    {
        line(this.begin.x,this.begin.y,this.end.x,this.end.y);
    }

    this.createBranches = function()
    {
        var dir = p5.Vector.sub(this.end,this.begin);
        dir.mult(2.0/3.0);

        dir.rotate(angle);
        var newEndRight = p5.Vector.add(this.end,dir);
        dir.rotate(-angle);
    
        dir.rotate(-angle);
        var newEndLeft = p5.Vector.add(this.end,dir);
        dir.rotate(angle);

        var left = new Branch(this.end,newEndLeft)
        var right = new Branch(this.end,newEndRight);
        return [left,right];
    }
}