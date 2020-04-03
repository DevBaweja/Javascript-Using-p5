function Pipe()
{
    this.gap = random(6*bird.r,8*bird.r); // float
    this.slots = floor(height/this.gap); // int
    this.overflow =  (height - this.slots*this.gap)/2;// float

    this.selected = floor(random(this.slots)); // int

    this.top = this.overflow + this.selected*this.gap;
    this.bottom = height - this.overflow - (this.slots-this.selected-1)*this.gap;

    this.x = width;
    this.w = 20;
    this.speed = 1;
    this.highlight = false;

    this.hits = function()
    {   
        if(bird.y-bird.r < this.top || bird.y+bird.r > this.bottom)
            if(bird.x+bird.r > this.x && bird.x-bird.r < this.x+this.w)
            {
                this.highlight = true;
                return true;
            }   
        this.highlight = false;
        return false;
    }

    this.show = function()
    {
        fill(255);
        if(this.highlight)
            fill(255,0,0); // Red
        stroke(255,0,0);
        rect(this.x,0,this.w,this.top);
        rect(this.x,this.bottom,this.w,height-this.bottom);
    }

    this.update = function()
    {
        this.x -= this.speed;
    }

    this.offscreen = function()
    {
        return this.x + this.w < 0;
    }
}

// Random Empty amount of space
// Random Starting of that empty space