function Branch(parent,pos,dir)
{
    this.parent = parent;
    this.pos = pos;
    this.dir = dir;
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 5;

    this.next = function()
    {
        var nextDir = p5.Vector.mult(this.dir,this.len);
        var nextpos = p5.Vector.add(this.pos,nextDir);
        var nextBranch = new Branch(this,nextpos,this.dir.copy());
        return nextBranch;
    }

    this.show = function()
    {
        stroke(255); 
        if(this.parent !== null)
            line(this.pos.x,this.pos.y,this.parent.pos.x,this.parent.pos.y);
    }

    this.reset = function()
    {
        this.dir = this.origDir.copy();
        this.count = 0;
    }
}