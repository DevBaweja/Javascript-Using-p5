function Bird()
{
    this.x = 64;
    this.y = height/2;
    this.r = 20;

    this.gravity = 1;
    this.lift = -25;
    this.vel = 0;

    this.show = function()
    {
        fill(255);
        ellipse(this.x,this.y,2*this.r,2*this.r);
    }

    this.update = function()
    {
        this.vel += this.gravity;
        this.vel *= 0.9; // Air Resistance 
        this.y += this.vel;

        if(this.y>height)
        {
            this.y = height;
            this.vel = 0;
        }
        if(this.y < 0)
        {
            this.y = 0;
            this.vel = 0;
        }
    }

    this.up = function()
    {
        this.vel += this.lift;
    }
}